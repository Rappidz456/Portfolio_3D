const AmbientBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-orb top-[-8%] left-[-6%] h-72 w-72 bg-accent/30" />
      <div className="ambient-orb top-[28%] right-[-8%] h-80 w-80 bg-sky-400/20 animation-delay-1000" />
      <div className="ambient-orb bottom-[8%] left-[30%] h-64 w-64 bg-warm/15" />
    </div>
  );
};

export default AmbientBackground;
