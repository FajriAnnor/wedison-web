import type { MetadataRoute } from "next";
import { articles, products, siteConfig } from "@/lib/mockData";
import { legalPages, sitePages } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const fixed = ["", "/motorcycles", "/compare", "/test-ride", "/ownership-cost", "/supercharger", "/supercharger-network", "/dealer", "/articles"];
  const paths = [
    ...fixed,
    ...sitePages.map((p) => `/${p.slug}`),
    ...legalPages.map((p) => `/legal/${p.slug}`),
    ...products.map((p) => `/motorcycles/${p.slug}`),
    ...articles.map((a) => `/articles/${a.slug}`),
  ];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
