import React from "react";
import {
  Shield,
  FileText,
  AlertTriangle,
  Scale,
  Copyright,
  DollarSign,
  Eye,
  Lock,
  Globe,
  BookOpen,
  Code2,
  Mail,
} from "lucide-react";
import { getTranslations } from "@/components/traslator";

export async function generateMetadata({ params }) {
  const locale = (await params?.locale) || "en";
  const tRow = await getTranslations(locale, "terms");
  const t = tRow?.meta || {};

  const baseUrl = "https://explorethebuzz.com";
  const canonicalUrl = `${baseUrl}/terms-and-conditions`;

  return {
    title: t?.title || "Terms & Conditions – ExploreTheBuzz",
    description: t?.description || "",
    alternates: { canonical: canonicalUrl },
  };
}

export default async function TermsAndConditions({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "terms");

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="pt-20 text-center max-w-6xl mx-auto px-4">
        <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-gray-700 dark:text-gray-200" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t?.hero?.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {t?.hero?.subtitle}
        </p>

        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-gray-300 dark:border-white/20 text-sm text-gray-600 dark:text-gray-300">
          <AlertTriangle className="w-4 h-4" />
          {t?.hero?.lastUpdated}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">

        {/* Section wrapper */}
        {[
          { icon: Shield, data: t?.sections?.acceptance },
          { icon: AlertTriangle, data: t?.sections?.educationalDisclaimer },
          { icon: Copyright, data: t?.sections?.contentUsage },
          { icon: Scale, data: t?.sections?.dmca },
          { icon: AlertTriangle, data: t?.sections?.conduct },
          { icon: Eye, data: t?.sections?.accuracy },
          { icon: Lock, data: t?.sections?.liability },
          { icon: Globe, data: t?.sections?.thirdParty },
          { icon: DollarSign, data: t?.sections?.ads },
          { icon: Scale, data: t?.sections?.law },
          { icon: FileText, data: t?.sections?.severability },
          { icon: AlertTriangle, data: t?.sections?.changes },
        ].map(({ icon: Icon, data }, i) => (
          <section
            key={i}
            className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <Icon className="text-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {data?.number}. {data?.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {data?.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {Object.values(data || {})
                .filter(v => typeof v === "string")
                .map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
            </div>
          </section>
        ))}

        {/* Contact */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-gray-700 dark:text-gray-200" />
          </div>

          <h2 className="text-3xl font-bold mb-4">{t?.contact?.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            {t?.contact?.text}
          </p>

          <a
            href="mailto:explorethebuz@gmail.com"
            className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition"
          >
            {t?.contact?.email}
          </a>

          <p className="text-xs text-gray-500 mt-4">
            {t?.contact?.responseTime}
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-200 dark:border-white/10 pt-6">
          {t?.acknowledgment?.copyright}
        </div>

      </div>
    </div>
  );
}
