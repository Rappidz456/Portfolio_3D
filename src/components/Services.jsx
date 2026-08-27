import { lazy, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { services, skillCategories, technologies } from "../constants";
import { useInView } from "../hooks/useInView";
import { fadeIn, textVariant } from "../utils/motion";

const TechSpheresCanvas = lazy(() => import("./canvas/TechSpheres"));

/** Floating, spinning 3D spheres — one canvas, mounted only when in view. */
const TechSpheres = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { rootMargin: "200px" });

  return (
    <div ref={ref} className="mt-16 h-[32rem] w-full sm:h-[26rem] lg:h-[24rem]">
      {isVisible ? (
        <Suspense fallback={null}>
          <TechSpheresCanvas
            technologies={technologies}
            className="h-full w-full"
          />
        </Suspense>
      ) : null}
    </div>
  );
};

const ServiceRow = ({ service, index, isOpen, onToggle }) => (
  <motion.div
    variants={fadeIn("up", "tween", index * 0.07, 0.65)}
    className="hairline"
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="group flex w-full items-center gap-6 py-7 text-left"
    >
      <span className="index-num w-10 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`display-md flex-1 transition-colors duration-500 ease-editorial ${
          isOpen ? "text-clay" : "text-ink group-hover:text-espresso"
        }`}
      >
        {service.title}
      </span>
      <Plus
        className={`h-5 w-5 shrink-0 text-grey transition-transform duration-500 ease-editorial ${
          isOpen ? "rotate-45" : ""
        }`}
        strokeWidth={1.25}
      />
    </button>

    <div
      className={`grid transition-all duration-500 ease-editorial ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <p className="max-w-2xl pb-8 pl-16 text-[15px] font-light leading-relaxed text-grey">
          {service.description}
        </p>
      </div>
    </div>
  </motion.div>
);

const Services = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className={styles.sectionSubText}>What I do</p>
          <h2 className={`${styles.sectionHeadText} mt-6`}>Services</h2>
        </div>
      </motion.div>

      <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          {services.map((service, index) => (
            <ServiceRow
              key={service.title}
              service={service}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex((current) => (current === index ? -1 : index))
              }
            />
          ))}
        </div>

        <motion.div
          variants={fadeIn("up", "tween", 0.2, 0.8)}
          className="lg:col-span-5"
        >
          <p className="meta-label">Toolkit</p>
          <div className="mt-8 grid gap-8">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className="font-display text-[19px] text-espresso">
                  {category.title}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <TechSpheres />
    </>
  );
};

export default SectionWrapper(Services, "services");
