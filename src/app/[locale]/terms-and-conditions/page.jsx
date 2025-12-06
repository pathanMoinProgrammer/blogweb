import React from "react";
import {
  Shield,
  FileText,
  AlertTriangle,
  Users,
  Globe,
  Scale,
  Lock,
  Eye,
} from "lucide-react";

export async function generateMetadata({ params }) {
  const locale = (await params)?.locale || "en";
  const baseUrl = `https://explorethebuzz.com/${locale}`;

  return {
    title: "Terms & Conditions – ExploretheBuzz | User Agreement & Guidelines",
    description:
      "Read the Terms & Conditions of ExploretheBuzz. Know your rights, responsibilities, and rules before using our blog platform.",
    alternates: {
      canonical: `${baseUrl}/terms-and-conditions`,
    },
    openGraph: {
      title: "ExploretheBuzz – Terms & Conditions of Use",
      description:
        "Review our Terms & Conditions to understand what's expected when using ExploretheBuzz. Your use of the platform indicates your agreement to these terms.",
      url: `${baseUrl}/terms-and-conditions`,
      siteName: "ExploretheBuzz",
      type: "article",
      locale: locale === "en" ? "en_US" : `${locale}_IN`,
      images: [
        {
          url: "https://explorethebuzz.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "ExploretheBuzz – Terms & Conditions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Terms & Conditions – ExploretheBuzz User Policy",
      description:
        "By using ExploretheBuzz, you agree to the platform's terms. Read our full Terms & Conditions to learn about your responsibilities and rights.",
      images: ["https://explorethebuzz.com/og-image.png"],
    },
  };
}

const sections = [
  {
    title: "Acceptance of Terms",
    subtitle: "Your agreement to our policies",
    icon: Shield,
    gradient: "from-blue-500 to-cyan-500",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
          By accessing and using ExploretheBuzz, you acknowledge that you have
          read, understood, and agree to be bound by these Terms and Conditions.
          If you do not agree to these terms, please do not use our website.
        </p>
        <div className="bg-blue-500/10 dark:bg-blue-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-500/30 mt-4 sm:mt-6">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 dark:text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-600 dark:text-blue-300 mb-2 text-sm sm:text-base">
                Important Notice
              </h3>
              <p className="text-blue-600/80 dark:text-blue-200 text-sm sm:text-base">
                We reserve the right to modify these terms at any time.
                Continued use of the site after changes constitutes acceptance
                of the new terms.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "User Responsibilities",
    subtitle: "What we expect from you",
    icon: Scale,
    gradient: "from-green-500 to-emerald-500",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
          As a user of ExploretheBuzz, you are responsible for maintaining the
          confidentiality of your account and for all activities that occur
          under your account.
        </p>
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-4 sm:mt-6">
          User Restrictions
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
          {[
            "Provide accurate and truthful information",
            "Respect intellectual property rights",
            "Use the platform for lawful purposes only",
            "Not impersonate others or misrepresent affiliation",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start sm:items-center space-x-3 p-3 sm:p-4 bg-red-500/10 rounded-xl border border-red-500/20"
            >
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
              <span className="text-muted-foreground text-sm sm:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "Account Security",
    subtitle: "Protecting your account",
    icon: Users,
    gradient: "from-purple-500 to-pink-500",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
          You are responsible for safeguarding your account credentials and for
          any activities or actions under your account. We encourage you to use
          a strong, unique password.
        </p>
        <div className="grid gap-4 sm:gap-6 mt-4 sm:mt-6">
          {[
            {
              icon: Lock,
              title: "Password Protection",
              text: "Keep your password confidential and never share it with others. Use a combination of letters, numbers, and special characters.",
            },
            {
              icon: Eye,
              title: "Account Monitoring",
              text: "We may monitor accounts for suspicious activity and reserve the right to suspend accounts that violate our terms.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-muted/50 dark:bg-white/5 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border"
            >
              <h3 className="font-semibold text-foreground mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500 dark:text-purple-400" />
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "Prohibited Activities",
    subtitle: "Actions that are not allowed",
    icon: AlertTriangle,
    gradient: "from-red-500 to-orange-500",
    content: (
      <>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
          The following activities are strictly prohibited on ExploretheBuzz.
          Violation of these rules may result in immediate account termination.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
          {[
            "Posting spam, malware, or malicious content",
            "Harassing, threatening, or abusing other users",
            "Attempting to hack or exploit the platform",
            "Scraping content without authorization",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-red-500/10 rounded-xl p-3 sm:p-4 border border-red-500/20"
            >
              <p className="text-muted-foreground text-xs sm:text-sm">{item}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    title: "Governing Law",
    subtitle: "Legal jurisdiction and compliance",
    icon: Globe,
    gradient: "from-yellow-500 to-orange-500",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of the jurisdiction in which ExploretheBuzz
          operates. Any disputes arising from these terms will be subject to the
          exclusive jurisdiction of the courts in that jurisdiction.
        </p>
        <div className="bg-muted/50 dark:bg-black/20 rounded-xl p-3 sm:p-4 border border-border">
          <p className="text-muted-foreground text-xs sm:text-sm italic flex items-start">
            <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
            By using our services, you consent to the application of these laws
            regardless of your location.
          </p>
        </div>
      </div>
    ),
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 mt-15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto px-4">
            Please read these terms and conditions carefully before using
            ExploretheBuzz. By accessing our blog, you agree to be bound by
            these terms.
          </p>
          <div className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-muted/50 dark:bg-white/10 backdrop-blur rounded-full border border-border dark:border-white/20">
            <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
            <span className="text-xs sm:text-sm text-muted-foreground">
              Last updated: December 2024
            </span>
          </div>
        </div>
      </div>

      {/* Main Sections */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid gap-6 sm:gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="group bg-card/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-border dark:border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-card dark:hover:bg-white/10 transition-all duration-500 hover:shadow-xl"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${section.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 sm:mb-0`}
              >
                <section.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="sm:ml-4 lg:ml-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {section.subtitle}
                </p>
              </div>
            </div>
            {section.content}
          </div>
        ))}

        {/* Contact Section */}
        <div className="group bg-card/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-border dark:border-white/10 p-4 sm:p-6 lg:p-8 text-center hover:bg-card dark:hover:bg-white/10 transition-all duration-500 hover:shadow-xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            Questions About Our Terms?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg mt-3 sm:mt-4 px-2">
            If you have any questions or concerns about these Terms and
            Conditions, please don&apos;t hesitate to contact us.
          </p>
          <div className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 mt-4 sm:mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 backdrop-blur rounded-full border border-purple-500/30">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 dark:text-purple-400" />
            <span className="text-purple-600 dark:text-purple-300 text-sm sm:text-base">
              contact@explorethebuzz.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
