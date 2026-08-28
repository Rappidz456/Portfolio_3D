import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const TechFilterContext = createContext({
  selected: null,
  toggle: () => {},
  clear: () => {},
});

export const TechFilterProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);

  const toggle = useCallback((name) => {
    setSelected((current) => (current === name ? null : name));
  }, []);

  const clear = useCallback(() => setSelected(null), []);

  const value = useMemo(
    () => ({ selected, toggle, clear }),
    [selected, toggle, clear]
  );

  return (
    <TechFilterContext.Provider value={value}>
      {children}
    </TechFilterContext.Provider>
  );
};

/** Shared between the orbiting technologies and the project index. */
export const useTechFilter = () => useContext(TechFilterContext);
