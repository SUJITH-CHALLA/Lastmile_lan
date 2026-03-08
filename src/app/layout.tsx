import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LastMile — Get Hired 10x Faster | AI Job Application Intelligence",
  description: "LastMile is powered by AI-E — the Application Intelligence Engine. One-click apply, ATS resume tailoring, cover letters, and job tracking built for Indian job seekers.",
  openGraph: {
    title: "LastMile — Get Hired 10x Faster | AI Job Application Intelligence",
    description: "India's AI-powered job application intelligence. One-click apply, ATS resume tailoring, cover letters, and job tracking — all in one flow.",
    url: "https://lastmile.work",
    siteName: "LastMile",
    images: [{ url: "https://lastmile.work/og-image.jpg" }],
    type: "website",
  },
  alternates: {
    canonical: "https://lastmile.work"
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
  },
};

import { Suspense } from "react";
import { GlobalLoader } from "@/components/ui/global-loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.dicebear.com" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-w-[1024px]`}
      >
        <Suspense fallback={null}>
          <GlobalLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
