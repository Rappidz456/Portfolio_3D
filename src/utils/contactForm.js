import { site } from "../constants/site";

export const INITIAL_CONTACT_FORM = {
  name: "",
  email: "",
  message: "",
};

/**
 * Immutable field update for the contact form state.
 */
export function updateContactField(form, name, value) {
  return {
    ...form,
    [name]: value,
  };
}

/**
 * Builds the EmailJS template payload from form state.
 * Template variables should match these keys in your EmailJS dashboard:
 * {{from_name}}, {{from_email}}, {{to_name}}, {{message}}, {{reply_to}}
 */
export function buildEmailTemplateParams(form, toName = site.name) {
  const fromEmail = form.email.trim();

  return {
    from_name: form.name.trim(),
    from_email: fromEmail,
    to_name: toName,
    message: form.message.trim(),
    reply_to: fromEmail,
  };
}

/**
 * Basic required-field validation for the contact form.
 */
export function isContactFormValid(form) {
  return Boolean(
    form.name?.trim() && form.email?.trim() && form.message?.trim()
  );
}
