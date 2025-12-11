import React from "react";
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  Users,
  FileText,
  Lightbulb,
  Shield,
  TrendingUp,
} from "lucide-react";
import { getTranslations } from '@/components/traslator';

export async function generateMetadata({ params }) {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "contact.meta");

  const baseUrl = "https://explorethebuzz.com";
  const canonicalUrl = `${baseUrl}/contact`;

  return {
    title: t?.title || "Contact Us – ExploreTheBuzz",
    description: t?.description || "",
    keywords: [
      "Contact ExploreTheBuzz",
      "ExploreTheBuzz Support",
      "Tech Blog Contact",
      "Guest Post Submission",
      "Development Help",
      "Technical Support",
      "Collaboration Inquiry",
      "Bug Report",
      "Feedback ExploreTheBuzz",
      "Reach ExploreTheBuzz Team",
      "Developer Community Contact",
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: t?.ogTitle || "Contact ExploreTheBuzz – We're Here to Help",
      description: t?.ogDescription || "",
      url: canonicalUrl,
      siteName: "ExploreTheBuzz",
      type: "website",
      locale: "en_US",
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t?.twitterTitle || "Contact ExploreTheBuzz",
      description: t?.twitterDescription || "",
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

const ContactPage = async ({ params }) => {
  const locale = (await params?.locale) || "en";
  const t = await getTranslations(locale, "contact");

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10" />

      {/* Header Section */}
      <div className="relative z-10 backdrop-blur-sm pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 sm:mb-6 shadow-2xl animate-pulse">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            {t?.hero?.title || "Get in Touch"}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
            {t?.hero?.subtitle || "We read every single message..."}
          </p>
          <div className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-500/20 backdrop-blur rounded-full border border-green-500/30">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs sm:text-sm text-green-300">
              {t?.hero?.responseBadge || "Average Response Time: Under 24 Hours"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* Primary Contact Card */}
        <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-10 text-center hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-[1.02] mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl group-hover:shadow-blue-500/50 transition-all">
            <Send className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t?.primaryEmail?.title || "Primary Con. tact Email"}
          </h2>
          <a
            href="mailto:explorethebuz@gmail.com"
            className="inline-block text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all mb-4"
          >
            explorethebuz@gmail.com
          </a>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mt-4">
            {t?.primaryEmail?.description || "Send us your questions..."}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">{t?.primaryEmail?.responseTime || "24-48 Hour Response"}</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">{t?.primaryEmail?.allMessagesRead || "All Messages Read"}</span>
            </div>
          </div>
        </div>

        {/* We Especially Love Hearing About */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {t?.loveToHear?.title || "We Especially Love Hearing About"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: AlertCircle,
                title: t?.loveToHear?.items?.[0]?.title || "Bug Reports",
                description: t?.loveToHear?.items?.[0]?.description || "",
                color: "from-red-500 to-orange-500",
              },
              {
                icon: Shield,
                title: t?.loveToHear?.items?.[1]?.title || "Security Issues",
                description: t?.loveToHear?.items?.[1]?.description || "",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: FileText,
                title: t?.loveToHear?.items?.[2]?.title || "Guest Post Ideas",
                description: t?.loveToHear?.items?.[2]?.description || "",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: TrendingUp,
                title: t?.loveToHear?.items?.[3]?.title || "Tool Requests",
                description: t?.loveToHear?.items?.[3]?.description || "",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: MessageSquare,
                title: t?.loveToHear?.items?.[4]?.title || "Content Feedback",
                description: t?.loveToHear?.items?.[4]?.description || "",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Users,
                title: t?.loveToHear?.items?.[5]?.title || "Collaboration",
                description: t?.loveToHear?.items?.[5]?.description || "",
                color: "from-indigo-500 to-purple-500",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Post Guidelines */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {t?.guestPost?.title || "Guest Post Submissions"}
            </h2>
          </div>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4">
            {t?.guestPost?.intro || "We welcome high-quality technical content..."}
          </p>
          <div className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-start space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20"
              >
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">
                  {t?.guestPost?.requirements?.[i] || "Requirement"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 text-sm sm:text-base">
              <strong>{t?.guestPost?.proTip?.split(":")[0] || "Pro Tip"}:</strong>{" "}
              {t?.guestPost?.proTip?.split(":")[1] || "Include 'Guest Post Pitch' in subject..."}
            </p>
          </div>
        </div>

        {/* What We Don't Provide */}
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-red-500/30 p-6 sm:p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mr-4">
              <AlertCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {t?.notProvide?.title || "What We Do NOT Provide"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20"
              >
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                <span className="text-gray-300 text-xs sm:text-sm">
                  {t?.notProvide?.items?.[i] || "Service"}
                </span>
              </div>
            ))}
          </div>
          <p className="text-orange-300 text-sm sm:text-base mt-4 italic">
            {t?.notProvide?.note || "Everything on ExploreTheBuzz is free..."}
          </p>
        </div>

        {/* Why Developers Trust */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-6 text-center">
            {t?.whyTrust?.title || "Why Developers Trust ExploreTheBuzz"}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="text-center p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
                  {i === 0 && <CheckCircle2 className="w-6 h-6 text-white" />}
                  {i === 1 && <Users className="w-6 h-6 text-white" />}
                  {i === 2 && <TrendingUp className="w-6 h-6 text-white" />}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  {t?.whyTrust?.items?.[i]?.title || "Feature"}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {t?.whyTrust?.items?.[i]?.description || "Description"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {t?.finalCta?.title || "Ready to Connect?"}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 max-w-2xl mx-auto">
            {t?.finalCta?.text || "Whether you have a question..."}
          </p>
          <a
            href="mailto:explorethebuz@gmail.com"
            className="inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            <span>{t?.finalCta?.button || "Send Us an Email"}</span>
          </a>
          <p className="text-gray-400 text-xs sm:text-sm mt-6">
            {t?.finalCta?.closing || "Looking forward to hearing from you!\n— The ExploreTheBuzz Team"}
          </p>
        </div>

        {/* Disclaimer */}
        <div className="bg-black/30 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10 text-center mt-8">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> {t?.disclaimer || "ExploreTheBuzz provides educational content only..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;