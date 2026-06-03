import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const shapes = [
  { type: 'icosahedron', args: [0.6], color: '#00f0ff', pos: [-3.5, 1.2, -1], speed: 0.5, metalness: 0.7, roughness: 0.2 },
  { type: 'torusKnot', args: [0.5, 0.2, 64, 8], color: '#7c3aed', pos: [3, -1.8, 0.5], speed: 0.3, metalness: 0.8, roughness: 0.15 },
  { type: 'octahedron', args: [0.45], color: '#ff6b9d', pos: [4, 2.2, -0.5], speed: 0.7, metalness: 0.6, roughness: 0.25 },
  { type: 'sphere', args: [0.35, 32, 32], color: '#ffd700', pos: [-2.5, -2.5, 1.5], speed: 0.4, metalness: 0.9, roughness: 0.1 },
  { type: 'torus', args: [0.45, 0.15, 16, 32], color: '#64ffda', pos: [0.5, 3, 2], speed: 0.6, metalness: 0.5, roughness: 0.3 },
  { type: 'dodecahedron', args: [0.5], color: '#f472b6', pos: [-4, -1, -1.5], speed: 0.45, metalness: 0.7, roughness: 0.2 },
]

function ShapeGeometry({ type, args }) {
  switch (type) {
    case 'icosahedron': return <icosahedronGeometry args={args} />
    case 'torusKnot': return <torusKnotGeometry args={args} />
    case 'octahedron': return <octahedronGeometry args={args} />
    case 'sphere': return <sphereGeometry args={args} />
    case 'torus': return <torusGeometry args={args} />
    case 'dodecahedron': return <dodecahedronGeometry args={args} />
    default: return <boxGeometry args={[0.5, 0.5, 0.5]} />
  }
}

export default function FloatingShapes({ scrollProgress }) {
  const groupRef = useRef()

  const originals = useMemo(() => shapes.map(s => ({
    x: s.pos[0], y: s.pos[1], z: s.pos[2],
  })), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const scroll = scrollProgress?.get() ?? 0
    const time = state.clock.elapsedTime

    // Camera reacts to scroll
    state.camera.position.z = 8 - scroll * 4

    groupRef.current.children.forEach((mesh, i) => {
      const shape = shapes[i]
      const orig = originals[i]
      const floatOffset = Math.sin(time * shape.speed + i * 2) * 0.4
      const scrollOffset = scroll * (orig.z + 2) * 0.5

      mesh.position.x = orig.x + Math.sin(time * shape.speed * 0.5 + i) * 0.3
      mesh.position.y = orig.y + floatOffset
      mesh.position.z = orig.z - scrollOffset

      mesh.rotation.x += delta * shape.speed * (1 + scroll * 0.5)
      mesh.rotation.y += delta * shape.speed * 0.8 * (1 + scroll * 0.3)
    })
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos}>
          <ShapeGeometry type={shape.type} args={shape.args} />
          <meshPhysicalMaterial
            color={shape.color}
            metalness={shape.metalness}
            roughness={shape.roughness}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}
