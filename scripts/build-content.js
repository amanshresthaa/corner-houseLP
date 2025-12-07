#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { ZodError, z } = require('zod');

const contentDir = path.join(process.cwd(), 'config', 'content');
const manifestPath = path.join(contentDir, 'manifest.json');

const ArrayMergeStrategy = { CONCAT: 'concat', REPLACE: 'replace' };

function deepMergeContent(target, source, arrayStrategy = ArrayMergeStrategy.CONCAT) {
  if (source === null || source === undefined) return target;
  if (target === null || target === undefined) return cloneValue(source);

  if (Array.isArray(source)) {
    if (Array.isArray(target)) {
      if (arrayStrategy === ArrayMergeStrategy.CONCAT) return [...target, ...source].map(cloneValue);
      return cloneValue(source);
    }
    return cloneValue(source);
  }

  if (isObject(source) && isObject(target)) {
    const result = { ...cloneValue(target) };
    for (const key of Object.keys(source)) {
      result[key] = deepMergeContent(result[key], source[key], arrayStrategy);
    }
    return result;
  }

  return cloneValue(source);
}

function wrapWithMountPath(data, mountPath) {
  if (!mountPath) return data;
  const segments = mountPath.replace(/\//g, '.').split('.').filter(Boolean);
  if (segments.length === 0) return data;
  return segments.reduceRight((acc, segment) => ({ [segment]: acc }), data);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function cloneValue(value) {
  if (Array.isArray(value)) return value.map(cloneValue);
  if (isObject(value)) {
    const res = {};
    for (const [k, v] of Object.entries(value)) res[k] = cloneValue(v);
    return res;
  }
  return value;
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function resolveEnvChain(env) {
  const chain = [env];
  if (env === 'prod') chain.push('staging', 'dev');
  if (env === 'staging') chain.push('dev');
  return chain;
}

async function compose(env) {
  const manifest = loadJson(manifestPath);
  const modules = Object.entries(manifest.modules || {}).sort((a, b) => (a[1].priority || 999) - (b[1].priority || 999));
  let composed = {};

  for (const [moduleId, cfg] of modules) {
    let moduleData = {};
    for (const fileRel of cfg.files || []) {
      const filePath = path.join(contentDir, fileRel);
      const fileJson = loadJson(filePath);
      moduleData = deepMergeContent(moduleData, fileJson, ArrayMergeStrategy.CONCAT);
    }

    const envConfig = manifest.environments?.[env];
    if (envConfig?.overrides) {
      for (const overrideDir of envConfig.overrides) {
        const overridePath = path.join(contentDir, overrideDir, `${moduleId}.json`);
        if (fs.existsSync(overridePath)) {
          const overrideJson = loadJson(overridePath);
          moduleData = deepMergeContent(moduleData, overrideJson, ArrayMergeStrategy.CONCAT);
        }
      }
    }

    const mounted = wrapWithMountPath(moduleData, cfg.mountPath || moduleId.replace(/\//g, '.'));
    composed = deepMergeContent(composed, mounted, ArrayMergeStrategy.CONCAT);
  }

  for (const envName of resolveEnvChain(env)) {
    const overridePath = path.join(process.cwd(), 'data', envName, 'content.json');
    if (fs.existsSync(overridePath)) {
      const overrideJson = loadJson(overridePath);
      composed = deepMergeContent(composed, overrideJson, ArrayMergeStrategy.CONCAT);
    }
  }

  // Minimal validation: ensure result is an object
  if (!isObject(composed)) throw new Error('Composed content is not an object');
  return composed;
}

(async () => {
  const args = process.argv.slice(2);
  const env = args.find((a) => !a.startsWith('--')) || 'prod';
  const shouldMinify = args.some((a) => a === '--min' || a === '-m');
  try {
    const result = await compose(env);
    const outPath = path.join(process.cwd(), 'config', 'content.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
    if (shouldMinify) {
      const minPath = path.join(process.cwd(), 'config', 'content.min.json');
      fs.writeFileSync(minPath, JSON.stringify(result));
      console.log(`✅ Built content.json and content.min.json for env=${env}`);
    } else {
      console.log(`✅ Built content.json for env=${env} -> ${outPath}`);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      console.error(err.errors);
    }
    console.error('❌ Failed to build content.json', err);
    process.exit(1);
  }
})();
