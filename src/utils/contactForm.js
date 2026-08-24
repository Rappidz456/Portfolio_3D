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
 */
export function buildEmailTemplateParams(form, toName = "Muhammad Ali") {
  return {
    from_name: form.name.trim(),
    from_email: form.email.trim(),
    to_name: toName,
    message: form.message.trim(),
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
