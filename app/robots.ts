import type { MetadataRoute } from "next";
import { IS_MOCK_DATA, siteConfig } from "@/lib/mockData";

export default function robots(): MetadataRoute.Robots {
  // The site still runs on mock data, so keep search engines out until IS_MOCK_DATA is false.
  if (IS_MOCK_DATA) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
