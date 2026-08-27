import { describe, expect, it } from "vitest";
import { isEmailJsConfigured } from "./emailjs";

describe("emailjs config helpers", () => {
  it("requires all three credentials", () => {
    expect(
      isEmailJsConfigured({
        serviceId: "",
        templateId: "t",
        publicKey: "k",
      })
    ).toBe(false);
  });

  it("rejects placeholder credentials", () => {
    expect(
      isEmailJsConfigured({
        serviceId: "your_service_id",
        templateId: "template_abc",
        publicKey: "public_key",
      })
    ).toBe(false);
  });
});
