import { AlertCircle, Check, X } from "lucide-react";

import { useToast } from "../context/ToastProvider";

/**
 * Fixed toast stack. Announces politely so screen readers pick up the
 * submit result without stealing focus from the form.
 */
const Toaster = () => {
  const { toasts, dismiss } = useToast();

  if (!toasts?.length) return null;

  return (
    <div className="toast-stack" role="region" aria-label="Notifications">
      {toasts.map((item) => (
        <div
          key={item.id}
          className="toast"
          data-type={item.type}
          data-state={item.state}
          role="status"
          aria-live="polite"
        >
          <span className="toast__icon" aria-hidden="true">
            {item.type === "error" ? (
              <AlertCircle className="h-[18px] w-[18px]" strokeWidth={1.75} />
            ) : (
              <Check className="h-[18px] w-[18px]" strokeWidth={2} />
            )}
          </span>

          <div className="min-w-0">
            <p className="toast__title">{item.title}</p>
            {item.message ? (
              <p className="toast__message">{item.message}</p>
            ) : null}
          </div>

          <button
            type="button"
            className="toast__close"
            onClick={() => dismiss(item.id)}
            aria-label="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" strokeWidth={1.75} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toaster;
