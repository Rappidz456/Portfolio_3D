import { lazy, Suspense, useMemo, useRef } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import {
  projects,
  services,
  skillCategories,
  technologies,
} from "../constants";
import { useInView } from "../hooks/useInView";
import { useActiveChapter } from "../hooks/useActiveChapter";
import { useTechFilter } from "../context/TechFilterProvider";
import { fadeIn } from "../utils/motion";
import { padIndex } from "../utils/format";
import SectionHeader from "./ui/SectionHeader";
import TagList from "./ui/TagList";
import LazyMount from "./ui/LazyMount";

const TechSpheresCanvas = lazy(() => import("./canvas/TechSpheres"));

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
    <div className="mt-24 border-t border-[color:var(--hairline)] pt-14 sm:mt-32 sm:pt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="meta-label">The stack</p>
        <p className="text-[13px] text-grey">
          Select a technology to filter the work
        </p>
      </div>

      <div
        ref={ref}
        className="relative mt-8 h-[48rem] w-full overflow-visible sm:h-[58rem] lg:h-[70rem]"
      >
        <LazyMount when={isVisible}>
          <Suspense fallback={null}>
            <TechSpheresCanvas
              technologies={technologies}
              selected={selected}
              filterable={filterable}
              onSelect={handleSelect}
              className="absolute inset-0 h-full w-full"
            />
          </Suspense>
        </LazyMount>
      </div>
    </div>
  );
};

const ServiceBlock = ({ service, index, innerRef, isActive }) => (
  <motion.article
    ref={innerRef}
    variants={fadeIn("up", "tween", 0.05, 0.65)}
    className="border-t border-[color:var(--hairline)] py-10 first:border-t-0 sm:py-14"
  >
    <div className="flex items-baseline gap-4">
      <span className="index-num">{padIndex(index)}</span>
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
            <SectionHeader eyebrow="What I do" title="Services" />

            <div className="mt-8 flex items-center gap-3">
              <span className="chapter-count">
                {padIndex(active)} &nbsp;/&nbsp;{" "}
                {padIndex(services.length - 1)}
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
                  <span className="chapter-step__num">{padIndex(index)}</span>
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
              <TagList tags={category.skills} className="mt-3" />
            </div>
          ))}
        </div>
      </motion.div>

      <TechSpheres />
    </>
  );
};

export default SectionWrapper(Services, "services");
