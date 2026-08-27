import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

import CanvasShell from "./CanvasShell";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

const Globe = ({ isDark, reduced }) => {
  const wireRef = useRef(null);
  const shellRef = useRef(null);
  const ringRef = useRef(null);

  const accent = isDark ? "#FF6A3D" : "#E2542C";
  const accent2 = isDark ? "#8A6EFF" : "#6C4BFF";

  useFrame((state, delta) => {
    if (reduced) return;
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.18;
    if (shellRef.current) shellRef.current.rotation.y += delta * 0.12;
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x =
        0.9 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <Float
      speed={reduced ? 0 : 1.2}
      rotationIntensity={reduced ? 0 : 0.25}
      floatIntensity={reduced ? 0 : 0.7}
    >
      {/* Solid inner shell so the wireframe reads against the page */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.28, 48, 48]} />
        <meshStandardMaterial
          color={isDark ? "#151317" : "#FFFFFF"}
          transparent
          opacity={isDark ? 0.35 : 0.55}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      <mesh ref={wireRef}>
        <sphereGeometry args={[1.35, 26, 26]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[0.9, 0, 0]}>
        <torusGeometry args={[1.85, 0.014, 12, 128]} />
        <meshBasicMaterial color={accent2} transparent opacity={0.85} />
      </mesh>
    </Float>
  );
};

const GlobeSceneCanvas = ({ className }) => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const { isDark } = useThemeContext();

  return (
    <CanvasShell
      className={className}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={isSmall ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      fallback={null}
    >
      <ambientLight intensity={isDark ? 0.5 : 1} />
      <pointLight
        position={[3, 3, 4]}
        intensity={isDark ? 22 : 12}
        color={isDark ? "#FF6A3D" : "#E2542C"}
        distance={14}
      />
      <pointLight
        position={[-3, -2, 2]}
        intensity={isDark ? 16 : 9}
        color={isDark ? "#8A6EFF" : "#6C4BFF"}
        distance={14}
      />
      <Globe isDark={isDark} reduced={reduced} />
    </CanvasShell>
  );
};

export default GlobeSceneCanvas;
