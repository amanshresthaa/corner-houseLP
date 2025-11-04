module.exports = {
  // The White Horse Waterbeach official domain
  siteUrl: process.env.SITE_URL || "https://whitehorsepub.co/",
  generateRobotsTxt: true,
  // Use this to exclude routes from the sitemap (e.g. internal APIs, well-known files, and static asset entries)
  // By default, NextJS app router metadata files are excluded (https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
  exclude: [
    "/api/*",
    "/.well-known/*",
    "/twitter-image.*",
    "/opengraph-image.*",
    "/icon.*",
    "/apple-icon.png",
    "/favicon.ico",
    "/christmas-menu",
    "/curry-and-carols-menu",
    "/takeaway-menu",
    "/wakes-menu",
    "/cls-optimized",
    "/test-hours",
    "/sitemap-*.xml",
    "/sitemap.xml",
  ],
  transform: async (config, path) => {
    // Skip any API or well-known paths (defensive)
    if (path.startsWith('/api/') || path.startsWith('/.well-known/')) return null;

    // Ensure no trailing double slash
    const loc = `${config.siteUrl.replace(/\/$/, '')}${path}`;

    return {
      loc,
      lastmod: new Date().toISOString(),
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1.0 : 0.7,
    };
  },
};
