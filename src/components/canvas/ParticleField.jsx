import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

import CanvasShell from "./CanvasShell";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

/** Uniform-ish random points inside a sphere, without pulling in maath. */
function pointsInSphere(count, radius) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    // Rejection sampling keeps the distribution even through the volume.
    let x = 0;
    let y = 0;
    let z = 0;
    let lengthSq = 0;

    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      lengthSq = x * x + y * y + z * z;
    } while (lengthSq > 1 || lengthSq === 0);

    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }

  return positions;
}

const Cloud = ({ count, color, reduced }) => {
  const ref = useRef(null);
  const positions = useMemo(() => pointsInSphere(count, 1.4), [count]);

  useFrame((state, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.x -= delta / 18;
    ref.current.rotation.y -= delta / 26;
    // Drift with the pointer so the depth reads on mouse move.
    ref.current.position.x +=
      (state.pointer.x * 0.06 - ref.current.position.x) * 0.03;
    ref.current.position.y +=
      (state.pointer.y * 0.06 - ref.current.position.y) * 0.03;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={color}
          size={0.0035}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
    </group>
  );
};

/**
 * Fixed, full-page depth layer. Sits behind everything at z-index -1.
 */
const ParticleFieldCanvas = () => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const { isDark } = useThemeContext();

  const count = isSmall ? 900 : 2600;
  const color = isDark ? "#8A6EFF" : "#9C6455";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    >
      <CanvasShell
        className="h-full w-full"
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, 0, 1] }}
        dpr={isSmall ? [1, 1] : [1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        fallback={null}
      >
        <Cloud count={count} color={color} reduced={reduced} />
      </CanvasShell>
    </div>
  );
};

export default ParticleFieldCanvas;
