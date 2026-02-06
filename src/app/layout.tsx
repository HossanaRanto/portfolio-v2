import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep fonts
import "./globals.css";
import React from 'react';
import { ThemeProvider } from "@/presentation/components/layout/ThemeProvider";
import { LanguageProvider } from "@/presentation/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://www.rantomahefaniaina.dev'), // Replace with your domain
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
