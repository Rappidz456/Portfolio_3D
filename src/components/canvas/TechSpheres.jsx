import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Decal } from "@react-three/drei";
import {
  BackSide,
  CanvasTexture,
  DoubleSide,
  MathUtils,
  SRGBColorSpace,
} from "three";

import CanvasShell from "./CanvasShell";
import { TECH_ICON_PATHS } from "../../constants/techIcons";
import { createPlanetTexture, hashString } from "./planetTexture";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

const TEXTURE_SIZE = 512;
const MAX_TEXT_WIDTH = TEXTURE_SIZE * 0.8;
const GLYPH_VIEWBOX = 24;
const GLYPH_COVERAGE = 0.6;
const ACCENT_DARK = "#8A6EFF";
const ACCENT_LIGHT = "#6C4BFF";

/**
 * Concentric orbits rather than a grid: each ring turns at its own period and
 * alternates direction, so the system never settles into a static pattern.
 * Positions are computed per frame, which keeps every planet's own orientation
 * independent of where it sits on its orbit.
 */
const RINGS = [
  { count: 5, radius: 3.1, period: 18, direction: 1 },
  { count: 6, radius: 5.0, period: 24, direction: -1 },
  { count: 5, radius: 6.8, period: 30, direction: 1 },
];

const ORBIT_TILT = 0.85;
const OUTER_RADIUS = RINGS[RINGS.length - 1].radius;

/** Picks black or white for the mark so it stays legible on any brand tone. */
function readableInk(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#141110" : "#FFFFFF";
}

function paintGlyph(ctx, path, ink) {
  const size = TEXTURE_SIZE * GLYPH_COVERAGE;
  const scale = size / GLYPH_VIEWBOX;
  const inset = (TEXTURE_SIZE - size) / 2;

  ctx.save();
  ctx.translate(inset, inset);
  ctx.scale(scale, scale);
  ctx.fillStyle = ink;
  ctx.fill(new Path2D(path));
  ctx.restore();
}

