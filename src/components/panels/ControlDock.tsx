import { useMemo } from 'react'
import { TIME_SCALE_MAX, TIME_SCALE_MIN } from '../../constants/space'
import { useSimulationStore } from '../../store/useSimulationStore'

const SPEED_SLIDER_MIN = 0
const SPEED_SLIDER_MAX = 100

const SLIDER_RANGE = SPEED_SLIDER_MAX - SPEED_SLIDER_MIN

const sliderToTimeScale = (value: number) => {
  const ratio = (value - SPEED_SLIDER_MIN) / SLIDER_RANGE
  const normalized = Math.min(Math.max(ratio, 0), 1)
  const span = TIME_SCALE_MAX / TIME_SCALE_MIN
  return Math.round(TIME_SCALE_MIN * Math.pow(span, normalized))
}

const timeScaleToSlider = (timeScale: number) => {
  const clamped = Math.max(TIME_SCALE_MIN, Math.min(TIME_SCALE_MAX, timeScale))
  const span = Math.log(TIME_SCALE_MAX / TIME_SCALE_MIN)
  const normalized = Math.log(clamped / TIME_SCALE_MIN) / span
  const clampedNormalized = Math.min(Math.max(normalized, 0), 1)
  return clampedNormalized * SLIDER_RANGE + SPEED_SLIDER_MIN
}

const formatTimeScale = (value: number) => {
  if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}亿`
  if (value >= 10_000) return `${(value / 10_000).toFixed(1)}万`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}千`
  return value.toFixed(0)
}

export const ControlDock = () => {
  const timeScale = useSimulationStore((state) => state.timeScale)
  const isPaused = useSimulationStore((state) => state.isPaused)
  const setTimeScale = useSimulationStore((state) => state.setTimeScale)
  const togglePause = useSimulationStore((state) => state.togglePause)
  const resetTime = useSimulationStore((state) => state.resetTime)
  const sliderValue = useMemo(() => timeScaleToSlider(timeScale), [timeScale])
  const formattedScale = useMemo(() => formatTimeScale(timeScale), [timeScale])
  const daysPerSecond = useMemo(() => timeScale / 86_400, [timeScale])

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
        <span className="label">
          时间倍率：{formattedScale}x
          <span className="sub-label">（≈ {daysPerSecond.toFixed(1)} 天/秒）</span>
        </span>
        <input
          type="range"
          min={SPEED_SLIDER_MIN}
          max={SPEED_SLIDER_MAX}
          step={1}
          value={sliderValue}
          onChange={(event) => setTimeScale(sliderToTimeScale(Number(event.target.value)))}
        />
      </label>
    </div>
  )
}
