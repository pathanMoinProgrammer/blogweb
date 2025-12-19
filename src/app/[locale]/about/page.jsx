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
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "about.meta");

  const baseUrl = "https://explorethebuzz.com";
  const canonicalUrl = `${baseUrl}/about`;

  return {
    title: t?.title || "About Us – ExploreTheBuzz",
    description: t?.description || "",
    alternates: { canonical: canonicalUrl },
  };
}

export default async function AboutPage({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "about");

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 relative overflow-hidden">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
              {t?.hero?.title}
            </h1>
            <Sparkles className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {t?.hero?.subtitle}
          </p>
        </div>

        {/* Origin Story */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
              <Lightbulb className="text-gray-700 dark:text-gray-200" />
            </div>
            <h2 className="text-3xl font-bold">{t?.originStory?.title}</h2>
          </div>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>{t?.originStory?.p1}</p>
            <p>{t?.originStory?.p2}</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {t?.originStory?.highlight}
            </p>
          </div>
        </section>

        {/* What We Cover */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8">{t?.topics?.title}</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[Zap, Code2, Shield, GitBranch, Target, TrendingUp].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-5 hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-gray-700 dark:text-gray-200" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {t?.topics?.items?.[index]?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t?.topics?.items?.[index]?.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Standards */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8">{t?.standards?.title}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[GitBranch, Rocket, Zap, Shield, Code2, TrendingUp].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-5"
                >
                  <Icon className="w-8 h-8 text-gray-700 dark:text-gray-200 mb-3" />
                  <h3 className="font-semibold mb-1">
                    {t?.standards?.items?.[index]?.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t?.standards?.items?.[index]?.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-10 text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">{t?.mission?.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {t?.mission?.description}
          </p>
        </section>

        {/* CTA */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">{t?.cta?.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t?.cta?.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="px-8 py-4 bg-gray-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:opacity-90 transition"
            >
              {t?.cta?.btnTutorials}
            </a>
            <a
              href="mailto:explorethebuz@gmail.com"
              className="px-8 py-4 border border-gray-300 dark:border-white/20 rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              {t?.cta?.btnContact}
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
