import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Decal, Float } from "@react-three/drei";
import { BackSide, CanvasTexture, DoubleSide, SRGBColorSpace } from "three";

import CanvasShell from "./CanvasShell";
import { TECH_ICON_PATHS } from "../../constants/techIcons";
import { createPlanetTexture, hashString } from "./planetTexture";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useThemeContext } from "../../context/ThemeProvider";

const SPACING = 3.3;
const TEXTURE_SIZE = 512;
const MAX_TEXT_WIDTH = TEXTURE_SIZE * 0.8;
const GLYPH_VIEWBOX = 24;
const GLYPH_COVERAGE = 0.6;
const ACCENT_DARK = "#8A6EFF";
const ACCENT_LIGHT = "#6C4BFF";

/** Same PRNG as the planet painter, so a planet and its rings agree. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Picks black or white for the wordmark so it stays legible on any brand tone. */
function readableInk(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#141110" : "#FFFFFF";
}

/** Paints the brand glyph, scaled from its 24x24 viewBox and centred. */
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

/** Fallback for technologies with no brand glyph available. */
function paintWordmark(ctx, label, ink) {
  const setFont = (size) => {
    ctx.font = `700 ${size}px "DM Sans", system-ui, sans-serif`;
  };

  // Shrink until the wordmark fits, so "OneSignal" and "JS" both sit well.
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

/**
 * Draws the technology's mark onto a canvas and hands back a texture.
 * Real brand glyph where Simple Icons has one, wordmark otherwise.
 */
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

/**
 * A small world: textured globe, atmospheric rim, optional ring, and the
 * brand mark decalled onto the surface. Each planet is seeded from its own
 * name, so the same technology always renders the same world.
 */
const Planet = ({
  tech,
  map,
  surface,
  position,
  isDark,
  reduced,
  seed,
  baseScale,
}) => {
  const groupRef = useRef(null);
  const globeRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const { tilt, spin, hasRing, ringTilt } = useMemo(() => {
    const random = mulberry32(hashString(tech.name));
    return {
      tilt: (random() - 0.5) * 0.75,
      spin: 0.16 + random() * 0.16,
      // Roughly a third of the set gets rings, for variety across the grid.
      hasRing: random() > 0.62,
      ringTilt: 1.15 + (random() - 0.5) * 0.5,
    };
  }, [tech.name]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Ease the scale rather than snapping it on hover.
    const target = hovered ? baseScale * 1.16 : baseScale;
    group.scale.setScalar(group.scale.x + (target - group.scale.x) * 0.12);

    if (reduced) return;
    if (globeRef.current) globeRef.current.rotation.y += delta * spin;
    group.rotation.x += (state.pointer.y * 0.16 - group.rotation.x) * 0.03;
  });

  const atmosphere = isDark ? ACCENT_DARK : ACCENT_LIGHT;

  return (
    // Position lives on Float, not the mesh: Float rotates its own group, so
    // an offset mesh would swing in an arc around the grid origin instead of
    // spinning where it sits.
    <Float
      position={position}
      speed={reduced ? 0 : 1.1 + (seed % 4) * 0.14}
      rotationIntensity={reduced ? 0 : 0.18}
      floatIntensity={reduced ? 0 : 0.85}
    >
      <group
        ref={groupRef}
        scale={baseScale}
        rotation={[0, 0, tilt]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "";
        }}
      >
        <mesh ref={globeRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            map={surface}
            roughness={0.78}
            metalness={0.08}
            emissive={tech.color}
            emissiveIntensity={isDark ? 0.14 : 0.04}
          />
          <Decal
            position={[0, 0, 1]}
            rotation={[0, 0, 0]}
            scale={1.35}
            map={map}
            transparent
            polygonOffset
            polygonOffsetFactor={-10}
          />
        </mesh>

        {/* Backside shell reads as an atmospheric rim, not a solid halo */}
        <mesh scale={1.075}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={atmosphere}
            transparent
            opacity={isDark ? 0.16 : 0.11}
            side={BackSide}
            depthWrite={false}
          />
        </mesh>

        {hasRing ? (
          <mesh rotation={[ringTilt, 0.25, 0]}>
            <ringGeometry args={[1.38, 1.72, 96]} />
            <meshBasicMaterial
              color={tech.color}
              transparent
              opacity={isDark ? 0.42 : 0.3}
              side={DoubleSide}
              depthWrite={false}
            />
          </mesh>
        ) : null}
      </group>
    </Float>
  );
};