function paintWordmark(ctx, label, ink) {
  const setFont = (size) => {
    ctx.font = `700 ${size}px "DM Sans", system-ui, sans-serif`;
  };

  let fontSize = 124;
  setFont(fontSize);
  while (ctx.measureText(label).width > MAX_TEXT_WIDTH && fontSize > 26) {
    fontSize -= 4;
    setFont(fontSize);
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = ink;
  ctx.fillText(label, TEXTURE_SIZE / 2, TEXTURE_SIZE / 2);
}

/** Real brand glyph where Simple Icons has one, wordmark otherwise. */
function createMarkTexture(technology) {
  const canvas = document.createElement("canvas");
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;

  const ctx = canvas.getContext("2d");
  const ink = readableInk(technology.color);
  const path = TECH_ICON_PATHS[technology.name];

  if (path) {
    paintGlyph(ctx, path, ink);
  } else {
    paintWordmark(ctx, technology.label, ink);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/** Assigns every technology to a ring slot up front. */
function buildOrbits(count) {
  const slots = [];
  let index = 0;

  RINGS.forEach((ring, ringIndex) => {
    const take = Math.min(ring.count, count - index);
    for (let i = 0; i < take; i += 1) {
      slots.push({
        ring: ringIndex,
        radius: ring.radius,
        period: ring.period,
        direction: ring.direction,
        phase: (i / take) * Math.PI * 2,
      });
      index += 1;
    }
  });

  // Anything past the configured rings goes on one more orbit outside.
  while (index < count) {
    slots.push({
      ring: RINGS.length,
      radius: OUTER_RADIUS + 1.7,
      period: 36,
      direction: -1,
      phase:
        ((index - slots.length) / Math.max(1, count - index)) * Math.PI * 2,
    });
    index += 1;
  }

  return slots;
}

const Planet = ({
  tech,
  map,
  surface,
  orbit,
  isDark,
  reduced,
  selected,
  dimmed,
  interactive,
  onSelect,
}) => {
  const groupRef = useRef(null);
  const globeRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const spin = useMemo(
    () => 0.16 + (hashString(tech.name) % 100) / 700,
    [tech.name]
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Orbit position is set here, never on a parent, so the planet's own
    // orientation stays independent of where it is on the ring.
    const time = reduced ? 0 : state.clock.elapsedTime;
    const angle =
      orbit.phase + orbit.direction * (time / orbit.period) * Math.PI * 2;

    group.position.x = Math.cos(angle) * orbit.radius;
    group.position.y = Math.sin(angle) * orbit.radius;
    group.position.z = 0;

    const base = selected ? 1.35 : hovered ? 1.2 : 1;
    const next = MathUtils.damp(group.scale.x, base, 6, delta);
    group.scale.setScalar(next);

    if (!reduced && globeRef.current) {
      globeRef.current.rotation.y += delta * spin;
    }
  });

  const opacity = dimmed ? 0.28 : 1;

  return (
    <group ref={groupRef}>
      {/* Counter-tilt so planets stay upright against the tilted orbit plane */}
      <group rotation={[-ORBIT_TILT, 0, 0]}>
        <mesh
          ref={globeRef}
          onClick={(event) => {
            if (!interactive) return;
            event.stopPropagation();
            onSelect(tech.name);
          }}
          onPointerOver={(event) => {
            if (!interactive) return;
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "";
          }}
        >
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial
            map={surface}
            roughness={0.78}
            metalness={0.08}
            transparent
            opacity={opacity}
            emissive={tech.color}
            emissiveIntensity={selected ? 0.5 : isDark ? 0.14 : 0.04}
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[0, 0, 0]}
            scale={0.85}
            map={map}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
          />
        </mesh>

        <mesh scale={selected ? 1.28 : 1.1}>
          <sphereGeometry args={[0.62, 24, 24]} />
          <meshBasicMaterial
            color={selected ? tech.color : isDark ? ACCENT_DARK : ACCENT_LIGHT}
            transparent
            opacity={selected ? 0.35 : dimmed ? 0.05 : 0.14}
            side={BackSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
};

/** Faint guide ring so the orbital structure reads even when planets are apart. */
const OrbitLine = ({ radius, color, opacity }) => (
  <mesh>
    <torusGeometry args={[radius, 0.008, 8, 160]} />
    <meshBasicMaterial
      color={color}
      transparent
      opacity={opacity}
      side={DoubleSide}
      depthWrite={false}
    />
  </mesh>
);

const FitToViewport = ({ width, height, children }) => {
  const viewport = useThree((state) => state.viewport);

  const scale = useMemo(() => {
    const fit = Math.min(viewport.width / width, viewport.height / height);
    return fit * 0.94;
  }, [viewport.width, viewport.height, width, height]);

  return <group scale={scale}>{children}</group>;
};

function useFontsReady() {
  const [ready, setReady] = useState(
    () => typeof document === "undefined" || document.fonts?.status === "loaded"
  );

  useEffect(() => {
    if (ready || typeof document === "undefined" || !document.fonts) return;

    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [ready]);

  return ready;
}

const OrbitSystem = ({
  technologies,
  isDark,
  reduced,
  selected,
  filterable,
  onSelect,
}) => {
  const fontsReady = useFontsReady();

  const surfaces = useMemo(
    () =>
      technologies.map((technology) =>
        createPlanetTexture(technology.color, technology.name)
      ),
    [technologies]
  );

  const marks = useMemo(
    () => technologies.map(createMarkTexture),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [technologies, fontsReady]
  );

  useEffect(
    () => () => surfaces.forEach((texture) => texture.dispose()),
    [surfaces]
  );
  useEffect(() => () => marks.forEach((texture) => texture.dispose()), [marks]);

  const orbits = useMemo(
    () => buildOrbits(technologies.length),
    [technologies.length]
  );

  const ringRadii = useMemo(
    () => [...new Set(orbits.map((orbit) => orbit.radius))],
    [orbits]
  );

  const lineColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const extent = Math.max(...ringRadii) + 0.85;

  return (
    <FitToViewport
      width={extent * 2}
      height={(extent * Math.cos(ORBIT_TILT) + 0.85) * 2}
    >
      <group rotation={[ORBIT_TILT, 0, 0]}>
        {ringRadii.map((radius) => (
          <OrbitLine
            key={radius}
            radius={radius}
            color={lineColor}
            opacity={isDark ? 0.22 : 0.16}
          />
        ))}

        {technologies.map((technology, index) => (
          <Planet
            key={technology.name}
            tech={technology}
            map={marks[index]}
            surface={surfaces[index]}
            orbit={orbits[index]}
            isDark={isDark}
            reduced={reduced}
            selected={selected === technology.name}
            dimmed={Boolean(selected) && selected !== technology.name}
            interactive={!filterable || filterable.has(technology.name)}
            onSelect={onSelect}
          />
        ))}
      </group>
    </FitToViewport>
  );
};

const TechSpheresCanvas = ({
  technologies,
  selected,
  filterable,
  onSelect,
  className,
}) => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const { isDark } = useThemeContext();

  return (
    <CanvasShell
      className={className}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={isSmall ? [1, 1.25] : [1, 1.75]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      fallback={null}
    >
      <ambientLight intensity={isDark ? 0.75 : 1.15} />
      <directionalLight position={[0, 3, 8]} intensity={1.8} />
      <pointLight
        position={[8, 5, 8]}
        intensity={isDark ? 90 : 55}
        color={isDark ? "#FF6A3D" : "#E2542C"}
        distance={45}
      />
      <pointLight
        position={[-8, -4, 7]}
        intensity={isDark ? 70 : 42}
        color={isDark ? "#8A6EFF" : "#6C4BFF"}
        distance={45}
      />
      <OrbitSystem
        technologies={technologies}
        isDark={isDark}
        reduced={reduced}
        selected={selected}
        filterable={filterable}
        onSelect={onSelect}
      />
    </CanvasShell>
  );
};

export default TechSpheresCanvas;
