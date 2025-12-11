// app/terms-and-conditions/page.jsx

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
    keywords: [
      "Terms and Conditions",
      "User Agreement",
      "Legal Policy",
      "Content Usage",
      "Copyright Policy",
      "Educational Disclaimer",
      "ExploreTheBuzz Terms",
      "Blog Terms of Service",
      "Developer Blog Policy",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t?.ogTitle || "Terms & Conditions – ExploreTheBuzz User Agreement",
      description: t?.ogDescription || "",
      url: canonicalUrl,
      siteName: "ExploreTheBuzz",
      type: "article",
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "ExploreTheBuzz – Terms & Conditions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t?.twitterTitle || "Terms & Conditions – ExploreTheBuzz Legal Policy",
      description: t?.twitterDescription || "",
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function TermsAndConditions({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "terms");

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10" />

      {/* Header */}
      <div className="relative z-10 backdrop-blur-sm pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            {t?.hero?.title}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
            {t?.hero?.subtitle}
          </p>
          <div className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-xs sm:text-sm text-gray-300">
              {t?.hero?.lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid gap-6 sm:gap-8">

        {/* 1. Acceptance of Terms */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.acceptance?.number}. {t?.sections?.acceptance?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.acceptance?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.acceptance?.p1}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.acceptance?.p2}
            </p>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-300 mb-2 text-sm sm:text-base">
                    {t?.sections?.acceptance?.notice}
                  </h3>
                  <p className="text-blue-200 text-sm sm:text-base">
                    {t?.sections?.acceptance?.noticeText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Educational Content Disclaimer */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.educationalDisclaimer?.number}. {t?.sections?.educationalDisclaimer?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.educationalDisclaimer?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-2 text-base sm:text-lg">
                    {t?.sections?.educationalDisclaimer?.strongTitle}
                  </h3>
                  <p className="text-red-200 text-sm sm:text-base leading-relaxed">
                    {t?.sections?.educationalDisclaimer?.strongText}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              <strong className="text-white">{t?.sections?.educationalDisclaimer?.youAcknowledge}</strong>
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {t?.sections?.educationalDisclaimer?.risks?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-red-500/10 rounded-xl border border-red-500/20"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              {t?.sections?.educationalDisclaimer?.finalNote}
            </p>
          </div>
        </div>

        {/* 3. Content Usage & Copyright */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Copyright className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.contentUsage?.number}. {t?.sections?.contentUsage?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.contentUsage?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center text-sm sm:text-base">
                <Code2 className="w-5 h-5 mr-2 text-purple-400" />
                {t?.sections?.contentUsage?.code?.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                {t?.sections?.contentUsage?.code?.p}
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                {t?.sections?.contentUsage?.code?.list?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center text-sm sm:text-base">
                <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                {t?.sections?.contentUsage?.articles?.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                {t?.sections?.contentUsage?.articles?.p1}
              </p>
              <div className="space-y-3">
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                  <p className="text-green-300 text-sm sm:text-base font-semibold mb-1">
                    ✓ {t?.sections?.contentUsage?.articles?.allowed}
                  </p>
                  <ul className="text-gray-300 text-xs sm:text-sm ml-4 space-y-1">
                    {t?.sections?.contentUsage?.articles?.allowedList?.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <p className="text-red-300 text-sm sm:text-base font-semibold mb-1">
                    ✗ {t?.sections?.contentUsage?.articles?.prohibited}
                  </p>
                  <ul className="text-gray-300 text-xs sm:text-sm ml-4 space-y-1">
                    {t?.sections?.contentUsage?.articles?.prohibitedList?.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. DMCA & Copyright Claims */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.dmca?.number}. {t?.sections?.dmca?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.dmca?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.dmca?.p}
            </p>
            <div className="bg-green-500/10 rounded-xl p-4 sm:p-6 border border-green-500/20">
              <h3 className="font-semibold text-green-300 mb-3 text-sm sm:text-base">
                {t?.sections?.dmca?.howToFile}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base mb-3">
                Send your DMCA notice to{" "}
                <a
                  href="mailto:explorethebuz@gmail.com"
                  className="text-green-400 hover:text-green-300 underline"
                >
                  {t?.sections?.dmca?.email}
                </a>{" "}
                with the following information:
              </p>
              <ul className="space-y-2 text-gray-300 text-xs sm:text-sm ml-4">
                {t?.sections?.dmca?.requirements?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              <p className="text-green-300 text-sm mt-3">
                ⚡ {t?.sections?.dmca?.response}
              </p>
            </div>
          </div>
        </div>

        {/* 5. User Conduct & Prohibited Activities */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.conduct?.number}. {t?.sections?.conduct?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.conduct?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.conduct?.p}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {t?.sections?.conduct?.list?.map((item, index) => (
                <div
                  key={index}
                  className="bg-red-500/10 rounded-xl p-3 sm:p-4 border border-red-500/20"
                >
                  <p className="text-gray-300 text-xs sm:text-sm">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              {t?.sections?.conduct?.termination}
            </p>
          </div>
        </div>

        {/* 6. Accuracy & Content Updates */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.accuracy?.number}. {t?.sections?.accuracy?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.accuracy?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.accuracy?.p}
            </p>
            <div className="bg-cyan-500/10 rounded-xl p-4 sm:p-6 border border-cyan-500/20">
              <h3 className="font-semibold text-cyan-300 mb-2 text-sm sm:text-base">
                {t?.sections?.accuracy?.responsibility}
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                {t?.sections?.accuracy?.responsibilityList?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.accuracy?.final}
            </p>
          </div>
        </div>

        {/* 7. Limitation of Liability */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.liability?.number}. {t?.sections?.liability?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.liability?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.liability?.p}
            </p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {t?.sections?.liability?.list?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20"
                >
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">{item}</span>
                </div>
              ))}
            </div>
            <div className="bg-orange-500/10 rounded-xl p-4 sm:p-6 border border-orange-500/20 mt-4">
              <p className="text-orange-300 text-sm sm:text-base">
                <strong>{t?.sections?.liability?.asIs}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* 8. Third-Party Links */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.thirdParty?.number}. {t?.sections?.thirdParty?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.thirdParty?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.thirdParty?.p}
            </p>
            <div className="bg-pink-500/10 rounded-xl p-4 sm:p-6 border border-pink-500/20">
              <h3 className="font-semibold text-pink-300 mb-3 text-sm sm:text-base">
                {t?.sections?.thirdParty?.disclaimer}
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                {t?.sections?.thirdParty?.disclaimerList?.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 9. Advertising & Monetization */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.ads?.number}. {t?.sections?.ads?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.ads?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.ads?.p}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {t?.sections?.ads?.whatThisMeans}
                </h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm ml-4">
                  {t?.sections?.ads?.whatThisMeansList?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {t?.sections?.ads?.transparency}
                </h3>
                <ul className="space-y-2 text-gray-400 text-xs sm:text-sm ml-4">
                  {t?.sections?.ads?.transparencyList?.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.ads?.final}
            </p>
          </div>
        </div>

        {/* 10. Governing Law */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.law?.number}. {t?.sections?.law?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.law?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.law?.p1}
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.law?.p2}
            </p>
            <div className="bg-violet-500/10 rounded-xl p-4 sm:p-6 border border-violet-500/20">
              <h3 className="font-semibold text-violet-300 mb-2 text-sm sm:text-base">
                {t?.sections?.law?.informal}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t?.sections?.law?.informalText}
              </p>
            </div>
          </div>
        </div>

        {/* 11. Severability */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.severability?.number}. {t?.sections?.severability?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.severability?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">
                {t?.sections?.severability?.severability}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t?.sections?.severability?.severabilityText}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">
                {t?.sections?.severability?.entire}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t?.sections?.severability?.entireText}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">
                {t?.sections?.severability?.waiver}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {t?.sections?.severability?.waiverText}
              </p>
            </div>
          </div>
        </div>

        {/* 12. Changes to These Terms */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                {t?.sections?.changes?.number}. {t?.sections?.changes?.title}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {t?.sections?.changes?.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              {t?.sections?.changes?.p}
            </p>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 sm:p-6 border border-blue-500/30">
              <h3 className="font-semibold text-blue-300 mb-3 text-sm sm:text-base">
                {t?.sections?.changes?.responsibility}
              </h3>
              <p className="text-blue-200 text-sm sm:text-base mb-3">
                {t?.sections?.changes?.responsibilityText}
              </p>
              <p className="text-blue-200 text-sm sm:text-base">
                {t?.sections?.changes?.materialChanges}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-10 text-center hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-500 shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t?.contact?.title}
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 px-2">
            {t?.contact?.text}
          </p>
          <div className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-gray-400 mb-0.5">Email Us</p>
              <a
                href="mailto:explorethebuz@gmail.com"
                className="text-white font-semibold text-sm sm:text-base hover:text-blue-300 transition-colors"
              >
                {t?.contact?.email}
              </a>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm mt-6">
            {t?.contact?.responseTime}
          </p>
        </div>

        {/* Final Acknowledgment */}
        <div className="bg-black/30 backdrop-blur rounded-2xl p-6 sm:p-8 border border-white/10 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
            {t?.acknowledgment?.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-4">
            <strong className="text-white">
              {t?.acknowledgment?.strong}
            </strong>
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            {t?.acknowledgment?.disagree}
          </p>
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Legal Disclaimer:</strong> {t?.acknowledgment?.legal}
            </p>
          </div>
          <p className="text-gray-500 text-xs mt-6">
            {t?.acknowledgment?.copyright}
          </p>
        </div>
      </div>
    </div>
  );
}