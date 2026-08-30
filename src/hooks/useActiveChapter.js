import { useEffect, useRef, useState } from "react";

/**
 * Tracks which of N chapter blocks is centred in the viewport.
 * @returns {{ active: number, itemRefs: React.MutableRefObject<(Element|null)[]> }}
 */
export function useActiveChapter(
  count,
  {
    rootMargin = "-40% 0px -40% 0px",
    threshold = [0, 0.25, 0.5, 1],
  } = {}
) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) return;
        const index = nodes.indexOf(visible[0].target);
        if (index >= 0) setActive(index);
      },
      { rootMargin, threshold }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [count, rootMargin, threshold]);

  return { active, itemRefs };
}
