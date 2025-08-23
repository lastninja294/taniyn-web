"use client";
import React, { useState } from "react";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md"
    >
      <div className="w-full px-4 py-3">
        <div className="hidden md:flex items-center justify-center w-full font-mono text-xs text-gray-300">
          <div className="flex items-center space-x-8">
            <Link href="/" className="relative">
              <motion.div
                className="font-orbitron text-2xl font-bold text-white tracking-wider cursor-pointer "
                whileHover={{ scale: 1.05 }}
              >
                TANIYN
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center">
          <div className="font-orbitron text-xl font-bold text-white font-berosong">
            TANIYN
          </div>
          <button
            className="text-white hover:text-gray-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
          >
            <div className="flex flex-col space-y-4 font-mono text-sm">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-300 hover:text-white transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("merch")}
                className="text-left text-gray-300 hover:text-white transition-colors"
              >
                Merch
              </button>
              <button
                onClick={() => scrollToSection("concerts")}
                className="text-left text-gray-300 hover:text-white transition-colors"
              >
                Concerts
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

export default Header;
