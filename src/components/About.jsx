import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { aboutFacts } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import MetaList from "./ui/MetaList";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-eyebrow">Introduction</p>
      </motion.div>

      <div className="mt-10 grid gap-14 md:grid-cols-12 md:gap-10">
        <motion.div
          variants={fadeIn("up", "tween", 0.1, 0.8)}
          className="md:col-span-7"
        >
          <h2 className="display-lg text-ink">
            I design and ship software that feels{" "}
            <span className="accent-italic">effortless</span> to use.
          </h2>

          <p className="section-copy mt-8">
            I&apos;m a Full Stack Software Engineer with 4+ years of experience
            designing and delivering scalable web and cross-platform
            applications. I build with React, React Native, Next.js, Node.js,
            TypeScript, and FastAPI — from architecture through deployment —
            with a focus on APIs, real-time features, and AI integration.
          </p>

          <p className="section-copy mt-5">
            My approach is simple: understand the problem before the framework,
            keep the structure legible, and make the interface quiet enough that
            the work speaks for itself.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "tween", 0.25, 0.8)}
          className="md:col-span-5 md:pl-6 lg:pl-14"
        >
          <MetaList items={aboutFacts} />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
