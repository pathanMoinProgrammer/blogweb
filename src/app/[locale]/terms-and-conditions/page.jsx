import React from 'react';

export const metadata = {
  title: 'Terms & Conditions – ExploreTheBuzz',
  description:
    'By using this site, you agree to our terms. No financial advice. Educational content only.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Terms & Conditions
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Last updated: December 2025
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-muted-foreground">
          <strong>No Financial Advice — Ever</strong>
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6">
            <p className="font-bold text-red-600 dark:text-red-400 text-lg">
              All cryptocurrency, trading, and play-to-earn content is for
              educational purposes only.
            </p>
            <p className="mt-4">
              We do not guarantee profits. We do not recommend tokens. You are
              100% responsible for your financial decisions.
            </p>
          </div>

          <strong>Copyright & Code Usage</strong>
          <p>
            You’re free to use code from our tutorials in personal or commercial
            projects. Attribution is appreciated but not required. Just don’t
            republish entire articles without permission.
          </p>

          <strong>DMCA Policy</strong>
          <p>
            Found your content copied here? Email us with proof — we’ll remove
            it same day.
          </p>
          <p>
            By accessing ExploreTheBuzz, you agree to these terms. If you don’t
            agree, please don’t use the site.
          </p>

          <strong>Content Usage</strong>
          <p>
            All articles, code, and tutorials are for educational purposes.
            You’re free to use code snippets in your projects (with attribution
            appreciated but not required).
          </p>

          <strong>No Financial Advice</strong>
          <p className="bg-yellow-500/10 dark:bg-yellow-500/20 p-4 rounded-lg border border-yellow-500/30">
            <strong>Important:</strong> Nothing on this site constitutes
            financial, investment, or trading advice. Cryptocurrency and
            play-to-earn content is educational only. You are solely responsible
            for your decisions and losses.
          </p>

          <strong>Accuracy & Updates</strong>
          <p>
            We strive for accuracy but technology changes fast. Code examples
            are tested at time of publishing but may require updates. Always
            verify in your environment.
          </p>

          <strong>Liability</strong>
          <p>
            We are not liable for any damages resulting from use of this site or
            its content. All information is provided “as is” without warranty.
          </p>

          <strong>Changes</strong>
          <p>
            We may update these terms. Continued use after changes means
            acceptance.
          </p>

          <p className="text-foreground font-medium">
            We built this blog to help you build better — not to hide behind
            legalese.
          </p>

          <p className="text-sm italic">
            Questions? Reach out: contact@explorethebuzz.com
          </p>
        </div>
      </div>
    </div>
  );
}
