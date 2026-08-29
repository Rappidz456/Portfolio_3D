import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { AdditiveBlending, BackSide, MathUtils } from "three";

import CanvasShell from "./CanvasShell";
import { createCloudTexture, createWorldTexture } from "./planetTexture";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

const WORLD_SEED = "muhammad-ali-portfolio";
const PLANET_RADIUS = 1.62;

/**
 * Where the world sits as each section comes up.
 *
 * `xFrac` is a fraction of the visible viewport width rather than a world
 * unit, so the globe holds the same relative position on a phone and on an
 * ultrawide. It alternates sides so the world crosses the page as you read,
 * and drifts further back (larger negative z) through the middle sections so
 * it never competes with body copy.
 */
const WAYPOINTS = [
  { id: "hero", xFrac: 0.26, y: 0.0, z: 0.0, scale: 1.0 },
  { id: "about", xFrac: -0.3, y: 0.25, z: -1.6, scale: 0.6 },
  { id: "projects", xFrac: 0.33, y: -0.3, z: -2.6, scale: 0.48 },
  // Services owns the orbit system, so the travelling world retreats to the
  // far corner here instead of colliding with the technology planets.
  { id: "services", xFrac: -0.44, y: 0.62, z: -6.5, scale: 0.24 },
  { id: "work", xFrac: 0.3, y: 0.0, z: -2.2, scale: 0.52 },
  { id: "testimonials", xFrac: -0.32, y: 0.2, z: -2.6, scale: 0.5 },
  { id: "contact", xFrac: 0.22, y: -0.15, z: -0.6, scale: 0.85 },
];

const PALETTE = {
  dark: {
    ocean: "#1E1836",
    land: "#B85A34",
    coast: "#E8894F",
    ice: "#F0E4DA",
    atmosphere: "#8A6EFF",
    glow: "#FF6A3D",
    orbit: "#8A6EFF",
    moon: "#CBBFC7",
    keyLight: "#FFFFFF",
  },
  light: {
    ocean: "#3B2F63",
    land: "#B4552F",
    coast: "#E0834A",
    ice: "#FFF6EE",
    atmosphere: "#6C4BFF",
    glow: "#E2542C",
    orbit: "#6C4BFF",
    moon: "#8C7F86",
    keyLight: "#FFFFFF",
  },
};

/**
 * Measures the scroll offset at which each waypoint's section is centred.
 * Re-measured on resize because section heights are content-driven.
 */
function useSectionOffsets() {
  const offsetsRef = useRef([]);

  useEffect(() => {
    const measure = () => {
      const measured = WAYPOINTS.map((point) => {
        if (point.id === "hero") return 0;

        const anchor = document.getElementById(point.id);
        if (!anchor) return null;

        const section = anchor.closest("section") ?? anchor;
        const rect = section.getBoundingClientRect();
        return (
          rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2
        );
      });

      // Force a strictly increasing list: a missing anchor or an out-of-order
      // measurement would otherwise make the segment search divide by zero.
      let previous = 0;
      offsetsRef.current = measured.map((value, index) => {
        if (index === 0) return 0;
        const resolved =
          value == null ? previous + 1 : Math.max(value, previous + 1);
        previous = resolved;
        return resolved;
      });
    };

    measure();

    window.addEventListener("resize", measure);
    // Fonts and lazy images shift layout after first paint.
    const settle = setTimeout(measure, 1200);

    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(settle);
    };
  }, []);

  return offsetsRef;
}

function useScrollPosition() {
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrollRef;
}

