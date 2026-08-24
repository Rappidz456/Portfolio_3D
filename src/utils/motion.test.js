import { describe, expect, it } from "vitest";
import { fadeIn, slideIn, textVariant, zoomIn } from "./motion";

describe("motion variants", () => {
  it("builds a textVariant with delay", () => {
    const variant = textVariant(0.5);
    expect(variant.hidden.opacity).toBe(0);
    expect(variant.show.transition.delay).toBe(0.5);
  });

  it("offsets fadeIn based on direction", () => {
    expect(fadeIn("left", "spring", 0, 1).hidden.x).toBe(100);
    expect(fadeIn("right", "spring", 0, 1).hidden.x).toBe(-100);
    expect(fadeIn("up", "spring", 0, 1).hidden.y).toBe(100);
  });

  it("builds slideIn and zoomIn transitions", () => {
    expect(slideIn("left", "tween", 0.2, 1).hidden.x).toBe("-100%");
    expect(zoomIn(0.1, 0.5).show.scale).toBe(1);
  });
});
