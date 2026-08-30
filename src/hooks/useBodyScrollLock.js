import { useEffect } from "react";

/**
 * Locks document body scroll while `locked` is true (e.g. mobile menus).
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = locked ? "hidden" : previous || "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
