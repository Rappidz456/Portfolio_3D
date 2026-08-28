import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import {
  projects,
  services,
  skillCategories,
  technologies,
} from "../constants";
import { useInView } from "../hooks/useInView";
import { useTechFilter } from "../context/TechFilterProvider";
import { fadeIn, textVariant } from "../utils/motion";

const TechSpheresCanvas = lazy(() => import("./canvas/TechSpheres"));

const pad = (value) => String(value + 1).padStart(2, "0");

/** Floating, spinning 3D planets — one canvas, mounted only when in view. */
const TechSpheres = () => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { rootMargin: "200px" });
  const { selected, toggle } = useTechFilter();

  // Only technologies actually credited on a project can be filtered by;
  // the rest stay decorative so no click is a dead end.
  const filterable = useMemo(
    () => new Set(projects.flatMap((project) => project.stack ?? [])),
    []
  );

  const handleSelect = (name) => {
    toggle(name);
    // Jump to the work it filters, so the click has a visible consequence.
    if (selected !== name) {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={ref} className="mt-16 h-[30rem] w-full sm:h-[34rem] lg:h-[38rem]">
      {isVisible ? (
        <Suspense fallback={null}>
          <TechSpheresCanvas
            technologies={technologies}
            selected={selected}
            filterable={filterable}
            onSelect={handleSelect}
            className="h-full w-full"
          />
        </Suspense>
      ) : null}
    </div>
  );
};

/**
 * Tracks which service block is currently centred in the viewport.
 * Drives the sticky rail without re-rendering on every scroll frame.
 */
function useActiveChapter(count) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the middle of the viewport.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;
        const index = nodes.indexOf(visible[0].target);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [count]);

  return { active, itemRefs };
}

const ServiceBlock = ({ service, index, innerRef, isActive }) => (
  <motion.article
    ref={innerRef}
    variants={fadeIn("up", "tween", 0.05, 0.65)}
    className="border-t border-[color:var(--hairline)] py-10 first:border-t-0 sm:py-14"
  >
    <div className="flex items-baseline gap-4">
      <span className="index-num">{pad(index)}</span>
      <span
        className={`h-px flex-1 transition-colors duration-700 ease-editorial ${
          isActive ? "bg-accent" : "bg-[color:var(--hairline)]"
        }`}
      />
    </div>

    <h3 className="display-md mt-5 text-ink">{service.title}</h3>

    <p className="section-copy mt-4 max-w-xl">{service.description}</p>

    <p className="deliverables mt-6">
      {service.deliverables?.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  </motion.article>
);

const Services = () => {
  const { active, itemRefs } = useActiveChapter(services.length);

  return (
    <>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Sticky rail — pins while the service blocks scroll past */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.div variants={textVariant()}>
              <p className={styles.sectionSubText}>What I do</p>
              <h2 className={`${styles.sectionHeadText} mt-6`}>Services</h2>
            </motion.div>

            <div className="mt-8 flex items-center gap-3">
              <span className="chapter-count">
                {pad(active)} &nbsp;/&nbsp; {pad(services.length - 1)}
              </span>
            </div>

            <nav className="chapter-rail mt-4" aria-label="Services">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  className="chapter-step"
                  data-active={index === active}
                  aria-current={index === active}
                  onClick={() =>
                    itemRefs.current[index]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  }
                >
                  <span className="chapter-step__num">{pad(index)}</span>
                  <span className="chapter-step__label">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-7">
          {services.map((service, index) => (
            <ServiceBlock
              key={service.title}
              service={service}
              index={index}
              isActive={index === active}
              innerRef={(node) => {
                itemRefs.current[index] = node;
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        variants={fadeIn("up", "tween", 0.2, 0.8)}
        className="mt-20 border-t border-[color:var(--hairline)] pt-12"
      >
        <p className="meta-label">Toolkit</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-display text-[19px] text-clay">
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

      <TechSpheres />
    </>
  );
};

export default SectionWrapper(Services, "services");
