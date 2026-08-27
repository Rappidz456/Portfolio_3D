import { describe, expect, it } from "vitest";
import {
  INITIAL_CONTACT_FORM,
  buildEmailTemplateParams,
  isContactFormValid,
  updateContactField,
} from "./contactForm";

describe("contactForm utilities", () => {
  it("exposes an empty initial form", () => {
    expect(INITIAL_CONTACT_FORM).toEqual({
      name: "",
      email: "",
      message: "",
    });
  });

  it("updates a single field immutably", () => {
    const next = updateContactField(INITIAL_CONTACT_FORM, "name", "Ali");
    expect(next).toEqual({ name: "Ali", email: "", message: "" });
    expect(INITIAL_CONTACT_FORM.name).toBe("");
  });

  it("builds EmailJS template params", () => {
    const params = buildEmailTemplateParams(
      {
        name: "  Ali  ",
        email: " ali@example.com ",
        message: " Hello ",
      },
      "Muhammad Ali"
    );

    expect(params).toEqual({
      from_name: "Ali",
      from_email: "ali@example.com",
      to_name: "Muhammad Ali",
      message: "Hello",
      reply_to: "ali@example.com",
    });
  });

  it("validates required fields", () => {
    expect(isContactFormValid(INITIAL_CONTACT_FORM)).toBe(false);
    expect(
      isContactFormValid({
        name: "Ali",
        email: "ali@example.com",
        message: "Hi",
      })
    ).toBe(true);
  });
});
