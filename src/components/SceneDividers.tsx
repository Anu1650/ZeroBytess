import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

// Circuit board node cluster
function CircuitNodes() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const nodes: [number, number, number][] = [
    [0, 0, 0], [1.5, 0.8, 0.3], [-1.2, 0.5, -0.5], [0.8, -0.7, 0.6],
    [-0.9, -0.4, 0.4], [1.8, -0.2, -0.3], [-1.6, -0.8, 0.2], [0.3, 1.2, -0.4],
    [-0.5, -1.3, -0.3], [2.1, 0.3, 0.5], [-2, 0.1, -0.1],
  ];

  const connections: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [2, 6], [3, 8], [4, 6],
    [1, 7], [5, 9], [6, 10], [7, 2],
  ];

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.1}>
          <mesh position={pos}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshPhysicalMaterial
              color={i % 3 === 0 ? "#4090ff" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
              emissive={i % 3 === 0 ? "#4090ff" : "#8b5cf6"}
              emissiveIntensity={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
      {connections.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        return (
          <mesh key={i} position={mid}>
            <cylinderGeometry args={[0.008, 0.008, len, 4]} />
            <meshStandardMaterial color="#4090ff" transparent opacity={0.35} emissive="#4090ff" emissiveIntensity={0.5} />
            <primitive object={new THREE.Object3D()} ref={(obj: THREE.Object3D | null) => {
              if (obj?.parent) {
                obj.parent.lookAt(end);
                obj.parent.rotateX(Math.PI / 2);
              }
            }} />
          </mesh>
        );
      })}
    </group>
  );
}

// Robotic arm-like mechanical structure
function RoboticArm() {
  const armRef = useRef<THREE.Group>(null);
  const joint1Ref = useRef<THREE.Group>(null);
  const joint2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (armRef.current) armRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    if (joint1Ref.current) joint1Ref.current.rotation.z = Math.sin(t * 0.5) * 0.3 - 0.2;
    if (joint2Ref.current) joint2Ref.current.rotation.z = Math.cos(t * 0.4) * 0.4 + 0.1;
  });

  return (
    <group ref={armRef} position={[0, -0.5, 0]}>
      {/* Base */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 16]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Joint 1 */}
      <group ref={joint1Ref} position={[0, 0.2, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshPhysicalMaterial color="#4090ff" emissive="#4090ff" emissiveIntensity={0.5} metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Joint 2 */}
        <group ref={joint2Ref} position={[0, 1.1, 0]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshPhysicalMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.08, 0.8, 0.08]} />
            <meshPhysicalMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* End effector */}
          <mesh position={[0, 0.9, 0]}>
            <dodecahedronGeometry args={[0.15, 0]} />
            <meshPhysicalMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1}
              transmission={0.6}
              roughness={0.05}
              metalness={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

// Floating gear/cog
function FloatingGear({ position, scale = 1, color = "#4090ff" }: { position: [number, number, number]; scale?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.2;
  });
  return (
    <Float speed={1.5} floatIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusGeometry args={[0.4, 0.08, 8, 6]} />
        <meshPhysicalMaterial color={color} metalness={0.9} roughness={0.15} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

// Divider variant 1: Circuit Board
export function CircuitDivider() {
  return (
    <div className="h-40 md:h-56 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} />
        <pointLight position={[-2, 1, 3]} intensity={0.4} color="#4090ff" />
        <pointLight position={[2, -1, 3]} intensity={0.3} color="#8b5cf6" />
        <CircuitNodes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Divider variant 2: Robotic Arm
export function RoboticDivider() {
  return (
    <div className="h-48 md:h-64 relative">
      <Canvas camera={{ position: [0, 1, 4.5], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 2, 3]} intensity={0.5} color="#4090ff" />
        <pointLight position={[3, 3, 2]} intensity={0.3} color="#8b5cf6" />
        <RoboticArm />
        <FloatingGear position={[-2, 1.5, -1]} scale={0.6} color="#4090ff" />
        <FloatingGear position={[2.2, 0.5, -0.5]} scale={0.4} color="#8b5cf6" />
        <FloatingGear position={[1.5, 2, -1]} scale={0.3} color="#06b6d4" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

// Divider variant 3: Floating chips/processors
function ChipCluster() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  const chips: { pos: [number, number, number]; rot: [number, number, number]; color: string }[] = [
    { pos: [-1.5, 0, 0], rot: [0.3, 0, 0.1], color: "#4090ff" },
    { pos: [0, 0.3, 0.5], rot: [-0.2, 0.5, 0], color: "#8b5cf6" },
    { pos: [1.5, -0.2, -0.3], rot: [0.1, -0.3, 0.2], color: "#06b6d4" },
    { pos: [-0.5, -0.5, 0.8], rot: [0, 0.2, -0.1], color: "#4090ff" },
    { pos: [0.8, 0.6, -0.6], rot: [-0.1, -0.2, 0.3], color: "#8b5cf6" },
  ];

  return (
    <group ref={groupRef}>
      {chips.map((chip, i) => (
        <Float key={i} speed={1.2 + i * 0.2} floatIntensity={0.3}>
          <group position={chip.pos} rotation={chip.rot}>
            {/* Chip body */}
            <mesh>
              <boxGeometry args={[0.6, 0.06, 0.6]} />
              <meshPhysicalMaterial
                color={chip.color}
                metalness={0.85}
                roughness={0.12}
                emissive={chip.color}
                emissiveIntensity={0.3}
              />
            </mesh>
            {/* Pins */}
            {Array.from({ length: 4 }).map((_, pi) => (
              <mesh key={`pin-${pi}`} position={[(pi - 1.5) * 0.15, 0, 0.35]}>
                <boxGeometry args={[0.02, 0.02, 0.1]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
            {Array.from({ length: 4 }).map((_, pi) => (
              <mesh key={`pin2-${pi}`} position={[(pi - 1.5) * 0.15, 0, -0.35]}>
                <boxGeometry args={[0.02, 0.02, 0.1]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
              </mesh>
            ))}
          </group>
        </Float>
      ))}
    </group>
  );
}

export function ChipDivider() {
  return (
    <div className="h-40 md:h-52 relative">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 5]} intensity={0.8} />
        <pointLight position={[-2, 1, 3]} intensity={0.4} color="#4090ff" />
        <ChipCluster />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
