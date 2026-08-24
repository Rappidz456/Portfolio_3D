import { describe, expect, it } from "vitest";
import {
  experiences,
  navLinks,
  projects,
  services,
  technologies,
  testimonials,
} from "./index";

describe("portfolio constants", () => {
  it("defines navigation anchors", () => {
    expect(navLinks.map((link) => link.id)).toEqual([
      "about",
      "work",
      "contact",
    ]);
  });

  it("includes personalized services and tech", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(technologies.every((tech) => tech.name && tech.icon)).toBe(true);
  });

  it("keeps experience entries complete", () => {
    experiences.forEach((experience) => {
      expect(experience.title).toBeTruthy();
      expect(experience.company_name).toBeTruthy();
      expect(experience.points.length).toBeGreaterThan(0);
    });
  });

  it("keeps project entries complete", () => {
    projects.forEach((project) => {
      expect(project.name).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.image).toBeTruthy();
      expect(project.source_code_link).toMatch(/^https?:\/\//);
    });
  });

  it("keeps testimonials personalized", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    testimonials.forEach((item) => {
      expect(item.testimonial.toLowerCase()).not.toContain("rick");
      expect(item.name).toBeTruthy();
    });
  });
});
