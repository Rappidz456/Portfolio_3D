import { technologies } from "../constants";

/**
 * Edge-to-edge scrolling stack band.
 * Rendered outside the page container in App so it spans the full viewport
 * width at every breakpoint, rather than stopping at the content gutter.
 */
const TechMarquee = () => {
  // Duplicated so the -50% translate loops without a visible seam.
  const items = technologies.concat(technologies);

  return (
    <div
      className="marquee-track w-full overflow-hidden border-y border-[color:var(--hairline)] py-5 sm:py-7"
      aria-hidden="true"
    >
      <div className="marquee">
        {items.map((tech, index) => (
          <span key={`${tech.name}-${index}`} className="marquee-item">
            <span className="marquee-word">{tech.name}</span>
            <span
              className="marquee-dot"
              style={{ backgroundColor: tech.color }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
