import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";
import { getEmailJsConfig, isEmailJsConfigured } from "../config/emailjs";
import {
  INITIAL_CONTACT_FORM,
  buildEmailTemplateParams,
  isContactFormValid,
  updateContactField,
} from "../utils/contactForm";

/**
 * Encapsulates contact form state and EmailJS submission.
 */
export function useContactForm() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((current) => updateContactField(current, name, value));
  }, []);

  const resetForm = useCallback(() => {
    setForm(INITIAL_CONTACT_FORM);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isContactFormValid(form)) {
        window.alert("Please fill in your name, email, and message.");
        return;
      }

      const config = getEmailJsConfig();
      if (!isEmailJsConfigured(config)) {
        window.alert(
          "Email is not configured. Add VITE_EMAILJS_* values to your .env file."
        );
        return;
      }

      setLoading(true);

      try {
        await emailjs.send(
          config.serviceId,
          config.templateId,
          buildEmailTemplateParams(form),
          config.publicKey
        );
        window.alert("Thank you. I will get back to you as soon as possible.");
        resetForm();
      } catch (error) {
        console.error("EmailJS send failed:", error);
        window.alert("Ahh, something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [form, resetForm]
  );

  return {
    form,
    loading,
    handleChange,
    handleSubmit,
  };
}
