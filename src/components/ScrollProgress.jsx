import { useScrollProgress } from "../hooks";

const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
