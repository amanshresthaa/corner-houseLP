import fs from 'fs/promises';
import path from 'path';
import { ContentSchema, type Content } from '../data/schemas';
import { resolveContentEnvChain, type AppEnv } from '../data/env';
import { deepMergeContent, wrapWithMountPath } from './utils';

export interface ManifestModuleConfig {
  priority: number;
  loadStrategy: 'always' | 'lazy' | 'conditional';
  cacheDuration: number;
  files: string[];
  dependencies: string[];
  condition?: string;
  mountPath?: string;
  size: 'small' | 'medium' | 'large';
}

export interface ContentManifest {
  version: string;
  description?: string;
  lastUpdated?: string;
  modules: Record<string, ManifestModuleConfig>;
  composition: any;
  environments: Record<string, { overrides?: string[]; excludeModules?: string[] }>;
  performance?: any;
  validation?: any;
  features?: any;
}

const contentDir = path.join(process.cwd(), 'config', 'content');

export async function loadManifest(): Promise<ContentManifest> {
  const manifestPath = path.join(contentDir, 'manifest.json');
  const raw = await fs.readFile(manifestPath, 'utf8');
  return JSON.parse(raw) as ContentManifest;
}

export async function composeContentFromModules(env: AppEnv): Promise<Content> {
  const manifest = await loadManifest();

  const modules = Object.entries(manifest.modules || {}).sort(
    (a, b) => (a[1]?.priority ?? 999) - (b[1]?.priority ?? 999)
  );

  let composed: any = {};

  for (const [moduleId, moduleConfig] of modules) {
    let moduleData: any = {};

    for (const fileName of moduleConfig.files || []) {
      const filePath = path.join(contentDir, fileName);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const fileJson = JSON.parse(fileContent);
      moduleData = deepMergeContent(moduleData, fileJson, 'concat');
    }

    const envConfig = manifest.environments?.[env];
    if (envConfig?.overrides) {
      for (const overrideDir of envConfig.overrides) {
        const overridePath = path.join(contentDir, overrideDir, `${moduleId}.json`);
        try {
          const overrideContent = await fs.readFile(overridePath, 'utf8');
          const overrideData = JSON.parse(overrideContent);
          moduleData = deepMergeContent(moduleData, overrideData, 'concat');
        } catch (error: any) {
          if (error?.code !== 'ENOENT') {
            console.warn(`Failed to load override for ${moduleId} at ${overridePath}:`, error);
          }
        }
      }
    }

    const mounted = wrapWithMountPath(moduleData, moduleConfig.mountPath || moduleId.replace(/\//g, '.'));
    composed = deepMergeContent(composed, mounted, 'concat');
  }

  const envChain = resolveContentEnvChain(env);
  for (const envName of envChain) {
    const overridePath = path.join(process.cwd(), 'data', envName, 'content.json');
    try {
      const overrideRaw = await fs.readFile(overridePath, 'utf8');
      const override = JSON.parse(overrideRaw);
      composed = deepMergeContent(composed, override, 'concat');
    } catch (error: any) {
      if (error?.code !== 'ENOENT') {
        console.warn(`Failed to load legacy content override for ${envName}:`, error);
      }
    }
  }

  return ContentSchema.parse(composed) as Content;
}
