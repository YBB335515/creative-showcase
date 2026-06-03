import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import FloatingShapes from './FloatingShapes.jsx'
import Particles from './Particles.jsx'

export default function Scene3D({ scrollProgress }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#00f0ff', '#7c3aed', 0.6]} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00f0ff" />
      <pointLight position={[-5, -3, 5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[3, -5, -5]} intensity={0.6} color="#ff6b9d" />
      <FloatingShapes scrollProgress={scrollProgress} />
      <Particles scrollProgress={scrollProgress} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.1}
          intensity={0.5}
        />
      </EffectComposer>
    </Canvas>
  )
}
