import { bodyMap } from '../../data/bodies'
import { useSimulationStore } from '../../store/useSimulationStore'

export const InfoPanel = () => {
  const selectedBodyId = useSimulationStore((state) => state.selectedBodyId)
  const body = bodyMap[selectedBodyId] ?? bodyMap.sun

  return (
    <aside className="info-panel glass-panel">
      <p className="eyebrow">探索对象</p>
      <h2>{body.name}</h2>
      <p className="description">{body.description}</p>
      <div className="facts-grid">
        <div>
          <span className="fact-label">半径</span>
          <span className="fact-value">{body.radiusKm.toLocaleString()} km</span>
        </div>
        {body.orbit && (
          <>
            <div>
              <span className="fact-label">轨道周期</span>
              <span className="fact-value">{body.orbit.orbitalPeriodDays.toLocaleString()} 天</span>
            </div>
            <div>
              <span className="fact-label">轨道半长轴</span>
              <span className="fact-value">
                {(body.orbit.semiMajorAxisKm / 1_000_000).toFixed(2)} 百万 km
              </span>
            </div>
          </>
        )}
        <div>
          <span className="fact-label">自转周期</span>
          <span className="fact-value">{body.rotationPeriodHours} 小时</span>
        </div>
      </div>

      <div className="facts-list">
        {body.keyFacts.map((fact) => (
          <p key={fact} className="fact-item">
            {fact}
          </p>
        ))}
      </div>
    </aside>
  )
}
