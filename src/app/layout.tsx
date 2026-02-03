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
  title: "My Portfolio",
  description: "Modern DDD Portfolio",
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
            defaultTheme="system"
            enableSystem
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
