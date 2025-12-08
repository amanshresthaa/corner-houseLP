import brandJson from '@/config/brand.json';

const stripArticle = (value: string) => value.replace(/^The\s+/i, '');

export const BRAND = {
  shortName: brandJson.shortName,
  shortNameEncoded: encodeURIComponent(brandJson.shortName),
  fullName: brandJson.fullName,
  fullNameEncoded: encodeURIComponent(brandJson.fullName),
  nickname: brandJson.nickname ?? stripArticle(brandJson.shortName),
  nicknameEncoded: encodeURIComponent(brandJson.nickname ?? stripArticle(brandJson.shortName)),
  fullNameNoArticle: stripArticle(brandJson.fullName),
  fullNameNoArticleEncoded: encodeURIComponent(stripArticle(brandJson.fullName)),
  teamName: brandJson.teamName,
  slug: brandJson.slug,
  domain: brandJson.domain,
  supportEmail: brandJson.supportEmail,
  hospitalityGroup: brandJson.hospitalityGroup
} as const;
export const BRAND_NAME = BRAND.shortName;
export const BRAND_FULL_NAME = BRAND.fullName;
export const BRAND_NICKNAME = BRAND.nickname;
export const BRAND_FULL_NAME_NO_ARTICLE = BRAND.fullNameNoArticle;
export const BRAND_TEAM_NAME = BRAND.teamName;
export const BRAND_DOMAIN = BRAND.domain;
