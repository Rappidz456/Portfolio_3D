import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const ROLES = [
  "Full Stack Engineer",
  "React Native Builder",
  "AI-Ready Product Dev",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((current) => (current + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      <div
        className={`absolute inset-0 top-[110px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-accent shadow-glow animate-pulseGlow" />
          <div className="w-1 sm:h-80 h-40 accent-gradient" />
        </div>

        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accentSoft"
          >
            Available for product work
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${styles.heroHeadText} text-white font-display`}
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient-accent">Muhammad Ali</span>
          </motion.h1>

          <div className="mt-3 h-[42px] sm:h-[48px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="text-accentSoft text-xl sm:text-2xl font-semibold"
              >
                {ROLES[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${styles.heroSubText} mt-3 text-white-100`}
          >
            Building scalable web and mobile products with React, Next.js,
            Node.js, and AI-powered experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="cta-button rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-primary"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="cta-button rounded-xl border border-accent/40 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/10"
            >
              Let&apos;s talk
            </a>
          </motion.div>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[35px] h-[64px] rounded-3xl border-2 border-accent/50 flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-accent mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
