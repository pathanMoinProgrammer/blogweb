import React from "react";
import { getTranslations } from "@/components/traslator";
import ContactUsClient from "../../../components/contactpageClient";

export async function generateMetadata({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "contact.meta");

  const baseUrl = "https://explorethebuzz.com";
  const canonicalUrl = `${baseUrl}/contact`;

  return {
    title: t?.title || "Contact Us – ExploreTheBuzz",
    description: t?.description || "",
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: t?.ogTitle || "Contact ExploreTheBuzz",
      description: t?.ogDescription || "",
      url: canonicalUrl,
      siteName: "ExploreTheBuzz",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t?.twitterTitle || "Contact ExploreTheBuzz",
      description: t?.twitterDescription || "",
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function ContactPage({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "contact");

  return <ContactUsClient locale={locale} translations={t} />;
}
