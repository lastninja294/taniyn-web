import React from "react";

import { motion } from "framer-motion";
import { Music } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-8">
            About Taniyn
          </h2>
          <p className="font-mono text-lg leading-relaxed max-w-2xl mx-auto">
            "Taniyn" likely refers to the musician TANIYN, a hip-hop/rap artist
            born on August 26, 2002, who has released songs such as "Daydi,"
            "Xayr," and "TRAPSTAR".
          </p>
        </motion.div>

        {/* Exploded Diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-card border-2 border-foreground rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Music className="h-12 w-12 text-white" />
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-2">Upper Lid</h3>
            <p className="font-mono text-sm">
              Creative Vision & Artistic Direction
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-white border-2 border-foreground rounded-lg mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-background rounded-full" />
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-2">
              Power & Processor
            </h3>
            <p className="font-mono text-sm">
              Digital Synthesis & Sound Design
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-card border-2 border-foreground rounded-lg mx-auto mb-4 flex items-center justify-center">
              <div className="w-16 h-2 bg-white rounded" />
            </div>
            <h3 className="font-orbitron text-xl font-bold mb-2">Lower Body</h3>
            <p className="font-mono text-sm">Analog Foundation & Warmth</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
