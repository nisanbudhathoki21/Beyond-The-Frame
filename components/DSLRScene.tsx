"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function DSLRModel({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.6) * 0.08;
    const p = scrollProgress;
    let targetY = 0.45;
    if (p < 0.15) targetY = 0.45 - p * 1.2;
    else if (p < 0.3) targetY = 0.25 + (p - 0.15) * 4;
    else if (p < 0.5) targetY = 0.85 - (p - 0.3) * 3;
    else if (p < 0.65) targetY = 0.25 + Math.sin(p*10)*0.1;
    else if (p < 0.8) targetY = -0.35;
    else targetY = -0.15;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.04;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.15 + Math.sin(p * Math.PI) * 0.2, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t*0.3)*0.02, 0.04);
  });
  return (
    <group ref={group} scale={1.35} position={[0, 0.1, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow><boxGeometry args={[1.6, 1.05, 0.65]} /><meshStandardMaterial color="#1a1a1a" roughness={0.35} metalness={0.15} /></mesh>
      <mesh position={[0.62, -0.08, 0.28]} castShadow><boxGeometry args={[0.38, 0.78, 0.5]} /><meshStandardMaterial color="#141414" roughness={0.5} metalness={0.1} /></mesh>
      <mesh position={[0.62, 0.15, 0.28]}><cylinderGeometry args={[0.18, 0.18, 0.32, 16]} /><meshStandardMaterial color="#141414" roughness={0.6} /></mesh>
      <mesh position={[0, 0.58, -0.05]}><boxGeometry args={[1.62, 0.14, 0.6]} /><meshStandardMaterial color="#222" roughness={0.4} metalness={0.2} /></mesh>
      <mesh position={[-0.55, 0.68, -0.08]}><cylinderGeometry args={[0.13, 0.13, 0.09, 24]} /><meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.3} /></mesh>
      <mesh position={[0.58, 0.68, 0.08]}><cylinderGeometry args={[0.07, 0.07, 0.05, 16]} /><meshStandardMaterial color="#D6B77A" roughness={0.3} metalness={0.6} /></mesh>
      <mesh position={[0, 0.68, -0.15]}><boxGeometry args={[0.32, 0.06, 0.28]} /><meshStandardMaterial color="#0f0f0f" roughness={0.7} /></mesh>
      <mesh position={[0, 0, 0.62]} rotation={[Math.PI/2, 0, 0]} castShadow><cylinderGeometry args={[0.42, 0.42, 0.55, 32]} /><meshStandardMaterial color="#1e1e1e" roughness={0.35} metalness={0.25} /></mesh>
      <mesh position={[0, 0, 0.88]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.44, 0.44, 0.12, 32]} /><meshStandardMaterial color="#252525" roughness={0.6} /></mesh>
      <mesh position={[0, 0, 0.48]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.435, 0.435, 0.08, 32]} /><meshStandardMaterial color="#2b2b2b" roughness={0.55} /></mesh>
      <mesh position={[0, 0, 1.05]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.38, 0.42, 0.28, 32]} /><meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.2} /></mesh>
      <mesh position={[0, 0, 1.21]} rotation={[Math.PI/2,0,0]}><circleGeometry args={[0.36, 32]} /><meshPhysicalMaterial color="#0a1a2a" transmission={0.12} thickness={0.4} roughness={0.05} clearcoat={1} clearcoatRoughness={0.05} /></mesh>
      <mesh position={[0, 0, 1.215]} rotation={[Math.PI/2,0,0]}><circleGeometry args={[0.22, 32]} /><meshStandardMaterial color="#4a7a9b" emissive="#1a3a5a" emissiveIntensity={0.25} transparent opacity={0.6} /></mesh>
      <mesh position={[0, 0.18, -0.38]}><boxGeometry args={[0.52, 0.32, 0.18]} /><meshStandardMaterial color="#0e0e0e" roughness={0.8} /></mesh>
      <mesh position={[0, 0.18, -0.47]}><planeGeometry args={[0.4, 0.22]} /><meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.1} /></mesh>
      <mesh position={[0, -0.05, -0.34]}><planeGeometry args={[1.15, 0.72]} /><meshStandardMaterial color="#0a0a0a" roughness={0.4} /></mesh>
      <mesh position={[0, -0.05, -0.335]}><planeGeometry args={[1.08, 0.66]} /><meshStandardMaterial color="#1a2a3a" emissive="#D6B77A" emissiveIntensity={0.08} /></mesh>
      <mesh position={[-0.35, -0.22, 0.33]}><planeGeometry args={[0.42, 0.08]} /><meshStandardMaterial color="#2a2a2a" /></mesh>
      <mesh position={[-0.82, 0.38, 0]}><torusGeometry args={[0.06, 0.015, 8, 16]} /><meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[0.82, 0.38, 0]}><torusGeometry args={[0.06, 0.015, 8, 16]} /><meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} /></mesh>
      <mesh position={[0.72, 0.05, 0.33]}><circleGeometry args={[0.03, 16]} /><meshStandardMaterial color="#c0392b" emissive="#c0392b" emissiveIntensity={0.6} /></mesh>
    </group>
  );
}

export default function DSLRScene({ progress = 0 }: { progress?: number }) {
  const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const effectiveProgress = isReduced ? 0 : progress;
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <PerspectiveCamera makeDefault position={[0, 0.6, 3.2]} fov={38} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 3, 2]} intensity={1.2} castShadow shadow-mapSize={1024} />
        <directionalLight position={[-2, 1, -1]} intensity={0.5} color="#D6B77A" />
        <pointLight position={[0, 1.5, 1.5]} intensity={0.8} color="#fff5e0" />
        <DSLRModel scrollProgress={effectiveProgress} />
        <ContactShadows position={[0, -0.7, 0]} opacity={0.45} scale={3} blur={2.6} far={1.6} color="#000" />
        <pointLight position={[1.5, 0.5, -1]} intensity={0.5} color="#D6B77A" distance={4} />
      </Canvas>
      <p className="sr-only">Generic DSLR 3D model inspired by Canon EOS Rebel T7 with 18-55mm lens — representative visualization.</p>
    </div>
  );
}
