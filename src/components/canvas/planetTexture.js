import { CanvasTexture, SRGBColorSpace } from "three";

const MAP_W = 512;
const MAP_H = 256;

/** Deterministic PRNG so a technology always gets the same world. */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function hexToRgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/** Blends toward white (t > 0) or black (t < 0). */
function shade(rgb, t) {
  const target = t >= 0 ? 255 : 0;
  const amount = Math.abs(t);
  return rgb.map((channel) =>
    Math.round(channel + (target - channel) * amount)
  );
}

const css = (rgb, alpha = 1) =>
  `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

/**
 * Paints an equirectangular planet map from a single brand colour.
 *
 * Everything is derived from that one hue — bands, landmasses and ice caps are
 * all shades of it — so sixteen very different brand colours still read as one
 * family of worlds rather than sixteen unrelated textures.
 */
export function createPlanetTexture(color, seedSource) {
  const random = mulberry32(hashString(seedSource));
  const base = hexToRgb(color);

  const canvas = document.createElement("canvas");
  canvas.width = MAP_W;
  canvas.height = MAP_H;
  const ctx = canvas.getContext("2d");

  // Ocean / base coat, slightly deepened so landmasses can sit above it.
  ctx.fillStyle = css(shade(base, -0.24));
  ctx.fillRect(0, 0, MAP_W, MAP_H);

  // Latitude banding — the gas-giant read.
  const bandCount = 5 + Math.floor(random() * 5);
  for (let i = 0; i < bandCount; i += 1) {
    const y = random() * MAP_H;
    const height = MAP_H * (0.04 + random() * 0.11);
    const lift = random() > 0.5 ? 0.16 : -0.16;
    ctx.fillStyle = css(shade(base, lift), 0.5);
    ctx.fillRect(0, y, MAP_W, height);
  }

  // Landmasses: clustered ellipses, denser near the equator.
  const blobCount = 26 + Math.floor(random() * 16);
  for (let i = 0; i < blobCount; i += 1) {
    const x = random() * MAP_W;
    const equatorBias = (random() + random() + random()) / 3;
    const y = equatorBias * MAP_H;
    const rx = MAP_W * (0.02 + random() * 0.075);
    const ry = MAP_H * (0.03 + random() * 0.085);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((random() - 0.5) * 1.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = css(
      shade(base, 0.1 + random() * 0.3),
      0.55 + random() * 0.3
    );
    ctx.fill();
    ctx.restore();
  }

  // Cloud wisps for atmosphere.
  const wispCount = 12 + Math.floor(random() * 10);
  for (let i = 0; i < wispCount; i += 1) {
    const x = random() * MAP_W;
    const y = random() * MAP_H;
    const rx = MAP_W * (0.05 + random() * 0.12);
    const ry = MAP_H * (0.012 + random() * 0.03);

    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + random() * 0.12})`;
    ctx.fill();
    ctx.restore();
  }

  // Polar ice, faded toward the equator.
  const capDepth = MAP_H * (0.1 + random() * 0.07);
  const north = ctx.createLinearGradient(0, 0, 0, capDepth);
  north.addColorStop(0, css(shade(base, 0.78), 0.95));
  north.addColorStop(1, css(shade(base, 0.6), 0));
  ctx.fillStyle = north;
  ctx.fillRect(0, 0, MAP_W, capDepth);

  const south = ctx.createLinearGradient(0, MAP_H, 0, MAP_H - capDepth);
  south.addColorStop(0, css(shade(base, 0.78), 0.95));
  south.addColorStop(1, css(shade(base, 0.6), 0));
  ctx.fillStyle = south;
  ctx.fillRect(0, MAP_H - capDepth, MAP_W, capDepth);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}
