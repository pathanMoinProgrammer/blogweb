// app/about/page.jsx

import React from "react";
import {
  Code2,
  Rocket,
  Shield,
  BookOpen,
  Zap,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  GitBranch,
  Lightbulb,
} from "lucide-react";
import { getTranslations } from "@/components/traslator";

export async function generateMetadata({ params }) {
  const locale = (await params?.locale || "en");
  const t = await getTranslations(locale, "about.meta");

  const baseUrl = "https://explorethebuzz.com";
  const canonicalUrl = `${baseUrl}/about`;

  return {
    title: t?.title || "About Us – ExploreTheBuzz",
    description: t?.description || "",
    keywords: [
      "About ExploreTheBuzz",
      "Developer Blog",
      "Production Code Tutorials",
      "Full Stack Development",
      "AI Development Blog",
      "Next.js Tutorials",
      "Web3 Development",
      "Technical Blog Team",
      "Real World Coding",
      "Software Engineering Blog",
      "Developer Community",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t?.ogTitle || "About ExploreTheBuzz",
      description: t?.ogDescription || "",
      url: canonicalUrl,
      siteName: "ExploreTheBuzz",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "ExploreTheBuzz – About Our Team",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t?.twitterTitle || "About ExploreTheBuzz",
      description: t?.twitterDescription || "",
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function AboutPage({ params }) {
  const locale = await params?.locale || "en";
  const t = await getTranslations(locale, "about");

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10" />

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 mb-6">
            <Sparkles className="text-blue-400 animate-pulse w-6 h-6 sm:w-7 sm:h-7" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
              {t?.hero?.title || "About ExploreTheBuzz"}
            </h1>
            <Sparkles className="text-pink-400 animate-pulse delay-500 w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            {t?.hero?.subtitle || "We're full-stack engineers..."}
          </p>
        </div>

        {/* Origin Story */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 hover:shadow-purple-500/20 transition-all duration-700 group">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {t?.originStory?.title || "Born Out of Frustration"}
            </h2>
          </div>
          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>{t?.originStory?.p1}</p>
            <p>{t?.originStory?.p2}</p>
            <p className="text-xl font-semibold text-white">
              {t?.originStory?.highlight}
            </p>
          </div>
        </div>

        {/* What We Cover */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <BookOpen className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {t?.topics?.title || "What We Actually Cover"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Zap, index: 0, color: "from-yellow-500 to-orange-500" },
              { icon: Code2, index: 1, color: "from-blue-500 to-cyan-500" },
              { icon: Shield, index: 2, color: "from-green-500 to-emerald-500" },
              { icon: GitBranch, index: 3, color: "from-purple-500 to-pink-500" },
              { icon: Target, index: 4, color: "from-red-500 to-orange-500" },
              { icon: TrendingUp, index: 5, color: "from-indigo-500 to-purple-500" },
            ].map(({ icon: Icon, index, color }) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {t?.topics?.items?.[index]?.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {t?.topics?.items?.[index]?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Standards */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {t?.standards?.title || "Every Article Includes"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: GitBranch,
              index: 0,
            },
              { icon: Rocket, index: 1 },
              { icon: Zap, index: 2 },
              { icon: Shield, index: 3 },
              { icon: Code2, index: 4 },
              { icon: TrendingUp, index: 5 },
            ].map(({ icon: Icon, index }) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 sm:p-5 border border-green-500/20 hover:border-green-500/40 transition-all group"
              >
                <Icon className="text-green-400 w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {t?.standards?.items?.[index]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400">
                  {t?.standards?.items?.[index]?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Publishing Schedule */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl sm:rounded-3xl border border-purple-500/30 p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
            <BookOpen className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t?.schedule?.title || "We Publish Every Tuesday"}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            {t?.schedule?.description}
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {[
            {
              icon: Shield,
              titleKey: "title1",
              descKey: "desc1",
              gradient: "from-red-500 to-orange-500",
            },
            {
              icon: Users,
              titleKey: "title2",
              descKey: "desc2",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              icon: Target,
              titleKey: "title3",
              descKey: "desc3",
              gradient: "from-purple-500 to-pink-500",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="group backdrop-blur-xl bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-500 text-center"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${value.gradient} rounded-full mb-4 group-hover:scale-110 transition-transform`}
              >
                <value.icon className="text-white w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">

                {t?.values?.[value.titleKey]}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {t?.values?.[value.descKey]}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl border border-white/20 p-8 sm:p-10 lg:p-14 text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t?.mission?.title}
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t?.mission?.description}
          </p>
        </div>

        {/* Team Philosophy */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 lg:p-12 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Users className="text-white w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {t?.team?.title || "Who We Are"}
            </h2>
          </div>
          <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>{t?.team?.p1}</p>
            <p>{t?.team?.p2}</p>
            <p className="text-xl font-semibold text-white">
              {t?.team?.highlight}
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl sm:rounded-3xl border border-white/20 p-8 sm:p-10 lg:p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl">
            <Rocket className="text-white w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t?.cta?.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {t?.cta?.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>{t?.cta?.btnTutorials}</span>
            </a>
            <a
              href="mailto:explorethebuz@gmail.com"
              className="inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur rounded-full text-white font-semibold text-sm sm:text-base border border-white/20 hover:bg-white/20 transition-all"
            >
              <Users className="w-5 h-5" />
              <span>{t?.cta?.btnContact}</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm sm:text-base italic">
            {t?.footer}
          </p>
        </div>
      </div>
    </div>
  );
}