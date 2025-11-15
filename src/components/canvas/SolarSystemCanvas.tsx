import { Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Planet } from './Planet'
import { Sun } from './Sun'
import { bodies } from '../../data/bodies'
import { useSimulationStore } from '../../store/useSimulationStore'

export const SolarSystemCanvas = () => {
  const celestialBodies = useMemo(() => bodies.filter((body) => body.type === 'planet'), [])

  return (
    <Canvas
      camera={{ position: [0, 25, 60], fov: 45, near: 0.1, far: 2000 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#050609')
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      }}
      shadows
    >
      <color attach="background" args={['#03040a']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#fff7c0" />

      <Stars radius={150} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

      <Suspense fallback={null}>
        <Sun />
        {celestialBodies.map((body) => (
          <Planet key={body.id} body={body} />
        ))}
      </Suspense>

      <OrbitControls enablePan enableRotate enableZoom maxDistance={300} minDistance={10} />

      <TimeDriver />
    </Canvas>
  )
}

const TimeDriver = () => {
  const advance = useSimulationStore((state) => state.advance)
  useFrame((_, delta) => advance(delta))
  return null
}
