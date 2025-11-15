import { useSimulationStore } from '../../store/useSimulationStore'

export const ControlDock = () => {
  const timeScale = useSimulationStore((state) => state.timeScale)
  const isPaused = useSimulationStore((state) => state.isPaused)
  const setTimeScale = useSimulationStore((state) => state.setTimeScale)
  const togglePause = useSimulationStore((state) => state.togglePause)
  const resetTime = useSimulationStore((state) => state.resetTime)

  return (
    <div className="control-dock glass-panel">
      <div className="control-group">
        <span className="label">时间控制</span>
        <div className="buttons">
          <button type="button" onClick={togglePause}>
            {isPaused ? '播放' : '暂停'}
          </button>
          <button type="button" onClick={resetTime}>
            重置
          </button>
        </div>
      </div>

      <label className="control-group">
        <span className="label">时间倍率：{timeScale.toFixed(0)}x</span>
        <input
          type="range"
          min={10}
          max={2000}
          step={10}
          value={timeScale}
          onChange={(event) => setTimeScale(Number(event.target.value))}
        />
      </label>
    </div>
  )
}
