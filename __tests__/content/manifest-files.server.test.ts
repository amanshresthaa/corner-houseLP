import fs from 'fs';
import path from 'path';
import { ContentManifestSchema } from '../../src/lib/content/validation';

const contentDir = path.join(process.cwd(), 'config', 'content');
const manifestPath = path.join(contentDir, 'manifest.json');

describe('Content manifest', () => {
  const manifestRaw = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestRaw);
  ContentManifestSchema.parse(manifest);

  it('all module files exist and are JSON', () => {
    for (const [_moduleId, config] of Object.entries<any>(manifest.modules)) {
      for (const fileRel of config.files) {
        expect(fileRel.endsWith('.json')).toBe(true);
        const fullPath = path.join(contentDir, fileRel);
        expect(fs.existsSync(fullPath)).toBe(true);
      }
    }
  });
});
