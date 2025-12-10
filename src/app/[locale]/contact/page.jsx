import React from 'react';

export const metadata = {
  title: 'Contact ExploreTheBuzz – We Reply Fast',
  description:
    'Reach out for questions, collaboration, or guest post submissions. We read every email.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10">Get in Touch</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <p className="text-xl leading-relaxed">
            We read every single message. Seriously.
          </p>
          <p>
            Whether you found a bug in our Firebase auth tutorial, want to warn
            us about a new scam making rounds, have a killer guest post idea, or
            just want to say the RAG pipeline article saved your weekend — we
            want to hear it.
          </p>
          <p className="text-2xl font-bold text-primary mt-8">
    explorethebuz@gmail.com
          </p>
          <p>
            Average response time: <strong>under 24 hours</strong> (often same
            day).
          </p>

          <strong className="text-2xl font-bold text-foreground mt-12">
            We Especially Love Hearing About:
          </strong>
          <ul className="space-y-3 text-lg">
            <li>Production bugs in our code examples</li>
            <li>New attack vectors or scam patterns we should cover</li>
            <li>Tools or frameworks you want deep-dives on</li>
            <li>Guest post pitches (must include live demo + GitHub repo)</li>
          </ul>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mt-10">
            <p className="font-semibold text-orange-600 dark:text-orange-400">
              We do NOT provide:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li>Financial or investment advice</li>
              <li>Trading signals or "guaranteed profit" strategies</li>
              <li>Private consulting or paid reviews</li>
            </ul>
          </div>

          <p className="text-lg mt-10">
            Everything on ExploreTheBuzz is free, open, and educational. Always
            has been. Always will be.
          </p>
          <p className="text-xl">
            Have a question, bug report, or want to collaborate?
          </p>

          <p className="text-2xl font-bold text-primary">
            Email us at: explorethebuz@gmail.com
          </p>

          <p>
            We personally read and respond to every message — usually within{' '}
            <strong>24–48 hours</strong>.
          </p>

          <p>
            Whether you found an error in a tutorial, want to submit a guest
            post (we love deep technical content), or just want to say hi —
            we’re listening.
          </p>

          <div className="bg-muted/50 rounded-xl p-6 mt-10">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> We do not provide financial, investment, or
              trading advice. All cryptocurrency content is educational only.
              Always do your own research and consult licensed professionals.
            </p>
          </div>

          <p className="text-lg mt-10">
            Looking forward to hearing from you!
            <br />— The ExploreTheBuzz Team
          </p>
        </div>
      </div>
    </div>
  );
}
