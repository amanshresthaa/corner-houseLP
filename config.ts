import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";
import { resolveEnv } from "@/src/lib/data/env";
import { BRAND } from "@/src/lib/constants/brand";

// Build-time synchronous snapshot of config.json mapped to legacy ConfigProps
// Note: This file is imported client and server. Do not leak secrets.
// We keep the same shape expected by existing imports.

function snapshot(): ConfigProps {
  // Since getConfigData is async fs read, we can't await here synchronously.
  // Instead, derive from NODE_ENV with safe defaults. Pages that need richer
  // config should use the data loader directly server-side.
  const isProd = process.env.NODE_ENV === "production";
  return {
    appName: BRAND.fullName,
    appDescription:
      "Art-deco Cambridge pub with HD sports, heated cabins, and a Nepali-chef kitchen serving curries, grills, and Sunday roasts.",
    domainName: BRAND.domain,
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
      fromNoReply: `${BRAND.shortName} <${BRAND.supportEmail}>`,
      fromAdmin: `${BRAND.shortName} <${BRAND.supportEmail}>`,
      supportEmail: BRAND.supportEmail,
      forwardRepliesTo: BRAND.supportEmail,
    },
    colors: { theme: "light", main: themes["light"]["primary"] },
    auth: { loginUrl: "/contact", callbackUrl: "/" },
  };
}

const config = snapshot();
export default config;
