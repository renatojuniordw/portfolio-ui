import { Metadata } from "next";
import { SOCIALS, PROFILE } from "./constants";

const SITE_URL = SOCIALS.personal.site;
const DEFAULT_OG_IMAGE = "/og-image.jpg";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords,
  type = "website",
  publishedTime,
  tags,
}: SeoProps = {}): Metadata {
  const fullTitle = title
    ? title.includes(PROFILE.name)
      ? title
      : `${title} | ${PROFILE.name}`
    : `${PROFILE.name} — ${PROFILE.title}`;

  const fullDescription = description || `${PROFILE.name}. ${PROFILE.title}. ${PROFILE.location}.`;

  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords?.join(", "),
    authors: [{ name: PROFILE.name, url: SITE_URL }],
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: "/r_icon.png",
      apple: "/r_icon.png",
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: PROFILE.name,
      locale: "pt_BR",
      type,
      ...(publishedTime && type === "article" ? { publishedTime } : {}),
      ...(tags && tags.length > 0 ? { tags } : {}),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: PROFILE.handle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
