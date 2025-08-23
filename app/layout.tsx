import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Orbitron } from "next/font/google";
import "./globals.css";
import { SplashScreen } from "@/components/splash-screen";
import Header from "@/components/layout/header";
import ProgressBar from "@/components/progress-bar";
import Footer from "@/components/layout/footer";
import Cursor from "@/components/cursor";

import localFont from "next/font/local";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

const berosong = localFont({
  src: [
    {
      path: "../public/font/Berosong-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-berosong",
});

export const metadata: Metadata = {
  title: "TANIYN - The Musician from the Future",
  description:
    "TANIYN is a futuristic hip-hop/rap artist blending dark aesthetics with powerful lyricism. Known for tracks like '079,' 'Toxic,' and 'Novacaine,' TANIYN is redefining the sound of the new generation.",
  keywords: [
    "TANIYN",
    "hip hop",
    "rap",
    "futuristic music",
    "079",
    "Toxic",
    "Novacaine",
    "Uzbek rap",
    "underground music",
    "music from the future",
  ],
  authors: [{ name: "TANIYN" }],
  creator: "TANIYN",
  publisher: "TANIYN",
  openGraph: {
    title: "TANIYN - The Musician from the Future",
    description:
      "Dive into TANIYN’s futuristic hip-hop world. Experience raw lyrics, unique beats, and iconic tracks like '079,' 'Toxic,' and 'Novacaine.'",
    url: "https://taniyn.uz",
    siteName: "TANIYN",
    images: [
      {
        url: "/images/meta.png",
        width: 800,
        height: 800,
        alt: "TANIYN - Futuristic Musician",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TANIYN - The Musician from the Future",
    description:
      "TANIYN is reshaping hip-hop with a futuristic sound. Listen to tracks like '079,' 'Toxic,' and 'Novacaine.'",
    images: ["/images/meta.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
  --font-orbitron: ${orbitron.variable};
  --font-berosong: ${berosong.variable};
}
        `}</style>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${orbitron.variable}`}
      >
        <Header />
        {children}
        <Footer />
        <Cursor />
        <SplashScreen />
        <ProgressBar />
      </body>
    </html>
  );
}
