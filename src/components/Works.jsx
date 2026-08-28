import { useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useTechFilter } from "../context/TechFilterProvider";
import { fadeIn, textVariant } from "../utils/motion";

const SPRING = { stiffness: 220, damping: 28, mass: 0.6 };

/**
 * Preview thumbnail that trails the cursor across the project index.
 * Desktop only — touch devices get the image inline in each row instead.
 */
const ProjectPeek = ({ project, x, y }) => (
  <motion.div
    className="project-peek"
    style={{ x, y }}
    initial={{ opacity: 0, scale: 0.94 }}
    animate={{ opacity: project ? 1 : 0, scale: project ? 1 : 0.94 }}
    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    aria-hidden="true"
  >
    {projects.map((item) => (
      <img
        key={item.name}
        src={item.image}
        alt=""
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          item.imageFit === "contain"
            ? "bg-paper-200 object-contain p-6"
            : "object-cover"
        } ${project?.name === item.name ? "opacity-100" : "opacity-0"}`}
      />
    ))}
  </motion.div>
);

const ProjectRow = ({
  project,
  index,
  isDesktop,
  dimmed,
  onEnter,
  onLeave,
}) => (
  <motion.a
    variants={fadeIn("up", "tween", index * 0.06, 0.7)}
    href={project.source_code_link}
    target="_blank"
    rel="noopener noreferrer"
    className="project-row group transition-opacity duration-500 ease-editorial"
    style={{ opacity: dimmed ? 0.3 : 1 }}
    onMouseEnter={() => onEnter(project)}
    onMouseLeave={onLeave}
  >
    <div className="relative flex flex-col gap-5 px-1 py-8 sm:py-10 md:flex-row md:items-center md:gap-8">
      <span className="index-num md:w-14 md:shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {!isDesktop ? (
        <div className="h-52 w-full overflow-hidden rounded-sm bg-paper-200">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className={`h-full w-full ${
              project.imageFit === "contain"
                ? "object-contain p-6"
                : "object-cover"
            }`}
          />
        </div>
      ) : null}

      <div className="project-row__title min-w-0 flex-1">
        <h3 className="display-md text-ink">{project.name}</h3>
        <p className="mt-3 max-w-xl text-[14px] font-light leading-relaxed text-grey">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 md:w-auto md:shrink-0 md:flex-col md:items-end md:gap-5">
        <div className="flex flex-wrap gap-2 md:justify-end">
          {project.tags.map((tag) => (
            <span key={`${project.name}-${tag.name}`} className="tag-pill">
              {tag.name}
            </span>
          ))}
        </div>
        <span className="visit-btn shrink-0" aria-hidden="true">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  </motion.a>
);

const Works = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [hovered, setHovered] = useState(null);
  const { selected, clear } = useTechFilter();

  const matches = (project) =>
    !selected || (project.stack ?? []).includes(selected);
  const matchCount = projects.filter(matches).length;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, SPRING);
  const y = useSpring(mouseY, SPRING);

  const handleMouseMove = useCallback(
    (event) => {
      if (!isDesktop) return;
      // Offset so the preview sits just past the cursor.
      mouseX.set(event.clientX + 28);
      mouseY.set(event.clientY - 104);
    },
    [isDesktop, mouseX, mouseY]
  );

  const handleEnter = useCallback(
    (project) => {
      if (isDesktop) setHovered(project);
    },
    [isDesktop]
  );

  const handleLeave = useCallback(() => setHovered(null), []);

  return (
    <>
      <motion.div
        variants={textVariant()}
        className="flex flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className={styles.sectionSubText}>Selected work</p>
          <h2 className={`${styles.sectionHeadText} mt-6`}>Projects</h2>
        </div>
        <p className="max-w-xs text-[14px] font-light leading-relaxed text-grey">
          A few products I&apos;ve designed, built, and shipped — across web,
          mobile, and AI systems.
        </p>
      </motion.div>

      {selected ? (
        <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-[color:var(--hairline)] py-4">
          <span className="meta-label">Filtered by</span>
          <span className="tag-pill">{selected}</span>
          <span className="chapter-count">
            {String(matchCount).padStart(2, "0")} of{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={clear}
            className="link-underline ml-auto text-[13px] font-light text-grey transition-colors duration-300 hover:text-ink"
          >
            Clear filter
          </button>
        </div>
      ) : null}

      {selected && matchCount === 0 ? (
        <p className="mt-8 text-[14px] font-light text-grey">
          Nothing tagged with {selected} in the projects above yet.
        </p>
      ) : null}

      <div className="mt-14" onMouseMove={handleMouseMove}>
        {projects.map((project, index) => (
          <ProjectRow
            key={project.name}
            project={project}
            index={index}
            isDesktop={isDesktop}
            dimmed={!matches(project)}
            onEnter={handleEnter}
            onLeave={handleLeave}
          />
        ))}
      </div>

      {isDesktop ? <ProjectPeek project={hovered} x={x} y={y} /> : null}
    </>
  );
};

export default SectionWrapper(Works, "projects");