const Satellites = ({ color, reduced }) => {
  const groupRef = useRef(null);

  const bodies = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => ({
        radius: 2.35 + (index % 3) * 0.38,
        speed: 0.18 + index * 0.045,
        scale: 0.045 + (index % 3) * 0.022,
        offset: (index / 5) * Math.PI * 2,
        lift: (index % 2 === 0 ? 1 : -1) * (0.25 + index * 0.06),
      })),
    []
  );

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, index) => {
      const body = bodies[index];
      const angle = time * body.speed + body.offset;
      child.position.set(
        Math.cos(angle) * body.radius,
        Math.sin(angle) * body.radius * body.lift,
        Math.sin(angle) * body.radius * 0.55
      );
      child.rotation.y = angle;
    });
  });

  return (
    <group ref={groupRef}>
      {bodies.map((body, index) => (
        <mesh key={index} scale={body.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={color}
            roughness={0.55}
            metalness={0.25}
            emissive={color}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
    </group>
  );
};

const World = ({ palette, reduced, isDark, sizeFactor }) => {
  const rigRef = useRef(null);
  const tiltRef = useRef(null);
  const globeRef = useRef(null);
  const cloudRef = useRef(null);
  const moonOrbitRef = useRef(null);

  const viewport = useThree((state) => state.viewport);
  const offsetsRef = useSectionOffsets();
  const scrollRef = useScrollPosition();

  const surface = useMemo(
    () =>
      createWorldTexture({
        ocean: palette.ocean,
        land: palette.land,
        coast: palette.coast,
        ice: palette.ice,
        seed: WORLD_SEED,
      }),
    [palette]
  );

  const clouds = useMemo(() => createCloudTexture(WORLD_SEED), []);

  // Canvas textures aren't loader-cached, so release them explicitly.
  useEffect(() => () => surface.dispose(), [surface]);
  useEffect(() => () => clouds.dispose(), [clouds]);

  useFrame((state, delta) => {
    const rig = rigRef.current;
    const offsets = offsetsRef.current;

    if (rig && offsets.length === WAYPOINTS.length) {
      const scrollY = scrollRef.current;

      // Find the segment the page is currently inside.
      let index = 0;
      while (index < offsets.length - 2 && scrollY >= offsets[index + 1]) {
        index += 1;
      }

      const from = WAYPOINTS[index];
      const to = WAYPOINTS[index + 1];
      const span = Math.max(1, offsets[index + 1] - offsets[index]);
      const raw = MathUtils.clamp((scrollY - offsets[index]) / span, 0, 1);
      const t = raw * raw * (3 - 2 * raw); // smoothstep

      const targetX = MathUtils.lerp(from.xFrac, to.xFrac, t) * viewport.width;
      const targetY = MathUtils.lerp(from.y, to.y, t);
      const targetZ = MathUtils.lerp(from.z, to.z, t);
      const targetScale = MathUtils.lerp(from.scale, to.scale, t) * sizeFactor;

      // Damping keeps the travel smooth even with coarse scroll events.
      rig.position.x = MathUtils.damp(rig.position.x, targetX, 4, delta);
      rig.position.y = MathUtils.damp(rig.position.y, targetY, 4, delta);
      rig.position.z = MathUtils.damp(rig.position.z, targetZ, 4, delta);

      const nextScale = MathUtils.damp(rig.scale.x, targetScale, 4, delta);
      rig.scale.setScalar(nextScale);
    }

    const { x, y } = state.pointer;
    if (tiltRef.current) {
      tiltRef.current.rotation.y +=
        (x * 0.3 - tiltRef.current.rotation.y) * 0.04;
      tiltRef.current.rotation.x +=
        (-y * 0.18 + 0.16 - tiltRef.current.rotation.x) * 0.04;
    }

    if (reduced) return;

    // Clouds drift slightly faster than the surface below them.
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.075;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.105;
    if (moonOrbitRef.current) moonOrbitRef.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={rigRef} position={[viewport.width * 0.26, 0, 0]}>
      <Float
        speed={reduced ? 0 : 1.1}
        rotationIntensity={reduced ? 0 : 0.12}
        floatIntensity={reduced ? 0 : 0.5}
      >
        <group ref={tiltRef}>
          <group rotation={[0, 0, 0.41]}>
            <mesh ref={globeRef}>
              <sphereGeometry args={[PLANET_RADIUS, 96, 96]} />
              <meshStandardMaterial
                map={surface}
                roughness={0.82}
                metalness={0.06}
                emissive={palette.land}
                emissiveIntensity={isDark ? 0.08 : 0.02}
              />
            </mesh>

            <mesh ref={cloudRef}>
              <sphereGeometry args={[PLANET_RADIUS * 1.017, 64, 64]} />
              <meshStandardMaterial
                map={clouds}
                transparent
                opacity={isDark ? 0.42 : 0.55}
                roughness={1}
                metalness={0}
                depthWrite={false}
              />
            </mesh>

            {/* Two backside shells: a tight rim and a wider bloom */}
            <mesh scale={1.045}>
              <sphereGeometry args={[PLANET_RADIUS, 48, 48]} />
              <meshBasicMaterial
                color={palette.atmosphere}
                transparent
                opacity={isDark ? 0.3 : 0.2}
                side={BackSide}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
            <mesh scale={1.16}>
              <sphereGeometry args={[PLANET_RADIUS, 48, 48]} />
              <meshBasicMaterial
                color={palette.glow}
                transparent
                opacity={isDark ? 0.12 : 0.08}
                side={BackSide}
                depthWrite={false}
                blending={AdditiveBlending}
              />
            </mesh>
          </group>

          {/* Orbit line plus the moon riding it */}
          <group rotation={[1.22, 0, 0.2]}>
            <mesh>
              <torusGeometry args={[2.62, 0.006, 8, 160]} />
              <meshBasicMaterial
                color={palette.orbit}
                transparent
                opacity={isDark ? 0.5 : 0.35}
              />
            </mesh>

            <group ref={moonOrbitRef}>
              <mesh position={[2.62, 0, 0]} scale={0.17}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                  color={palette.moon}
                  roughness={0.9}
                  metalness={0.05}
                />
              </mesh>
            </group>
          </group>

          <Satellites color={palette.glow} reduced={reduced} />
        </group>
      </Float>
    </group>
  );
};

/**
 * Page-level globe. Fixed behind the content, it travels between sections as
 * the page scrolls rather than living inside the hero alone.
 */
const JourneyGlobeCanvas = () => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const { isDark } = useThemeContext();
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  return (
    // Held well under full strength: the page text sits directly on top of
    // this, and a full-brightness globe made body copy hard to read.
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.55]"
      aria-hidden="true"
    >
      <CanvasShell
        className="h-full w-full"
        frameloop="always"
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
        <ambientLight intensity={isDark ? 0.35 : 0.75} />
        {/* Key light from upper right gives the globe a clear terminator */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={isDark ? 3 : 3.4}
          color={palette.keyLight}
        />
        <pointLight
          position={[-5, -1, 2]}
          intensity={isDark ? 30 : 16}
          color={palette.atmosphere}
          distance={16}
        />
        <pointLight
          position={[3, -3, -3]}
          intensity={isDark ? 22 : 12}
          color={palette.glow}
          distance={16}
        />

        <World
          palette={palette}
          reduced={reduced}
          isDark={isDark}
          sizeFactor={isSmall ? 0.58 : 1}
        />
      </CanvasShell>
    </div>
  );
};

export default JourneyGlobeCanvas;
