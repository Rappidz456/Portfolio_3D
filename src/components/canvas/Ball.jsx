import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";
import CanvasShell from "./CanvasShell";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const isMobile = useMediaQuery("(max-width: 500px)");

  return (
    <CanvasShell dpr={isMobile ? [1, 1] : [1, 1.5]}>
      <OrbitControls enableZoom={false} />
      <Ball imgUrl={icon} />
    </CanvasShell>
  );
};

export default BallCanvas;
