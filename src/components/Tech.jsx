import { useRef } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { useInView } from "../hooks/useInView";

const Tech = () => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { rootMargin: "150px" });

  return (
    <div
      ref={sectionRef}
      className="flex flex-row flex-wrap justify-center gap-10"
    >
      {technologies.map((technology) => (
        <div className="w-28 h-28" key={technology.name}>
          {isVisible ? (
            <BallCanvas icon={technology.icon} />
          ) : (
            <div className="w-full h-full rounded-full bg-tertiary/40" />
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
