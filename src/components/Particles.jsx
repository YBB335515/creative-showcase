import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ scrollProgress }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const count = 600
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const colorA = new THREE.Color('#00f0ff')
    const colorB = new THREE.Color('#7c3aed')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 10 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i3 + 2] = radius * Math.cos(phi)

      const mix = Math.random()
      const c = colorA.clone().lerp(colorB, mix)
      col[i3] = c.r
      col[i3 + 1] = c.g
      col[i3 + 2] = c.b
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const scroll = scrollProgress?.get() ?? 0
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02 + scroll * 0.5
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1 + scroll * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
