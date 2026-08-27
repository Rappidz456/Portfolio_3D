import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const ToastContext = createContext({ toast: () => {}, dismiss: () => {} });

const DEFAULT_DURATION = 5000;
const EXIT_MS = 350;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  /** Plays the exit animation before unmounting the node. */
  const dismiss = useCallback(
    (id) => {
      setToasts((current) =>
        current.map((item) =>
          item.id === id ? { ...item, state: "leaving" } : item
        )
      );
      const timer = setTimeout(() => remove(id), EXIT_MS);
      timers.current.set(`${id}-exit`, timer);
    },
    [remove]
  );

  const toast = useCallback(
    ({ type = "success", title, message, duration = DEFAULT_DURATION }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      setToasts((current) => [
        ...current,
        { id, type, title, message, state: "entering" },
      ]);

      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }

      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({ toast, dismiss, toasts }),
    [toast, dismiss, toasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
