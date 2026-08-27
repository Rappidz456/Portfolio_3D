/**
 * Reads EmailJS configuration from Vite environment variables.
 * Never hardcode secrets in source — use `.env` locally.
 */
export function getEmailJsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
  };
}

/**
 * Returns true when all EmailJS env vars are present and not placeholders.
 */
export function isEmailJsConfigured(config = getEmailJsConfig()) {
  const values = [config.serviceId, config.templateId, config.publicKey];
  if (values.some((value) => !value)) return false;

  const placeholders = [
    "your_service_id",
    "your_template_id",
    "your_public_key",
  ];
  return !values.some((value) =>
    placeholders.includes(String(value).trim().toLowerCase())
  );
}
