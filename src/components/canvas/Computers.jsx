import { useEffect, useState } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import CanvasShell from "./CanvasShell";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow={!isMobile}
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

useGLTF.preload("./desktop_pc/scene.gltf");

const ComputersCanvas = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShouldRender(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <CanvasShell
      className="w-full h-full"
      shadows={!isMobile}
      camera={{ position: [20, 3, 5], fov: 25 }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
    >
      <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Computers isMobile={isMobile} />
    </CanvasShell>
  );
};

export default ComputersCanvas;
