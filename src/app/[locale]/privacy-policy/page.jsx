import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  Cookie,
  Mail,
  AlertTriangle,
  UserX,
  FileText,
  Globe,
  Database,
} from 'lucide-react';
import { getTranslations } from '@/components/traslator';

export async function generateMetadata() {
  const baseUrl = 'https://explorethebuzz.com';

  return {
    title: 'Privacy Policy – ExploreTheBuzz | How We Protect Your Data',
    description:
      "Read ExploreTheBuzz's Privacy Policy. Learn how we collect, use, and protect your data. We prioritize transparency and your privacy rights.",
    alternates: {
      canonical: `${baseUrl}/privacy-policy`,
    },
    openGraph: {
      title: 'ExploreTheBuzz – Privacy Policy & Data Protection',
      description:
        'Understand how ExploreTheBuzz handles your personal information. We collect minimal data and never sell your information to third parties.',
      url: `${baseUrl}/privacy-policy`,
      siteName: 'ExploreTheBuzz',
      type: 'article',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'ExploreTheBuzz – Privacy Policy',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Privacy Policy – ExploreTheBuzz Data Protection',
      description:
        'Your privacy matters. Read our comprehensive Privacy Policy to understand how we collect, use, and protect your personal information.',
      images: [`${baseUrl}/og-image.png`],
    },
    keywords: [
      'privacy policy',
      'data protection',
      'user privacy',
      'GDPR compliance',
      'CCPA compliance',
      'cookie policy',
      'data collection',
      'personal information',
      'ExploreTheBuzz privacy',
    ],
  };
}

