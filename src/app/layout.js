// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeprovider";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";

export default function RootLayout({ children, params }) {
  const locale = params?.locale || "en";
  console.log("locale:", locale);

  return (
    <html lang={locale}>
      <body className="antialiased">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Navbar />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
