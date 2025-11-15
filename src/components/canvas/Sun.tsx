import { RADIUS_SCALE } from '../../constants/space'
import { useSimulationStore } from '../../store/useSimulationStore'
import { bodyMap } from '../../data/bodies'

export const Sun = () => {
  const selectBody = useSimulationStore((state) => state.selectBody)
  const sun = bodyMap.sun
  const sunRadius = sun.radiusKm * RADIUS_SCALE

  return (
    <mesh
      onClick={() => selectBody('sun')}
      onPointerOver={() => document.body.classList.add('show-pointer')}
      onPointerOut={() => document.body.classList.remove('show-pointer')}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[sunRadius, 64, 64]} />
      <meshBasicMaterial color={sun.color} toneMapped={false} />
    </mesh>
  )
}
