import { Suspense, useEffect, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Planet } from './Planet'
import { Sun } from './Sun'
import { bodies } from '../../data/bodies'
import { useSimulationStore } from '../../store/useSimulationStore'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export const SolarSystemCanvas = () => {
  const celestialBodies = useMemo(() => bodies.filter((body) => body.type === 'planet'), [])
  const controlsRef = useRef<OrbitControlsImpl | null>(null)

  return (
    <Canvas
      camera={{ position: [0, 80, 220], fov: 45, near: 0.1, far: 4000 }}
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

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableRotate
          enableZoom
          enableDamping
          dampingFactor={0.05}
          maxDistance={1500}
          minDistance={8}
        />

        <KeyboardPanControls controlsRef={controlsRef} />
        <TimeDriver />
    </Canvas>
  )
}

const TimeDriver = () => {
  const advance = useSimulationStore((state) => state.advance)
  useFrame((_, delta) => advance(delta))
  return null
}

const PAN_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'KeyW',
  'KeyS',
  'KeyA',
  'KeyD',
])
const PAN_SPEED = 60
const MIN_DISTANCE_FACTOR = 0.35

type KeyboardPanControlsProps = {
  controlsRef: RefObject<OrbitControlsImpl | null>
}

type OrbitControlsWithPan = OrbitControlsImpl & {
  pan: (deltaX: number, deltaY: number) => void
}

const shouldIgnoreEvent = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

const KeyboardPanControls = ({ controlsRef }: KeyboardPanControlsProps) => {
  const pressed = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!PAN_KEYS.has(event.code) || shouldIgnoreEvent(event.target)) return
      event.preventDefault()
      pressed.current[event.code] = true
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!PAN_KEYS.has(event.code)) return
      pressed.current[event.code] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    const controls = controlsRef.current as OrbitControlsWithPan | null
    if (!controls || typeof controls.pan !== 'function') return

    let panX = 0
    let panY = 0

    if (pressed.current.ArrowUp || pressed.current.KeyW) panY += 1
    if (pressed.current.ArrowDown || pressed.current.KeyS) panY -= 1
    if (pressed.current.ArrowLeft || pressed.current.KeyA) panX += 1
    if (pressed.current.ArrowRight || pressed.current.KeyD) panX -= 1

    if (panX === 0 && panY === 0) return

    const distance = controls.target.distanceTo(controls.object.position)
    const scaledSpeed = PAN_SPEED * delta * Math.max(distance / 50, MIN_DISTANCE_FACTOR)

    controls.pan(panX * scaledSpeed, panY * scaledSpeed)
    controls.update()
  })

  return null
}
