export type ArrayMergeStrategy = 'concat' | 'replace';

export function deepMergeContent(target: any, source: any, arrayStrategy: ArrayMergeStrategy = 'concat'): any {
  if (source === null || source === undefined) return target;
  if (target === null || target === undefined) return cloneValue(source);

  if (Array.isArray(source)) {
    if (Array.isArray(target)) {
      if (arrayStrategy === 'concat') {
        return [...target, ...source].map(cloneValue);
      }
      return cloneValue(source);
    }
    return cloneValue(source);
  }

  if (isObject(source) && isObject(target)) {
    const result: Record<string, any> = { ...cloneValue(target) };
    for (const key of Object.keys(source)) {
      result[key] = deepMergeContent((result as any)[key], (source as any)[key], arrayStrategy);
    }
    return result;
  }

  return cloneValue(source);
}

export function wrapWithMountPath(data: any, mountPath?: string): any {
  if (!mountPath) return data;
  const segments = mountPath.replace(/\//g, '.').split('.').filter(Boolean);
  if (segments.length === 0) return data;
  return segments.reduceRight((acc, segment) => ({ [segment]: acc }), data);
}

function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as unknown as T;
  }
  if (isObject(value)) {
    const result: Record<string, any> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = cloneValue(val);
    }
    return result as T;
  }
  return value;
}
