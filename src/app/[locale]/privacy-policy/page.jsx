import React from "react";
import {
  Shield,
  Eye,
  Users,
  Cookie,
  Lock,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;

  return {
    title: "Privacy Policy – ExploretheBuzz | Your Privacy Matters",
    description:
      "Learn how ExploretheBuzz collects and uses your data. We prioritize your privacy and ensure transparency on our blog platform.",
    keywords: [
      "ExploretheBuzz Privacy Policy",
      "Data Protection",
      "Personal Information",
      "User Privacy",
      "Cookies and Tracking",
      "Online Privacy Policy",
      "Data Security Practices",
      "Blog Privacy Compliance",
      "GDPR Compliance",
    ],
    alternates: {
      canonical: `https://explorethebuzz.com/${locale}/privacy-policy`,
    },
    openGraph: {
      title: "ExploretheBuzz Privacy Policy – Your Data Matters",
      description:
        "Discover how we handle your personal information with care. ExploretheBuzz is committed to protecting your privacy every step of the way.",
      url: `https://explorethebuzz.com/${locale}/privacy-policy`,
      siteName: "ExploretheBuzz",
      type: "article",
      locale: locale === "en" ? "en_US" : `${locale}_IN`,
      images: [
        {
          url: "https://explorethebuzz.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "ExploretheBuzz – Privacy Policy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "ExploretheBuzz – Our Privacy Promise to You",
      description:
        "At ExploretheBuzz, your privacy comes first. Explore how we collect and secure your data when you use our blog platform.",
      images: ["https://explorethebuzz.com/og-image.png"],
    },
  };
};

const PrivacyPolicy = async ({ params }) => {
  const { locale } = await params;
  const t = await getTranslations("privacyPolicy");

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 border-b border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mt-12 sm:mt-16 lg:mt-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
              {t("title")}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
              {t("description")}
            </p>
            <div className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-muted rounded-full border border-border">
              <Info className="w-4 h-4 text-blue-500" />
              <span className="text-xs sm:text-sm text-muted-foreground">
                {t("lastUpdated")}: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid gap-6 sm:gap-8">
          {/* Information Collection */}
          <div className="group">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
                  <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="sm:ml-4 lg:ml-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("section1.title")}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {t("section1.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                  {t("section1.description")}
                </p>

                <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 text-sm sm:text-base">
                        {t("section1.point1")}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                        {t("section1.point1Description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Providers */}
          <div className="group">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="sm:ml-4 lg:ml-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("section2.title")}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {t("section2.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                  {t("section2.description")}
                </p>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {["point1", "point2", "point3", "point4"].map(
                    (point, index) => (
                      <div
                        key={index}
                        className="flex items-start sm:items-center space-x-3 p-3 sm:p-4 bg-muted/50 rounded-xl border border-border hover:bg-muted transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="text-muted-foreground text-sm sm:text-base">
                          {t(`section2.${point}`)}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="bg-yellow-500/10 dark:bg-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-500/30">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 text-sm sm:text-base">
                        {t("section2.point5")}
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm sm:text-base">
                        {t("section2.point5Description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="group">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
                  <Cookie className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="sm:ml-4 lg:ml-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("section3.title")}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {t("section3.subtitle")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-muted/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border">
                  <h3 className="font-semibold text-foreground mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <Cookie className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                    {t("section3.point1")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                    {t("section3.point1Description")}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                  {t("section3.description")}
                </p>

                <div className="bg-purple-500/10 dark:bg-purple-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/30">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2 text-sm sm:text-base">
                        {t("section3.point2")}
                      </h3>
                      <p className="text-purple-700 dark:text-purple-300 text-sm sm:text-base">
                        {t("section3.point2Description")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="group w-full">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="sm:ml-4 lg:ml-6">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                    {t("section4.title")}
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {t("section4.subtitle")}
                  </p>
                </div>
              </div>

              <div className="bg-red-500/10 dark:bg-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-red-500/20">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <h3 className="font-bold text-foreground text-base sm:text-lg lg:text-xl">
                      {t("section4.point1")}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                      {t("section4.point1Description")}
                    </p>

                    <div className="bg-muted rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border">
                      <p className="text-muted-foreground text-xs sm:text-sm italic flex items-start">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                        <span>{t("section4.warning")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-8 sm:pb-12 px-4">
        <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-muted rounded-full border border-border">
          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span className="text-muted-foreground text-sm sm:text-base">
            {t("footer")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
