import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function AICore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={0.4}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#4090ff"
          roughness={0.1}
          transmission={0.95}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI / 2.5;
      ring1Ref.current.rotation.z = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3;
      ring2Ref.current.rotation.y = t * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.PI / 4;
      ring3Ref.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#4090ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.01, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3.6, 0.008, 16, 100]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </>
  );
}

function FloatingNodes() {
  const count = 20;
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2;
      pos.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pos;
  }, []);

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.3}>
          <mesh position={pos}>
            <sphereGeometry args={[0.04 + Math.random() * 0.03, 16, 16]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#4090ff" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
              emissive={i % 3 === 0 ? "#4090ff" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
              emissiveIntensity={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

const AIScene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 3, 3]} intensity={0.5} color="#4090ff" />
        <pointLight position={[3, -3, 3]} intensity={0.5} color="#8b5cf6" />
        <AICore />
        <OrbitalRings />
        <FloatingNodes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default AIScene3D;
