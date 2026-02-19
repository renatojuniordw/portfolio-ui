import { Metadata } from "next";
import { SOCIALS, PROFILE } from "./constants";

const SITE_URL = SOCIALS.personal.site;

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = "/og-image.jpg", // Placeholder default path
  noIndex = false,
}: SeoProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${PROFILE.name}`
    : `${PROFILE.name} - ${PROFILE.title}`;
  const fullDescription = description || PROFILE.summary;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: url,
      siteName: PROFILE.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: "@renatobezerrajr", // Assuming a handle or use name
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
