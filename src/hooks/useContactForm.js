import { useCallback, useState } from "react";
import emailjs from "@emailjs/browser";
import { getEmailJsConfig, isEmailJsConfigured } from "../config/emailjs";
import {
  INITIAL_CONTACT_FORM,
  buildEmailTemplateParams,
  isContactFormValid,
  updateContactField,
} from "../utils/contactForm";

function getSendErrorMessage(error) {
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  if (error.text) return error.text;
  if (error.message) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

/**
 * Encapsulates contact form state and EmailJS submission.
 */
export function useContactForm() {
  const [form, setForm] = useState(INITIAL_CONTACT_FORM);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((current) => updateContactField(current, name, value));
    setStatus(null);
  }, []);

  const resetForm = useCallback(() => {
    setForm(INITIAL_CONTACT_FORM);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isContactFormValid(form)) {
        setStatus({
          type: "error",
          message: "Please fill in your name, email, and message.",
        });
        return;
      }

      const config = getEmailJsConfig();
      if (!isEmailJsConfigured(config)) {
        setStatus({
          type: "error",
          message:
            "Email is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to .env, then restart npm run dev.",
        });
        return;
      }

      setLoading(true);
      setStatus(null);

      try {
        emailjs.init({ publicKey: config.publicKey });

        await emailjs.send(
          config.serviceId,
          config.templateId,
          buildEmailTemplateParams(form),
          { publicKey: config.publicKey }
        );

        setStatus({
          type: "success",
          message: "Thank you. I will get back to you as soon as possible.",
        });
        resetForm();
      } catch (error) {
        console.error("EmailJS send failed:", error);
        setStatus({
          type: "error",
          message: `Could not send message: ${getSendErrorMessage(error)}`,
        });
      } finally {
        setLoading(false);
      }
    },
    [form, resetForm]
  );

  return {
    form,
    loading,
    status,
    handleChange,
    handleSubmit,
  };
}