const PrivacyPolicy = async ({ params }) => {
  const locale = (await params?.locale) || 'en';
  const t = await getTranslations(locale, 'privacy');

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10" />

      {/* Header */}
      <div className="relative z-10 backdrop-blur-sm pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
            {t?.title || 'Privacy Policy'}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
            At ExploreTheBuzz, your privacy is our priority. We are committed to
            protecting your personal information and being transparent about our
            data practices.
          </p>
          <div className="mt-6 sm:mt-8 inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-xs sm:text-sm text-gray-300">
              Last Updated: December 2025
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 grid gap-6 sm:gap-8">
        {/* Introduction */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Introduction
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Understanding Our Commitment to Your Privacy
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              Welcome to ExploreTheBuzz ("we," "our," or "us"). This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website explorethebuzz.com (the
              "Site"). We are committed to ensuring that your privacy is
              protected and that you understand our data practices.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              By accessing or using ExploreTheBuzz, you agree to this Privacy
              Policy. If you do not agree with the terms of this Privacy Policy,
              please do not access or use the Site. We reserve the right to make
              changes to this Privacy Policy at any time and for any reason.
            </p>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Information We Collect
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                What Data We Gather and Why
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center text-sm sm:text-base">
                <Mail className="w-5 h-5 mr-2 text-purple-400" />
                Personal Information You Provide
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                <li>• Submit contact forms or inquiries</li>
                <li>• Subscribe to newsletters or updates</li>
                <li>• Comment on blog posts or articles</li>
                <li>• Participate in surveys or promotional activities</li>
                <li>• Communicate with us via email or other channels</li>
              </ul>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mt-3">
                This information may include your name, email address, phone
                number, and any other information you choose to provide.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center text-sm sm:text-base">
                <Eye className="w-5 h-5 mr-2 text-purple-400" />
                Automatically Collected Information
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                When you visit our Site, we automatically collect certain
                information about your device and browsing behavior, including:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                <li>
                  • IP address and approximate geographic location (country/city
                  level)
                </li>
                <li>• Browser type, version, and language preferences</li>
                <li>
                  • Operating system and device type (desktop, mobile, tablet)
                </li>
                <li>
                  • Pages viewed, time spent on pages, and navigation paths
                </li>
                <li>• Referring website or source of traffic</li>
                <li>• Date and time of access</li>
                <li>• Click and scroll behavior on our Site</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 flex items-center text-sm sm:text-base">
                <Cookie className="w-5 h-5 mr-2 text-purple-400" />
                Cookies and Tracking Technologies
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We use cookies, web beacons, pixels, and similar tracking
                technologies to enhance your experience, analyze site traffic,
                and serve personalized advertisements. Cookies are small data
                files stored on your device that help us remember your
                preferences and understand how you use our Site.
              </p>
            </div>
          </div>
        </div>

        {/* How We Use Your Information */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                How We Use Your Information
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Purposes for Data Processing
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              We use the information we collect for various legitimate business
              purposes, including:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Provide, operate, and maintain our website and services',
                'Improve and personalize user experience on our Site',
                'Analyze usage patterns and site performance metrics',
                'Respond to inquiries, comments, and support requests',
                'Send administrative information and service updates',
                'Display personalized advertisements through Google AdSense',
                'Detect, prevent, and address technical issues or security threats',
                'Comply with legal obligations and enforce our terms',
                'Conduct research and development for site improvements',
                'Send newsletters and promotional content (with consent)',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-green-500/10 rounded-xl border border-green-500/20"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Third-Party Services & Disclosure
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                External Tools We Use
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 sm:p-6 border border-blue-500/20">
              <h3 className="font-semibold text-blue-300 mb-3 text-sm sm:text-base">
                Google Analytics 4
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We use Google Analytics 4 to analyze website traffic and user
                behavior. This service collects anonymous data such as page
                views, session duration, bounce rates, device types, and
                geographic locations. Google Analytics uses cookies and may
                collect IP addresses in anonymized form. For more information,
                visit Google's Privacy Policy at
                https://policies.google.com/privacy
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-4 sm:p-6 border border-red-500/20">
              <h3 className="font-semibold text-red-300 mb-3 text-sm sm:text-base">
                Google AdSense
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                We participate in the Google AdSense program to display
                personalized advertisements on our Site. Google AdSense uses
                cookies and similar technologies to serve ads based on your
                browsing history and interests. You can opt out of personalized
                advertising by visiting Google's Ad Settings at
                https://www.google.com/settings/ads or the Network Advertising
                Initiative opt-out page at https://optout.networkadvertising.org
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">
                When We Share Your Information
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-3">
                We do not sell, rent, or trade your personal information to
                third parties. However, we may share your information in the
                following circumstances:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                <li>
                  • With service providers who assist in operating our Site
                  (hosting, analytics, email services)
                </li>
                <li>
                  • With advertising partners like Google AdSense for serving
                  ads
                </li>
                <li>
                  • To comply with legal obligations, court orders, or
                  government requests
                </li>
                <li>
                  • To protect our rights, property, safety, or that of our
                  users
                </li>
                <li>
                  • In connection with a business transaction (merger,
                  acquisition, sale of assets)
                </li>
                <li>• With your explicit consent or at your direction</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Data Security & Retention
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                How We Protect Your Information
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              We implement reasonable administrative, technical, and physical
              security measures to protect your personal information from
              unauthorized access, use, disclosure, alteration, or destruction.
              These measures include:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Secure Socket Layer (SSL) encryption for data transmission',
                'Regular security audits and vulnerability assessments',
                'Restricted access to personal data on a need-to-know basis',
                'Server logs deleted after 14 days for privacy protection',
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20"
                >
                  <p className="text-gray-300 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20 mt-4">
              <p className="text-gray-300 text-sm sm:text-base flex items-start">
                <AlertTriangle className="w-5 h-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                However, no method of transmission over the Internet or
                electronic storage is 100% secure. While we strive to protect
                your information, we cannot guarantee its absolute security.
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg mt-4">
              We retain your personal information only for as long as necessary
              to fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>
          </div>
        </div>

        {/* Your Privacy Rights */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <UserX className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Your Privacy Rights
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                GDPR, CCPA & International Compliance
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              Depending on your location, you may have certain rights regarding
              your personal information under applicable data protection laws,
              including the General Data Protection Regulation (GDPR) and the
              California Consumer Privacy Act (CCPA). These rights may include:
            </p>
            <div className="grid gap-4">
              {[
                {
                  title: 'Right to Access',
                  description:
                    'Request a copy of all personal data we hold about you in a portable format (JSON)',
                },
                {
                  title: 'Right to Correction',
                  description:
                    'Request correction of inaccurate or incomplete personal information',
                },
                {
                  title: 'Right to Deletion',
                  description:
                    'Request permanent deletion of your personal data from our systems',
                },
                {
                  title: 'Right to Object',
                  description:
                    'Object to processing of your data for marketing or analytics purposes',
                },
                {
                  title: 'Right to Opt-Out',
                  description:
                    'Opt out of personalized advertising and analytics tracking',
                },
                {
                  title: 'Right to Withdraw Consent',
                  description:
                    'Withdraw consent at any time where processing is based on consent',
                },
              ].map((right, index) => (
                <div
                  key={index}
                  className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20"
                >
                  <h3 className="font-semibold text-purple-300 mb-2 text-sm sm:text-base">
                    {right.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {right.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 sm:p-6 border border-blue-500/30 mt-6">
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">
                How to Exercise Your Rights
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                To exercise any of these rights, please email us at
                explorethebuz@gmail.com with your request. We will respond
                within 30 days and may require verification of your identity
                before processing your request.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies Policy */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Cookie className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Cookies & Tracking Policy
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Understanding Cookies on Our Site
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              We use different types of cookies and similar tracking
              technologies to improve functionality, analyze performance, and
              serve personalized ads:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  type: 'Essential Cookies',
                  desc: 'Necessary for site functionality and cannot be disabled',
                },
                {
                  type: 'Analytics Cookies',
                  desc: 'Help us understand how visitors interact with our Site (Google Analytics)',
                },
                {
                  type: 'Advertising Cookies',
                  desc: 'Used to deliver personalized ads based on your interests (Google AdSense)',
                },
                {
                  type: 'Performance Cookies',
                  desc: 'Collect information about site performance and user experience',
                },
              ].map((cookie, index) => (
                <div
                  key={index}
                  className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20"
                >
                  <h3 className="font-semibold text-orange-300 mb-2 text-sm sm:text-base">
                    {cookie.type}
                  </h3>
                  <p className="text-gray-300 text-sm">{cookie.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10 mt-4">
              <h3 className="font-semibold text-white mb-3 text-sm sm:text-base">
                Managing Cookies
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-2">
                You can control and manage cookies in several ways:
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                <li>
                  • Browser settings: Most browsers allow you to refuse or
                  accept cookies
                </li>
                <li>
                  • Google Ad Settings: https://www.google.com/settings/ads
                </li>
                <li>
                  • Network Advertising Initiative:
                  https://optout.networkadvertising.org
                </li>
                <li>
                  • Do Not Track: We respect browser Do Not Track signals where
                  possible
                </li>
              </ul>
              <p className="text-gray-300 text-sm sm:text-base mt-3 italic">
                Note: Disabling cookies may affect site functionality and user
                experience.
              </p>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Children's Privacy
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Protection for Users Under 13
              </p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
            Our Site is not intended for children under the age of 13. We do not
            knowingly collect personal information from children under 13. If
            you are a parent or guardian and believe your child has provided us
            with personal information, please contact us immediately at
            explorethebuz@gmail.com, and we will take steps to remove such
            information from our systems.
          </p>
        </div>

        {/* International Data Transfers */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                International Data Transfers
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Cross-Border Data Processing
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              Your information, including personal data, may be transferred to
              and maintained on computers located outside of your state,
              province, country, or other governmental jurisdiction where data
              protection laws may differ from those in your jurisdiction.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              If you are located outside the United States and choose to provide
              information to us, please note that we transfer the data,
              including personal data, to the United States and process it
              there. Your consent to this Privacy Policy followed by your
              submission of such information represents your agreement to that
              transfer.
            </p>
            <div className="bg-indigo-500/10 rounded-xl p-4 sm:p-6 border border-indigo-500/20">
              <p className="text-gray-300 text-sm sm:text-base">
                We will take all steps reasonably necessary to ensure that your
                data is treated securely and in accordance with this Privacy
                Policy, and no transfer of your personal data will take place to
                an organization or country unless there are adequate controls in
                place including the security of your data and other personal
                information.
              </p>
            </div>
          </div>
        </div>

        {/* Do Not Track Signals */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Do Not Track Signals
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Browser Privacy Preferences
              </p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
            We respect Do Not Track (DNT) signals and do not track, plant
            cookies, or use advertising when a DNT browser mechanism is in
            place. Most web browsers and some mobile operating systems include a
            Do Not Track feature or setting you can activate to signal your
            privacy preference not to have data about your online browsing
            activities monitored and collected.
          </p>
        </div>

        {/* Data Breach Notification */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Data Breach Notification
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Our Commitment to Transparency
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              In the event of a data breach that affects your personal
              information, we will notify you and relevant authorities within 72
              hours of becoming aware of the breach, as required by applicable
              data protection laws. Our notification will include:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'The nature of the personal data breach',
                'The likely consequences of the breach',
                'Measures taken or proposed to address the breach',
                'Contact information for further inquiries',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 sm:p-4 bg-red-500/10 rounded-xl border border-red-500/20"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300 text-sm sm:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policy Updates */}
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/10 p-4 sm:p-6 lg:p-8 hover:bg-white/10 transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-0">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="sm:ml-4 lg:ml-6">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Staying Informed About Updates
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              We reserve the right to update or modify this Privacy Policy at
              any time and for any reason. We will notify you of any changes by
              updating the "Last Updated" date at the top of this Privacy
              Policy. Any changes or modifications will be effective immediately
              upon posting the updated Privacy Policy on the Site.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              We encourage you to periodically review this Privacy Policy to
              stay informed about how we are protecting your information. Your
              continued use of the Site after any changes constitutes your
              acceptance of the updated Privacy Policy.
            </p>
            <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl p-4 sm:p-6 border border-violet-500/30">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-violet-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-violet-300 mb-2 text-sm sm:text-base">
                    Material Changes
                  </h3>
                  <p className="text-violet-200 text-sm sm:text-base">
                    If we make material changes to this Privacy Policy that
                    significantly affect your rights, we will provide prominent
                    notice on our Site or send you an email notification (if you
                    have provided us with your email address).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20 p-6 sm:p-8 lg:p-10 text-center hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-500 shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 sm:mb-6 shadow-2xl">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Questions or Concerns?
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please don't hesitate to
            contact us. We are committed to addressing your privacy concerns
            promptly and transparently.
          </p>
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="inline-flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-gray-400 mb-0.5">Email Us</p>
                <a
                  href="mailto:explorethebuz@gmail.com"
                  className="text-white font-semibold text-sm sm:text-base hover:text-blue-300 transition-colors"
                >
                  explorethebuz@gmail.com
                </a>
              </div>
            </div>
            <div className="inline-flex items-center space-x-3 px-4 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-gray-400 mb-0.5">Visit Website</p>
                <a
                  href="https://explorethebuzz.com"
                  className="text-white font-semibold text-sm sm:text-base hover:text-purple-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  explorethebuzz.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-xs sm:text-sm">
              We typically respond to all inquiries within 48 hours. For data
              deletion requests, please allow up to 30 days for processing.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="bg-black/30 backdrop-blur rounded-2xl p-4 sm:p-6 border border-white/10 text-center">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            <strong className="text-white">Legal Disclaimer:</strong> This
            Privacy Policy constitutes a legally binding agreement between you
            and ExploreTheBuzz. By using our Site, you acknowledge that you have
            read, understood, and agreed to be bound by this Privacy Policy. If
            you do not agree, please discontinue use of our Site immediately.
          </p>
          <p className="text-gray-500 text-xs mt-3">
            © 2025 ExploreTheBuzz. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
