import { BRAND } from '@/src/lib/constants/brand';

type BrandTokenKey =
  | 'shortName'
  | 'shortNameEncoded'
  | 'fullName'
  | 'fullNameNoArticle'
  | 'fullNameEncoded'
  | 'fullNameNoArticleEncoded'
  | 'nickname'
  | 'nicknameEncoded'
  | 'teamName'
  | 'slug'
  | 'domain'
  | 'supportEmail'
  | 'hospitalityGroup';

const brandTokenMap: Record<BrandTokenKey, string> = {
  shortName: BRAND.shortName,
  shortNameEncoded: BRAND.shortNameEncoded,
  fullName: BRAND.fullName,
  fullNameNoArticle: BRAND.fullNameNoArticle,
  fullNameEncoded: BRAND.fullNameEncoded,
  fullNameNoArticleEncoded: BRAND.fullNameNoArticleEncoded,
  nickname: BRAND.nickname,
  nicknameEncoded: BRAND.nicknameEncoded,
  teamName: BRAND.teamName,
  slug: BRAND.slug,
  domain: BRAND.domain,
  supportEmail: BRAND.supportEmail,
  hospitalityGroup: BRAND.hospitalityGroup,
};

const tokenPatterns = Object.entries(brandTokenMap).map(([key, value]) => ({
  pattern: new RegExp(`\\{\\{\\s*brand\\.${key}\\s*\\}\\}`, 'gi'),
  replacement: value,
}));

const brandPatterns: Array<{ pattern: RegExp; replacement: string }> = [
  // Placeholder tokens
  ...tokenPatterns,
  // Legacy naming patterns
  { pattern: /The\s+White\s+Horse\s+Waterbeach/gi, replacement: BRAND.fullName },
  { pattern: /The\s+White\s+Horse/gi, replacement: BRAND.shortName },
  { pattern: /White\s+Horse/gi, replacement: BRAND.shortName },
  { pattern: /whitehorsepub\.co/gi, replacement: BRAND.domain },
  { pattern: /the-white-horse/gi, replacement: BRAND.slug },
  // Current brand literals to ensure future-proofing
  { pattern: /The\s+Corner\s+House\s+Cambridge/gi, replacement: BRAND.fullName },
  { pattern: /Corner\s+House\s+Cambridge/gi, replacement: BRAND.fullName },
  { pattern: /The\s+Corner\s+House/gi, replacement: BRAND.shortName },
  { pattern: /Corner\s+House/gi, replacement: BRAND.nickname },
  { pattern: /The%20Corner%20House%20Cambridge/gi, replacement: BRAND.fullNameEncoded },
  { pattern: /Corner%20House%20Cambridge/gi, replacement: BRAND.fullNameNoArticleEncoded },
  { pattern: /The%20Corner%20House/gi, replacement: BRAND.shortNameEncoded },
  { pattern: /Corner%20House/gi, replacement: BRAND.nicknameEncoded },
  { pattern: /cornerhousepub\.co/gi, replacement: BRAND.domain },
  { pattern: /corner-house/gi, replacement: BRAND.slug },
];

export function replaceBrandTokens(input: string): string {
  if (typeof input !== 'string' || !input.trim()) {
    return input;
  }

  return brandPatterns.reduce((text, { pattern, replacement }) => {
    return text.replace(pattern, replacement);
  }, input);
}

export function replaceBrandTokensInObject<T>(value: T): T {
  if (typeof value === 'string') {
    return replaceBrandTokens(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceBrandTokensInObject(item)) as unknown as T;
  }

  if (value && typeof value === 'object') {
    const next: Record<string, any> = Array.isArray(value) ? [] : {};
    Object.entries(value as Record<string, any>).forEach(([key, val]) => {
      next[key] = replaceBrandTokensInObject(val);
    });
    return next as T;
  }

  return value;
}
