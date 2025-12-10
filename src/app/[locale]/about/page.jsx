import React from 'react';

export const metadata = {
  title: 'About ExploreTheBuzz – Real Developers, Real Production Code',
  description: 'We are full-stack engineers who ship real apps. No hype. No sponsored fluff. Just deep, tested tutorials on AI agents, Next.js 14+, secure crypto practices, and production-grade web development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          About ExploreTheBuzz
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <p className="text-xl">
            ExploreTheBuzz was born out of frustration.
          </p>
          <p>
            We’re a team of full-stack developers who’ve spent years building and deploying real production applications — SaaS platforms, AI tools, trading dashboards, blockchain integrations — all while watching most tech blogs recycle the same shallow “Top 10 ChatGPT prompts” or “Next.js in 100 seconds” content.
          </p>
          <p>
            We got tired of tutorials that work locally but explode in production. Tired of AI guides that ignore token costs, rate limits, and security. Tired of crypto content that either shills garbage tokens or pretends the space is all scams.
          </p>
          <p>
            So we built ExploreTheBuzz: a blog where <strong>every single tutorial is written by someone who has actually shipped the code in a real app with real users and real money on the line</strong>.
          </p>

          <strong className="text-3xl font-bold text-foreground mt-12">What We Actually Cover</strong>
          <ul className="space-y-4 text-lg">
            <li>Building AI agents that survive production: RAG with live data, streaming responses, error recovery, cost monitoring</li>
            <li>Next.js 14+ done right: App Router, Server Actions, streaming, partial prerendering, edge vs node runtime trade-offs</li>
            <li>Firebase 10 authentication patterns that don’t leak tokens or break on refresh</li>
            <li>Secure Web3 integrations: self-custody wallets, signed messages, phishing-resistant flows</li>
            <li>Crypto safety: how to spot fake airdrops, audit smart contracts, verify team doxxing, and avoid honeypots</li>
            <li>Legal play-to-earn: only games with proven payouts, transparent economics, and real user earnings (Axie, Alien Worlds, etc.)</li>
            <li>AI-powered trading systems: backtested, open-source, no secret sauce, full risk disclaimers</li>
          </ul>

          <p className="text-xl font-medium text-foreground mt-10">
            We publish every <strong>Tuesday</strong> — no exceptions. Each article includes:
          </p>
          <ul className="list-disc pl-8 space-y-2 text-lg">
            <li>Complete, working GitHub repo</li>
            <li>Live demo (when possible)</li>
            <li>Performance benchmarks</li>
            <li>Security audit checklist</li>
            <li>Deployment instructions for Vercel, Railway, AWS</li>
            <li>Cost breakdown (tokens, API calls, hosting)</li>
          </ul>

          <p className="text-2xl font-bold text-center mt-16 text-foreground">
            No sponsored posts. No affiliate scams. No financial advice.<br />
            Just the truth about what actually works in 2025.
          </p>

          <p className="text-lg italic text-center mt-12">
            If you're done with clickbait and ready for content that respects your time and intelligence — you're home.
          </p>

          <p className="text-center text-sm text-muted-foreground mt-16">
            — The ExploreTheBuzz Team<br />
            Building in public since 2024
          </p>
        </div>
      </div>
    </div>
  );
}