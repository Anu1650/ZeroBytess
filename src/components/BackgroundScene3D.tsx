import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} scale={1.2}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          roughness={0.05}
          metalness={0.1}
          transmission={0.9}
          thickness={1}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function DataStreams() {
  const count = 30;
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ]);
    }
    return pos;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Float key={i} speed={0.5 + Math.random()} floatIntensity={0.2}>
          <mesh position={pos}>
            <boxGeometry args={[0.03, 0.03, 0.03]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4090ff" : "#8b5cf6"}
              emissive={i % 2 === 0 ? "#4090ff" : "#8b5cf6"}
              emissiveIntensity={3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const BackgroundScene3D = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-3, 2, 3]} intensity={0.3} color="#4090ff" />
        <GlassSphere />
        <DataStreams />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default BackgroundScene3D;
