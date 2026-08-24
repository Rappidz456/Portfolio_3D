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

    expect(
      isEmailJsConfigured({
        serviceId: "s",
        templateId: "t",
        publicKey: "k",
      })
    ).toBe(true);
  });
});
