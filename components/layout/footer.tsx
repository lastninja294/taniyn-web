"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUp,
  Instagram,
  Music,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black py-16 px-4">
      <div className="container mx-auto ">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center md:text-left">
            <div className="font-orbitron text-2xl font-bold text-white mb-4">
              TANIYN
            </div>
            <p className="font-mono text-sm text-gray-400">
              The musician from the future.
            </p>
          </div>

          <div className="text-center">
            <h4 className="font-orbitron text-lg font-bold mb-4 text-gray-400">
              Connect
            </h4>
            <div className="flex justify-center space-x-4">
              <Link
                href={"https://t.me/taniynuz"}
                className="text-white hover:text-gray-300 hover:bg-gray-700 p-2 rounded-md"
              >
                <Send className="h-5 w-5" />
              </Link>
              <Link
                href={"https://instagram.com/taniynuz"}
                className="text-white hover:text-gray-300 hover:bg-gray-700 p-2 rounded-md"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href={"https://youtube.com/@taniyndragon"}
                className="text-white hover:text-gray-300 hover:bg-gray-700 p-2 rounded-md"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href={"https://taplink.cc/taniyn"}
                className="text-white hover:text-gray-300 hover:bg-gray-700 p-2 rounded-md"
              >
                <Music className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-orbitron text-lg font-bold mb-4 text-gray-400">
              Contact
            </h4>
            <div className="font-mono text-sm text-gray-400 space-y-1 flex flex-col">
              <Link href="tel:+998936596519">TEL N.93 659 6519</Link>
              <Link href="mailto:contact@taniyn.uz">contact@taniyn.uz</Link>
              <p>Tashkent, UZB</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-mono text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Taniyn. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-gray-400  "
          >
            <ArrowUp className="h-4 w-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
