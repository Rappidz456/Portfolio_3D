import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { CARD_TILT_OPTIONS } from "../constants/tilt";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        {...CARD_TILT_OPTIONS}
        className="interactive-card bg-tertiary/90 p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px] overflow-hidden rounded-2xl group">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-70" />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <button
              type="button"
              onClick={() =>
                window.open(source_code_link, "_blank", "noopener,noreferrer")
              }
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-accent/30 hover:shadow-glow transition-shadow"
              aria-label={`Open ${name} project`}
            >
              <img src={github} alt="" className="w-1/2 h-1/2 object-contain" />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px] font-display">
            {name}
          </h3>
          <p className="mt-2 text-secondary text-[14px] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText} font-display`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Production products and platforms I&apos;ve shipped — from AI-powered
          marketplaces to real-time surveillance systems. Explore live demos and
          case studies below.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
