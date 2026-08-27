import { lazy, Suspense } from "react";

const HeroSceneCanvas = lazy(() => import("./canvas/HeroScene"));

/** Headline broken into lines so each can mask its own rise-in. */
const HEADLINE = [
  [{ text: "Build" }, { text: "bold," }],
  [{ text: "build" }, { text: "smart", accent: true }],
];

const STEP = 0.075;
const BASE_DELAY = 0.25;

const RevealHeadline = () => {
  let wordIndex = -1;

  return (
    <h1 className="display-xl text-ink">
      {HEADLINE.map((line, lineIndex) => (
        <span className="reveal-line" key={`line-${lineIndex}`}>
          {line.map((word, index) => {
            wordIndex += 1;
            return (
              <span
                key={`${word.text}-${index}`}
                className={`reveal-word ${word.accent ? "accent-italic" : ""}`}
                style={{ animationDelay: `${BASE_DELAY + wordIndex * STEP}s` }}
              >
                {word.text}
                {index < line.length - 1 ? " " : ""}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Colour bloom behind the 3D rig */}
      <div
        className="hero-glow right-[2%] top-[8%] h-[26rem] w-[26rem] bg-accent/50 sm:right-[6%]"
        aria-hidden="true"
      />
      <div
        className="hero-glow bottom-[6%] right-[26%] h-[20rem] w-[20rem] bg-accent2/45"
        style={{ animationDelay: "1.8s" }}
        aria-hidden="true"
      />

      {/* Animated 3D rig — drag-free, follows the cursor */}
      <div className="absolute inset-y-0 right-0 z-0 w-full sm:w-[64%] lg:w-[56%]">
        <Suspense fallback={null}>
          <HeroSceneCanvas className="h-full w-full" />
        </Suspense>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[96rem] flex-col justify-between px-6 pb-10 pt-32 sm:px-10 sm:pb-14 sm:pt-40 lg:px-16">
        <div className="flex-1">
          <p
            className="section-eyebrow fade-up-late"
            style={{ animationDelay: "0.1s" }}
          >
            Full Stack Software Engineer
          </p>

          <div className="mt-8 sm:mt-10">
            <RevealHeadline />
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
            <p
              className="lede fade-up-late md:col-span-6 lg:col-span-5"
              style={{ animationDelay: "0.75s" }}
            >
              High-quality full-stack applications for every product — from
              first idea through to launch.
            </p>

            <div
              className="fade-up-late flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end lg:col-span-7"
              style={{ animationDelay: "0.95s" }}
            >
              <a href="#projects" className="site-btn">
                Selected work
              </a>
              <a href="#contact" className="site-btn site-btn-ghost">
                Start a project
              </a>
            </div>
          </div>
        </div>

        <div
          className="fade-up-late mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-[color:var(--hairline)] pt-6"
          style={{ animationDelay: "1.15s" }}
        >
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[13px] font-light text-grey">
                Available for work
              </span>
            </span>

            <span className="text-[13px] font-light text-grey">
              4+ years shipping production software
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="meta-label">Scroll</span>
            <span className="scroll-cue" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
