import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import CanvasLoader from "../Loader";

const DEFAULT_GL = {
  preserveDrawingBuffer: true,
  antialias: false,
  powerPreference: "high-performance",
};

/**
 * Shared R3F canvas shell with performance-oriented defaults.
 */
const CanvasShell = ({
  children,
  camera,
  className,
  fallback = <CanvasLoader />,
  dpr = [1, 1.5],
  shadows = false,
  gl = DEFAULT_GL,
  ...canvasProps
}) => {
  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        dpr={dpr}
        shadows={shadows}
        gl={gl}
        camera={camera}
        {...canvasProps}
      >
        <Suspense fallback={fallback}>{children}</Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CanvasShell;
