import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { CARD_TILT_OPTIONS } from "../constants/tilt";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt {...CARD_TILT_OPTIONS} className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full accent-border-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="interactive-card bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img
          src={icon}
          alt={`${title} icon`}
          className="w-16 h-16 object-contain animate-float"
          loading="lazy"
        />

        <h3 className="text-white text-[20px] font-bold text-center font-display">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={`${styles.sectionHeadText} font-display`}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I&apos;m a Full Stack Software Engineer with 4+ years of experience
        designing and delivering scalable web and cross-platform applications. I
        build modern solutions with React, React Native, Next.js, Node.js,
        TypeScript, and FastAPI — from architecture and implementation through
        deployment — with a focus on APIs, real-time features, and AI
        integration. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
