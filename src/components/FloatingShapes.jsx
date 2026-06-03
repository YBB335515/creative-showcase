import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const shapes = [
  { type: 'icosahedron', args: [0.6], colorA: '#00f0ff', colorB: '#7c3aed', pos: [-3.5, 1.2, -1], speed: 0.5, metalness: 0.7, roughness: 0.2 },
  { type: 'torusKnot', args: [0.5, 0.2, 64, 8], colorA: '#7c3aed', colorB: '#ff6b9d', pos: [3, -1.8, 0.5], speed: 0.3, metalness: 0.8, roughness: 0.15 },
  { type: 'octahedron', args: [0.45], colorA: '#ff6b9d', colorB: '#ffd700', pos: [4, 2.2, -0.5], speed: 0.7, metalness: 0.6, roughness: 0.25 },
  { type: 'sphere', args: [0.35, 32, 32], colorA: '#ffd700', colorB: '#64ffda', pos: [-2.5, -2.5, 1.5], speed: 0.4, metalness: 0.9, roughness: 0.1 },
  { type: 'torus', args: [0.45, 0.15, 16, 32], colorA: '#64ffda', colorB: '#00f0ff', pos: [0.5, 3, 2], speed: 0.6, metalness: 0.5, roughness: 0.3 },
  { type: 'dodecahedron', args: [0.5], colorA: '#f472b6', colorB: '#7c3aed', pos: [-4, -1, -1.5], speed: 0.45, metalness: 0.7, roughness: 0.2 },
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
  const cameraZ = useRef(8)
  const colorObjs = useRef([])

  const originals = useMemo(() => shapes.map(s => ({
    x: s.pos[0], y: s.pos[1], z: s.pos[2],
  })), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const scroll = scrollProgress?.get() ?? 0
    const time = state.clock.elapsedTime

    // Smooth camera damping
    const targetZ = 8 - scroll * 4
    cameraZ.current += (targetZ - cameraZ.current) * 0.05
    state.camera.position.z = cameraZ.current

    groupRef.current.children.forEach((mesh, i) => {
      const shape = shapes[i]
      const orig = originals[i]
      const floatOffset = Math.sin(time * shape.speed + i * 2) * 0.4
      const scrollOffset = scroll * (orig.z + 2) * 0.5

      mesh.position.x = orig.x + Math.sin(time * shape.speed * 0.5 + i) * 0.3
      mesh.position.y = orig.y + floatOffset
      mesh.position.z = orig.z - scrollOffset

      // Rotation
      mesh.rotation.x += delta * shape.speed * (1 + scroll * 0.5)
      mesh.rotation.y += delta * shape.speed * 0.8 * (1 + scroll * 0.3)

      // Scale pulsing (subtle breathing)
      const scale = 1 + Math.sin(time * shape.speed * 0.7 + i * 1.5) * 0.08
      mesh.scale.setScalar(scale)

      // Color oscillation between colorA and colorB
      const colorMix = (Math.sin(time * shape.speed * 0.3 + i) + 1) / 2
      if (!colorObjs.current[i]) {
        colorObjs.current[i] = { a: new THREE.Color(shape.colorA), b: new THREE.Color(shape.colorB) }
      }
      const { a, b } = colorObjs.current[i]
      mesh.material.color.lerp(colorMix > 0.5 ? b : a, 0.02)
    })
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.pos}>
          <ShapeGeometry type={shape.type} args={shape.args} />
          <meshPhysicalMaterial
            color={shape.colorA}
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
