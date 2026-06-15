import type { MetadataRoute } from "next";

// Tells search engines what to index. Portals/login are kept private.
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/teacher", "/student", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