/** Scales the grid so it always fits the canvas, whatever the aspect ratio. */
const FitToViewport = ({ gridWidth, gridHeight, children }) => {
  const viewport = useThree((state) => state.viewport);

  const scale = useMemo(() => {
    const fit = Math.min(
      viewport.width / gridWidth,
      viewport.height / gridHeight
    );
    return fit * 0.94;
  }, [viewport.width, viewport.height, gridWidth, gridHeight]);

  return <group scale={scale}>{children}</group>;
};

/** Canvas text falls back to a system font until DM Sans has loaded. */
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

const Grid = ({ technologies, columns, isDark, reduced }) => {
  // Redraw once the webfont lands so wordmarks aren't stuck in the fallback.
  const fontsReady = useFontsReady();

  const surfaces = useMemo(
    () =>
      technologies.map((technology) =>
        createPlanetTexture(technology.color, technology.name)
      ),
    [technologies]
  );

  useEffect(
    () => () => surfaces.forEach((texture) => texture.dispose()),
    [surfaces]
  );

  const textures = useMemo(
    () => technologies.map(createMarkTexture),
    // fontsReady only matters for the wordmark fallback, but a redraw is cheap.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [technologies, fontsReady]
  );

  // Canvas textures are not managed by the loader cache, so free them here.
  useEffect(
    () => () => textures.forEach((texture) => texture.dispose()),
    [textures]
  );

  const { positions, gridWidth, gridHeight } = useMemo(() => {
    const rows = Math.ceil(technologies.length / columns);

    const items = technologies.map((_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      // Centre a short final row instead of left-aligning it.
      const itemsInRow = Math.min(columns, technologies.length - row * columns);
      return [
        (column - (itemsInRow - 1) / 2) * SPACING,
        ((rows - 1) / 2 - row) * SPACING,
        0,
      ];
    });

    return {
      positions: items,
      gridWidth: columns * SPACING,
      gridHeight: rows * SPACING,
    };
  }, [technologies, columns]);

  return (
    <FitToViewport gridWidth={gridWidth} gridHeight={gridHeight}>
      {technologies.map((technology, index) => (
        <Planet
          key={technology.name}
          tech={technology}
          map={textures[index]}
          surface={surfaces[index]}
          seed={index}
          baseScale={1}
          position={positions[index]}
          isDark={isDark}
          reduced={reduced}
        />
      ))}
    </FitToViewport>
  );
};

const TechSpheresCanvas = ({ technologies, className }) => {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isTiny = useMediaQuery("(max-width: 400px)");
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");
  const { isDark } = useThemeContext();

  const columns = isTiny ? 2 : isSmall ? 3 : isMedium ? 4 : 6;

  return (
    <CanvasShell
      className={className}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={isSmall ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      }}
      fallback={null}
    >
      <ambientLight intensity={isDark ? 0.6 : 1} />
      <directionalLight position={[0, 4, 9]} intensity={isDark ? 2 : 2.6} />
      {/* Warm key and cool rim give the clearcoat something to catch */}
      <pointLight
        position={[9, 6, 8]}
        intensity={isDark ? 110 : 70}
        color={isDark ? "#FF6A3D" : "#FFD9C7"}
        distance={50}
      />
      <pointLight
        position={[-9, -5, 7]}
        intensity={isDark ? 85 : 52}
        color={isDark ? "#8A6EFF" : "#C9BCFF"}
        distance={50}
      />
      <pointLight
        position={[0, 0, 12]}
        intensity={isDark ? 40 : 26}
        distance={40}
      />
      <Grid
        technologies={technologies}
        columns={columns}
        isDark={isDark}
        reduced={reduced}
      />
    </CanvasShell>
  );
};

export default TechSpheresCanvas;
