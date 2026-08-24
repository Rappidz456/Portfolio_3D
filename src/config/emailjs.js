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
 * Returns true when all EmailJS env vars are present.
 */
export function isEmailJsConfigured(config = getEmailJsConfig()) {
  return Boolean(config.serviceId && config.templateId && config.publicKey);
}
