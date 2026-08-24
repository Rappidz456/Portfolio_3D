import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasShell from "./CanvasShell";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

useGLTF.preload("./planet/scene.gltf");

const EarthCanvas = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <CanvasShell
      className="w-full h-full"
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
    >
      <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Earth />
    </CanvasShell>
  );
};

export default EarthCanvas;
