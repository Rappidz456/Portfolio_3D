import { useEffect, useState } from "react";

/**
 * Observes an element and reports when it enters the viewport.
 * Useful for deferring heavy WebGL canvases until needed.
 */
export function useInView(ref, { rootMargin = "200px", once = true } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
