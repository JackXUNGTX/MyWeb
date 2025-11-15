import { create } from 'zustand'

type SimulationState = {
  simulationTime: number
  timeScale: number
  isPaused: boolean
  selectedBodyId: string
  setTimeScale: (multiplier: number) => void
  togglePause: () => void
  advance: (deltaSeconds: number) => void
  resetTime: () => void
  selectBody: (id: string) => void
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  simulationTime: 0,
  timeScale: 400,
  isPaused: false,
  selectedBodyId: 'earth',
  setTimeScale: (multiplier) => set({ timeScale: multiplier }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  advance: (deltaSeconds) => {
    const { isPaused, timeScale } = get()
    if (isPaused) return
    set((state) => ({
      simulationTime: state.simulationTime + deltaSeconds * timeScale,
    }))
  },
  resetTime: () => set({ simulationTime: 0 }),
  selectBody: (id) => set({ selectedBodyId: id }),
}))
