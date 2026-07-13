'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Tier 2 — the real-time « Lumière du matin » diorama.
 * Procedural, stylized, no external assets: the whole scene is code.
 * No shadows, capped DPR, pauses when the hero leaves the viewport.
 */

const C = {
  wall: '#f9f0dd',
  floor: '#e9d3ab',
  rug: '#dfe7d4',
  rugInner: '#eaf0e3',
  frame: '#e5c795',
  sky: '#ffe2ad',
  sun: '#eeb04b',
  beam: '#f9dfa8',
  honey: '#eeb04b',
  ciel: '#89aecb',
  terracotta: '#cd7051',
  terracottaSoft: '#dd9179',
  lavande: '#a48bbf',
  teddy: '#d4a878',
  teddyDark: '#c89a6b',
  pot: '#c96f4f',
  leaf: '#7d9b76',
  wood: '#a97c50',
  dust: '#f3cd8a',
} as const

function Butterfly({
  color,
  path,
  speed,
  offset,
}: {
  color: string
  path: [number, number, number]
  speed: number
  offset: number
}) {
  const group = useRef<THREE.Group>(null)
  const left = useRef<THREE.Mesh>(null)
  const right = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    if (group.current) {
      group.current.position.set(
        path[0] + Math.sin(t * 0.6) * 0.5,
        path[1] + Math.sin(t) * 0.25,
        path[2] + Math.cos(t * 0.4) * 0.3,
      )
      group.current.rotation.y = Math.sin(t * 0.3) * 0.6
    }
    const flap = Math.sin(t * 8) * 0.7
    if (left.current) left.current.rotation.y = flap
    if (right.current) right.current.rotation.y = -flap
  })

  return (
    <group ref={group}>
      <mesh ref={left} position={[-0.06, 0, 0]}>
        <planeGeometry args={[0.16, 0.22]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={right} position={[0.06, 0, 0]}>
        <planeGeometry args={[0.16, 0.22]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Dust() {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    // Deterministic pseudo-random spread (stable across renders, lint-pure).
    let s = 1234567
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const arr = new Float32Array(42 * 3)
    for (let i = 0; i < 42; i++) {
      arr[i * 3] = -1.2 + rand() * 2.4
      arr[i * 3 + 1] = 0.2 + rand() * 2.4
      arr[i * 3 + 2] = -0.6 + rand() * 1.6
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.2
      points.current.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.06
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={C.dust} size={0.035} transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

function Teddy() {
  return (
    <group position={[-1.15, 0.02, 0.7]} scale={0.9}>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color={C.teddy} />
      </mesh>
      <mesh position={[0, 0.86, 0]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color={C.teddy} />
      </mesh>
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, 1.06, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color={C.teddyDark} />
        </mesh>
      ))}
      {[-0.32, 0.32].map((x) => (
        <mesh key={x} position={[x, 0.44, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={C.teddyDark} />
        </mesh>
      ))}
      <mesh position={[0, 0.8, 0.2]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={'#e8cba4'} />
      </mesh>
    </group>
  )
}

function Blocks() {
  return (
    <group position={[1.25, 0, 0.55]}>
      <mesh position={[-0.24, 0.21, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={C.honey} />
      </mesh>
      <mesh position={[0.24, 0.21, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={C.ciel} />
      </mesh>
      <mesh position={[0, 0.64, 0]} rotation={[0, 0.18, 0]}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={C.terracotta} />
      </mesh>
    </group>
  )
}

function Plant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.5, 16]} />
        <meshStandardMaterial color={C.pot} />
      </mesh>
      {[
        [-0.14, 0.72, 0, 0.5],
        [0.14, 0.78, 0.05, 0.6],
        [0, 0.9, -0.05, 0.55],
      ].map(([x, y, z, s], i) => (
        <mesh key={i} position={[x, y, z]} scale={[s, s * 1.7, s * 0.5]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial color={C.leaf} />
        </mesh>
      ))}
    </group>
  )
}

function Star({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.25
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.6) * 0.05
    }
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <octahedronGeometry args={[0.16]} />
        <meshStandardMaterial color={C.sun} emissive={C.sun} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function Room() {
  return (
    <group>
      {/* Wall + floor */}
      <mesh position={[0, 2, -2]}>
        <planeGeometry args={[12, 6]} />
        <meshStandardMaterial color={C.wall} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color={C.floor} />
      </mesh>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0.6]}>
        <circleGeometry args={[1.9, 40]} />
        <meshStandardMaterial color={C.rug} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]}>
        <circleGeometry args={[1.45, 40]} />
        <meshStandardMaterial color={C.rugInner} />
      </mesh>

      {/* Arched window: frame + warm sky + sun */}
      <group position={[-1.7, 2.1, -1.98]}>
        <mesh>
          <planeGeometry args={[1.9, 2.5]} />
          <meshStandardMaterial color={C.frame} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <circleGeometry args={[0.95, 32, 0, Math.PI]} />
          <meshStandardMaterial color={C.frame} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.6, 2.2]} />
          <meshStandardMaterial color={C.sky} emissive={C.sky} emissiveIntensity={0.55} />
        </mesh>
        <mesh position={[0, 1.1, 0.01]}>
          <circleGeometry args={[0.8, 32, 0, Math.PI]} />
          <meshStandardMaterial color={C.sky} emissive={C.sky} emissiveIntensity={0.55} />
        </mesh>
        <mesh position={[0, 0.9, 0.02]}>
          <circleGeometry args={[0.34, 24]} />
          <meshStandardMaterial color={C.sun} emissive={C.sun} emissiveIntensity={1.1} />
        </mesh>
      </group>

      {/* Light beam from the window */}
      <mesh position={[-0.7, 1.05, -0.4]} rotation={[0, 0, 0.5]}>
        <planeGeometry args={[1.6, 3.6]} />
        <meshBasicMaterial
          color={C.beam}
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Shelf + books */}
      <group position={[1.9, 2.2, -1.9]}>
        <mesh>
          <boxGeometry args={[1.5, 0.08, 0.3]} />
          <meshStandardMaterial color={C.frame} />
        </mesh>
        {[
          [-0.5, C.ciel, 0],
          [-0.3, C.terracotta, 0],
          [-0.12, C.lavande, 0.12],
        ].map(([x, color, tilt], i) => (
          <mesh key={i} position={[x as number, 0.24, 0]} rotation={[0, 0, tilt as number]}>
            <boxGeometry args={[0.12, 0.4, 0.22]} />
            <meshStandardMaterial color={color as string} />
          </mesh>
        ))}
        <group position={[0.45, 0.04, 0]} scale={0.55}>
          <Plant position={[0, 0, 0]} />
        </group>
      </group>

      {/* Toys + friends */}
      <Teddy />
      <Blocks />
      <mesh position={[2.2, 0.28, 1.3]}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshStandardMaterial color={C.terracottaSoft} />
      </mesh>
      <Plant position={[-2.6, 0, -1.2]} scale={1.15} />
      <Star position={[2.6, 3.4, -1.5]} />

      {/* Soft fake contact shadows */}
      {(
        [
          [-1.15, 0.7, 0.55],
          [1.25, 0.55, 0.5],
          [2.2, 1.3, 0.34],
          [-2.6, -1.2, 0.42],
        ] as const
      ).map(([x, z, r], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.012, z]}>
          <circleGeometry args={[r, 24]} />
          <meshBasicMaterial color="#5b452c" transparent opacity={0.09} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig() {
  const pointer = useRef({ x: 0, y: 0 })

  useFrame(({ camera, clock, pointer: p }) => {
    pointer.current.x += (p.x - pointer.current.x) * 0.04
    pointer.current.y += (p.y - pointer.current.y) * 0.04
    const t = clock.elapsedTime
    camera.position.x = Math.sin(t * 0.12) * 0.18 + pointer.current.x * 0.45
    camera.position.y = 1.55 + Math.sin(t * 0.17) * 0.08 + pointer.current.y * 0.25
    camera.position.z = 6.4
    camera.lookAt(0, 1.15, 0)
  })
  return null
}

export default function Scene3D({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 34, position: [0, 1.55, 6.4] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
      onCreated={({ gl, scene }) => {
        scene.background = new THREE.Color('#f7ead2')
        gl.setClearColor('#f7ead2')
        onReady?.()
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.15} color="#fff3df" />
      <directionalLight position={[-2.5, 3.5, 2.5]} intensity={1.3} color="#ffd9a0" />
      <pointLight position={[-1.7, 2.4, -1.2]} intensity={6} color="#ffdda6" distance={6} />
      <Room />
      <Butterfly color={C.lavande} path={[-1.6, 2.1, 0.4]} speed={0.5} offset={0} />
      <Butterfly color={C.ciel} path={[1.4, 2.5, -0.4]} speed={0.4} offset={2.4} />
      <Butterfly color={C.terracottaSoft} path={[0.3, 1.7, 0.9]} speed={0.6} offset={4.8} />
      <Dust />
      <CameraRig />
    </Canvas>
  )
}
