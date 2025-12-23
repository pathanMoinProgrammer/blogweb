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
    title: 'Privacy Policy – ExploreTheBuzz',
    description:
      "Read ExploreTheBuzz's Privacy Policy and understand how we collect, use, and protect your data.",
    alternates: {
      canonical: `${baseUrl}/privacy-policy`,
    },
  };
}

const PrivacyPolicy = async ({ params }) => {
  const locale = (await params?.locale) || 'en';
  const t = await getTranslations(locale, 'privacy');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="pt-20 text-center max-w-6xl mx-auto px-4">
        <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-gray-700 dark:text-gray-200" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          {t?.title || 'Privacy Policy'}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          At ExploreTheBuzz, your privacy is our priority. We are committed to
          protecting your personal information and being transparent about our
          data practices.
        </p>

        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-gray-300 dark:border-white/20 text-sm text-gray-600 dark:text-gray-300">
          <AlertTriangle className="w-4 h-4" />
          Last Updated: December 2025
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">

        {/* Introduction */}
        <Section
          icon={FileText}
          title="Introduction"
          subtitle="Understanding Our Commitment to Your Privacy"
        >
          <p>
            Welcome to ExploreTheBuzz. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our website.
          </p>
          <p>
            By accessing or using our Site, you agree to this Privacy Policy. If
            you do not agree, please discontinue use of the Site.
          </p>
        </Section>

        {/* Information We Collect */}
        <Section
          icon={Database}
          title="Information We Collect"
          subtitle="What Data We Gather and Why"
        >
          <List
            icon={Mail}
            title="Personal Information You Provide"
            items={[
              'Contact forms and inquiries',
              'Newsletter subscriptions',
              'Comments on blog posts',
              'Email communications',
            ]}
          />

          <List
            icon={Eye}
            title="Automatically Collected Information"
            items={[
              'IP address and device information',
              'Browser and operating system details',
              'Pages visited and interaction behavior',
            ]}
          />

          <p>
            We also use cookies and similar technologies to enhance site
            functionality and analyze traffic.
          </p>
        </Section>

        {/* How We Use Data */}
        <Section
          icon={Lock}
          title="How We Use Your Information"
          subtitle="Purposes for Data Processing"
        >
          <BulletList
            items={[
              'Operate and maintain the website',
              'Improve content and user experience',
              'Respond to inquiries and support requests',
              'Analyze performance and usage patterns',
              'Display advertisements via Google AdSense',
              'Ensure security and prevent fraud',
            ]}
          />
        </Section>

        {/* Third Party */}
        <Section
          icon={Globe}
          title="Third-Party Services"
          subtitle="External Tools We Use"
        >
          <p>
            We use services like Google Analytics and Google AdSense. These
            services may collect anonymous usage data through cookies.
          </p>
          <p>
            We do not sell or rent your personal information to third parties.
          </p>
        </Section>

        {/* Security */}
        <Section
          icon={Shield}
          title="Data Security"
          subtitle="How We Protect Your Information"
        >
          <BulletList
            items={[
              'SSL encryption for data transmission',
              'Restricted access to sensitive data',
              'Regular security audits',
            ]}
          />
          <p>
            While we strive to protect your data, no method of transmission is
            100% secure.
          </p>
        </Section>

        {/* Rights */}
        <Section
          icon={UserX}
          title="Your Privacy Rights"
          subtitle="GDPR & CCPA Compliance"
        >
          <BulletList
            items={[
              'Right to access your data',
              'Right to correction',
              'Right to deletion',
              'Right to opt out of tracking',
            ]}
          />
          <p>
            To exercise your rights, contact us at explorethebuz@gmail.com.
          </p>
        </Section>

        {/* Cookies */}
        <Section
          icon={Cookie}
          title="Cookies Policy"
          subtitle="Understanding Cookies"
        >
          <BulletList
            items={[
              'Essential cookies for functionality',
              'Analytics cookies',
              'Advertising cookies',
            ]}
          />
          <p>
            You can manage cookies through your browser settings.
          </p>
        </Section>

        {/* Contact */}
        <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-gray-700 dark:text-gray-200" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have questions about this Privacy Policy, feel free to reach
            out.
          </p>
          <a
            href="mailto:explorethebuz@gmail.com"
            className="inline-block px-8 py-3 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black font-semibold hover:opacity-90 transition"
          >
            explorethebuz@gmail.com
          </a>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-200 dark:border-white/10 pt-6">
          © 2025 ExploreTheBuzz. All rights reserved.
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;

/* ---------- Reusable Components ---------- */

const Section = ({ icon: Icon, title, subtitle, children }) => (
  <section className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center">
        <Icon className="text-gray-700 dark:text-gray-200" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-4 text-gray-600 dark:text-gray-300">
      {children}
    </div>
  </section>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <span className="mt-2 w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const List = ({ icon: Icon, title, items }) => (
  <div className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl p-4">
    <h3 className="font-semibold flex items-center mb-3">
      <Icon className="w-5 h-5 mr-2" />
      {title}
    </h3>
    <ul className="space-y-2 text-sm">
      {items.map((item, i) => (
        <li key={i}>• {item}</li>
      ))}
    </ul>
  </div>
);
