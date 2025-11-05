import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";
import { resolveEnv } from "@/src/lib/data/env";

// Build-time synchronous snapshot of config.json mapped to legacy ConfigProps
// Note: This file is imported client and server. Do not leak secrets.
// We keep the same shape expected by existing imports.

function snapshot(): ConfigProps {
  // Since getConfigData is async fs read, we can't await here synchronously.
  // Instead, derive from NODE_ENV with safe defaults. Pages that need richer
  // config should use the data loader directly server-side.
  const isProd = process.env.NODE_ENV === "production";
  return {
    appName: "The White Horse",
    appDescription:
      "Village coaching inn on Waterbeach green serving Nepalese feasts, Sunday roasts, and cask ales from brunch through last orders.",
    domainName: "whitehorsepub.co",
    crisp: { id: "", onlyShowOnRoutes: ["/"] },
    stripe: {
      plans: [
        {
          priceId: isProd ? "price_live_stub" : "price_dev_stub",
          name: "Starter",
          description: "Legacy pricing placeholder",
          price: 99,
          priceAnchor: 149,
          features: [{ name: "Legacy" }],
        },
      ],
    },
    aws: { bucket: undefined, bucketUrl: undefined, cdn: undefined },
    mailgun: {
      subdomain: "mg",
      fromNoReply: `The White Horse <whitehorse@lapeninns.com>`,
      fromAdmin: `The White Horse <whitehorse@lapeninns.com>`,
      supportEmail: "whitehorse@lapeninns.com",
      forwardRepliesTo: "whitehorse@lapeninns.com",
    },
    colors: { theme: "light", main: themes["light"]["primary"] },
    auth: { loginUrl: "/book-a-table", callbackUrl: "/" },
  };
}

const config = snapshot();
export default config;
