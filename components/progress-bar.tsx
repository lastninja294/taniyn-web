"use client";
import React from "react";

import { motion, useScroll } from "framer-motion";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  );
};

export default ProgressBar;
