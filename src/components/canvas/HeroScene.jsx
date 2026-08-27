import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";

import CanvasShell from "./CanvasShell";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

const PALETTE = {
  dark: {
    core: "#FF6A3D",
    ring: "#8A6EFF",
    shard: "#FFB199",
    keyLight: "#FFFFFF",
    rimLight: "#8A6EFF",
    fillLight: "#FF6A3D",
  },
  light: {
    core: "#E2542C",
    ring: "#6C4BFF",
    shard: "#9C6455",
    keyLight: "#FFFFFF",
    rimLight: "#6C4BFF",
    fillLight: "#FFB199",
  },
};

/** Small chunks that orbit the core on their own radius and speed. */
const Shards = ({ color, reduced }) => {
  const groupRef = useRef(null);

  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => ({
        radius: 2.1 + (index % 3) * 0.45,
        speed: 0.16 + index * 0.035,
        scale: 0.07 + (index % 4) * 0.035,
        tilt: (index / 7) * Math.PI,
        offset: (index / 7) * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, index) => {
      const shard = shards[index];
      const angle = time * shard.speed + shard.offset;
      child.position.set(
        Math.cos(angle) * shard.radius,
        Math.sin(angle * 0.8) * shard.radius * 0.42,
        Math.sin(angle) * shard.radius * 0.6
      );
      child.rotation.x = angle * 0.8;
      child.rotation.y = angle * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((shard, index) => (
        <mesh key={index} scale={shard.scale} rotation={[shard.tilt, 0, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.4}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
};

const Scene = ({ palette, reduced }) => {
  const coreRef = useRef(null);
  const ringA = useRef(null);
  const ringB = useRef(null);
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    const { x, y } = state.pointer;

    // Whole rig leans toward the cursor.
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (x * 0.4 - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x +=
        (-y * 0.28 - groupRef.current.rotation.x) * 0.04;
    }

    if (reduced) return;

    if (coreRef.current) coreRef.current.rotation.y += delta * 0.22;
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.28;
      ringA.current.rotation.x += delta * 0.1;
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.19;
      ringB.current.rotation.y += delta * 0.13;
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.8}
      >
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.45, 32]} />
          <MeshDistortMaterial
            color={palette.core}
            distort={reduced ? 0.12 : 0.42}
            speed={reduced ? 0 : 1.8}
            roughness={0.22}
            metalness={0.55}
            emissive={palette.core}
            emissiveIntensity={0.18}
          />
        </mesh>
      </Float>

      <mesh ref={ringA} rotation={[1.1, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.035, 16, 140]} />
        <MeshWobbleMaterial
          color={palette.ring}
          factor={reduced ? 0 : 0.35}
          speed={reduced ? 0 : 1.1}
          roughness={0.3}
          metalness={0.6}
          emissive={palette.ring}
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh ref={ringB} rotation={[0.4, 1.1, 0.6]}>
        <torusGeometry args={[2.9, 0.016, 12, 140]} />
        <meshStandardMaterial
          color={palette.shard}
          roughness={0.4}
          metalness={0.3}
          emissive={palette.shard}
          emissiveIntensity={0.2}
        />
      </mesh>

      <Shards color={palette.shard} reduced={reduced} />
    </group>
  );
};

const HeroSceneCanvas = ({ className }) => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const { isDark } = useThemeContext();
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  return (
    <CanvasShell
      className={className}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 6.4], fov: 42, near: 0.1, far: 100 }}
      dpr={isSmall ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      fallback={null}
    >
      <ambientLight intensity={isDark ? 0.45 : 0.9} />
      <directionalLight
        position={[4, 5, 5]}
        intensity={isDark ? 2.2 : 2.8}
        color={palette.keyLight}
      />
      <pointLight
        position={[-4, -1, 2]}
        intensity={isDark ? 26 : 14}
        color={palette.rimLight}
        distance={14}
      />
      <pointLight
        position={[3, -3, -2]}
        intensity={isDark ? 18 : 10}
        color={palette.fillLight}
        distance={14}
      />
      <Scene palette={palette} reduced={reduced} />
    </CanvasShell>
  );
};

export default HeroSceneCanvas;
