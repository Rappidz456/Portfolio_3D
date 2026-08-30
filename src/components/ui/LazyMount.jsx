/**
 * Tiny Suspense-friendly gate for lazy canvases / deferred mounts.
 */
const LazyMount = ({ when, fallback = null, children }) =>
  when ? children : fallback;

export default LazyMount;
