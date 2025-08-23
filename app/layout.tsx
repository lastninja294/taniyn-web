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
    "TANIYN is a hip-hop/rap artist who has released songs such as '079,' '' and 'TRAPSTAR'.",
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
