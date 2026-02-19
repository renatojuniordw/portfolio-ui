import { MetadataRoute } from "next";
import { SOCIALS } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${SOCIALS.personal.site}/sitemap.xml`,
  };
}
