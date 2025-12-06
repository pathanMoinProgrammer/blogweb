import React from 'react';

export const metadata = {
  title: 'Contact Us | BlogWeb',
  description:
    'Get in touch with BlogWeb. We would love to hear from you. Contact us for inquiries, feedback, or collaboration opportunities.',
  keywords: 'contact, feedback, support, inquiries, collaboration',
  openGraph: {
    title: 'Contact Us | BlogWeb',
    description: 'Get in touch with BlogWeb.',
    url: 'https://explorethebuzz.com/contact',
  },
};

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-lg text-muted-foreground text-center">
          We would love to hear from you. Get in touch with us for any
          inquiries, feedback, or collaboration opportunities.
        </p>
        <div className="mt-12 p-8 bg-card rounded-lg shadow-lg">
          <p className="text-muted-foreground">
            Contact page is currently under development. Please check back soon
            or reach out through our social media channels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
