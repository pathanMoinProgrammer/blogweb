import React from 'react';

export const metadata = {
  title: 'Privacy Policy – ExploreTheBuzz',
  description:
    'We collect minimal data, use secure analytics, and never sell your information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Privacy Policy
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Last updated: December 2025
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <p>
            At ExploreTheBuzz, your privacy is not negotiable. We collect the
            absolute minimum required to run a functional blog and improve your
            experience.
          </p>
          <strong>Data We Actually Collect</strong>
          <ul className="space-y-4">
            <li>
              <strong>Contact form:</strong> Only your email + message when you
              submit
            </li>
            <li>
              <strong>Google Analytics 4:</strong> Anonymous page views, session
              duration, device type, rough location (country-level). IP
              anonymized. No user IDs.
            </li>
            <li>
              <strong>Google AdSense:</strong> Cookies for ad personalization
              (you can disable in browser)
            </li>
            <li>
              <strong>Server logs:</strong> Standard stuff (IP, browser,
              timestamp) — deleted after 14 days
            </li>
          </ul>

          <strong>What We Do NOT Collect</strong>
          <ul className="space-y-3 text-lg">
            <li>No names, addresses, or payment info</li>
            <li>No email lists or newsletters (we don’t have one)</li>
            <li>No cross-site tracking or fingerprinting</li>
            <li>No data selling. Ever.</li>
          </ul>

          <strong>Your Rights (GDPR, CCPA, etc.)</strong>
          <p>Email us anytime to:</p>
          <ul>
            <li>
              Request all data we have on you (it’ll be a very small JSON)
            </li>
            <li>Delete everything permanently</li>
            <li>Opt out of analytics (just say the word)</li>
          </ul>

          <strong>Data We Collect</strong>
          <ul>
            <li>
              <strong>Contact forms:</strong> Only your email and message when
              you reach out.
            </li>
            <li>
              <strong>Analytics:</strong> Anonymous usage data via Google
              Analytics (page views, time on site, device type). No personal
              identifiers.
            </li>
            <li>
              <strong>Cookies:</strong> Essential session cookies and Google
              AdSense cookies for ad personalization (you can disable them
              anytime).
            </li>
          </ul>

          <strong>What We Do NOT Do</strong>
          <ul>
            <li>We never sell, rent, or share your personal data.</li>
            <li>We don’t track you across other sites.</li>
            <li>We don’t use aggressive retargeting or fingerprinting.</li>
          </ul>

          <strong>Third-Party Services</strong>
          <p>
            We use Google Analytics and Google AdSense. Both are configured with
            IP anonymization and respect Do Not Track headers where possible.
          </p>

          <strong>Your Rights</strong>
          <p>
            You can request deletion of any data we hold (just email us). You
            can also disable cookies in your browser — the site works perfectly
            without them.
          </p>

          <p className="text-foreground font-medium">
            We built this blog to help developers, not to harvest data. Simple
            as that.
          </p>

          <p className="text-sm italic">
            Questions? Email: explorethebuz@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
