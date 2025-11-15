import { useMemo, useRef } from 'react'
import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'
import type { CelestialBody } from '../../data/bodies'
import {
  DISTANCE_SCALE,
  MIN_RENDER_RADIUS,
  ORBIT_LINE_THICKNESS,
  RADIUS_SCALE,
} from '../../constants/space'
import { useSimulationStore } from '../../store/useSimulationStore'

type PlanetProps = {
  body: CelestialBody
}

export const Planet = ({ body }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null)
  const selectBody = useSimulationStore((state) => state.selectBody)

  const orbitPoints = useMemo<[number, number, number][] | undefined>(() => {
    if (!body.orbit) return undefined
    const { semiMajorAxisKm } = body.orbit
    const radius = semiMajorAxisKm * DISTANCE_SCALE
    const segments = 256
    return Array.from({ length: segments }, (_, i) => {
      const angle = (i / segments) * Math.PI * 2
      return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number]
    })
  }, [body.orbit])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const { simulationTime } = useSimulationStore.getState()
    if (body.orbit) {
      const orbitalPeriodSeconds = body.orbit.orbitalPeriodDays * 24 * 60 * 60
      const angularVelocity = (Math.PI * 2) / orbitalPeriodSeconds
      const angle = angularVelocity * simulationTime
      const distance = body.orbit.semiMajorAxisKm * DISTANCE_SCALE
      meshRef.current.position.set(Math.cos(angle) * distance, 0, Math.sin(angle) * distance)
    }

    if (body.rotationPeriodHours !== 0) {
      const rotationSeconds = Math.abs(body.rotationPeriodHours) * 60 * 60
      const rotationDirection = body.rotationPeriodHours < 0 ? -1 : 1
      meshRef.current.rotation.y += rotationDirection * ((Math.PI * 2) / rotationSeconds) * delta
    }
  })

    const planetRadius = Math.max(body.radiusKm * RADIUS_SCALE, MIN_RENDER_RADIUS)

    return (
      <>
        {orbitPoints && (
          <Line
            points={orbitPoints}
            color="rgba(255,255,255,0.12)"
            lineWidth={ORBIT_LINE_THICKNESS}
            transparent
            depthWrite={false}
          />
        )}
        <mesh
          ref={meshRef}
          onClick={() => selectBody(body.id)}
          onPointerOver={() => document.body.classList.add('show-pointer')}
          onPointerOut={() => document.body.classList.remove('show-pointer')}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[planetRadius, 64, 64]} />
          <meshStandardMaterial
            color={body.color}
            emissive={body.color}
            emissiveIntensity={0.5}
            roughness={0.55}
            metalness={0.15}
          />
        </mesh>
      </>
    )
}
