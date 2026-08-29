import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { experiences } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ExperienceRow = ({ experience, index }) => (
  <motion.article
    variants={fadeIn("up", "tween", index * 0.08, 0.7)}
    className="hairline grid gap-6 py-10 md:grid-cols-12 md:gap-8"
  >
    <div className="flex items-start gap-4 md:col-span-4">
      <span className="index-num pt-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="display-md text-ink">{experience.title}</h3>
        <p className="mt-2 flex items-center gap-2.5 text-[14px] font-normal text-grey">
          <img
            src={experience.icon}
            alt=""
            aria-hidden="true"
            className="h-5 w-5 rounded-full object-contain"
            loading="lazy"
          />
          {experience.company_name}
        </p>
      </div>
    </div>

    <p className="text-[13px] font-normal tracking-wide text-clay md:col-span-3 md:pt-2">
      {experience.date}
    </p>

    <ul className="grid gap-3 md:col-span-5">
      {experience.points.map((point, pointIndex) => (
        <li
          key={`${experience.company_name}-${pointIndex}`}
          className="flex gap-3 text-[14px] font-normal leading-relaxed text-grey"
        >
          <span className="mt-2 h-px w-3 shrink-0 bg-sand" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </motion.article>
);

const Experience = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className={styles.sectionSubText}>Career</p>
          <h2 className={`${styles.sectionHeadText} mt-6`}>Experience</h2>
        </div>
        <p className="max-w-xs text-[14px] font-normal leading-relaxed text-grey">
          Where I&apos;ve worked, and what I was responsible for shipping.
        </p>
      </motion.div>

      <div className="mt-14">
        {experiences.map((experience, index) => (
          <ExperienceRow
            key={`${experience.company_name}-${experience.title}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
