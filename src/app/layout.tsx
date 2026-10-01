import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep fonts
import "./globals.css";
import React from 'react';
import { ThemeProvider } from "@/presentation/components/layout/ThemeProvider";
import { LanguageProvider } from "@/presentation/context/LanguageContext";
import { headers } from "next/headers";
import { JsonLd } from "@/presentation/seo/JsonLd";
import { localizedPath, SITE_NAME, SITE_URL } from "@/lib/seo";

const SITE_NAV = {
  en: [["Projects", "/projects"], ["Experiences", "/experiences"], ["Contact", "/contact"], ["About", "/about"], ["CV", "/cv"]],
  fr: [["Projets", "/projects"], ["Expériences", "/experiences"], ["Contact", "/contact"], ["À Propos", "/about"], ["CV", "/cv"]],
};

/** Site identity + main sections, which search engines can use as sitelinks. */
function siteJsonLd(lang: "en" | "fr") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, inLanguage: ["en", "fr"] },
      {
        "@type": "Person", "@id": `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL,
        jobTitle: lang === "fr" ? "Développeur Full Stack" : "Full Stack Developer",
      },
      ...SITE_NAV[lang].map(([name, path]) => ({
        "@type": "SiteNavigationElement",
        name,
        url: `${SITE_URL}${localizedPath(path, lang)}`,
      })),
    ],
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ranto Mahefaniaina | Full Stack Developer",
    template: "%s | Ranto Mahefaniaina",
  },
  description: "Modern DDD Portfolio of Ranto Mahefaniaina, a Senior Full Stack Developer specializing in React, Next.js, and reliable web solutions.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ranto Mahefaniaina Portfolio',
    images: [
        {
            url: '/img/profile.jpeg', // Using the profile image as default OG image
            width: 800,
            height: 600,
            alt: 'Ranto Mahefaniaina',
        }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = (await headers()).get("x-lang") === "fr" ? "fr" : "en";

  return (
    <html lang={lang} suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={siteJsonLd(lang)} />
        <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <React.Suspense fallback={null}>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </React.Suspense>
          </ThemeProvider>
      </body>
    </html>
  );
}
