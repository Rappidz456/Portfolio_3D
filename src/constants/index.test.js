import { describe, expect, it } from "vitest";
import {
  experiences,
  navLinks,
  projects,
  services,
  skillCategories,
  technologies,
  testimonials,
} from "./index";

describe("portfolio constants", () => {
  it("defines navigation anchors", () => {
    expect(navLinks.map((link) => link.id)).toEqual([
      "about",
      "work",
      "projects",
      "contact",
    ]);
  });

  it("includes personalized services and tech", () => {
    expect(services.length).toBeGreaterThan(0);
    expect(technologies.length).toBeGreaterThanOrEqual(16);
    expect(
      technologies.every((tech) => tech.name && tech.label && tech.color)
    ).toBe(true);
  });

  it("includes full resume skill categories", () => {
    expect(skillCategories.length).toBeGreaterThanOrEqual(6);
    const allSkills = skillCategories.flatMap((group) => group.skills);
    expect(allSkills).toEqual(
      expect.arrayContaining([
        "JavaScript",
        "TypeScript",
        "Python",
        "SQL",
        "React Native",
        "Next.js",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "OpenAI API",
        "Anthropic",
      ])
    );
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
      expect(item.company.toLowerCase()).not.toContain("atrule");
      expect(item.name).toBeTruthy();
    });
  });

  it("features Tasky and AI Surveillance without removed projects", () => {
    const names = projects.map((project) => project.name.toLowerCase());
    expect(names).toContain("tasky");
    expect(names).toContain("ai surveillance system");
    expect(names).not.toContain("snackdash_sahlah");
    expect(names).not.toContain("uber_clone");
    expect(names).not.toContain("restaurant_app");
  });

  it("excludes Atrule Technologies from experience", () => {
    const companies = experiences.map((item) =>
      item.company_name.toLowerCase()
    );
    expect(companies).not.toContain("atrule technologies");
    expect(companies).toContain("wisdom it solutions");
  });
});
