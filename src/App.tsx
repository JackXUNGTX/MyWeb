import './App.css'
import { SolarSystemCanvas } from './components/canvas/SolarSystemCanvas'
import { ControlDock } from './components/panels/ControlDock'
import { InfoPanel } from './components/panels/InfoPanel'

function App() {
  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">SOL • SYSTEM</p>
          <h1>沉浸式 3D 太阳系观赏</h1>
          <p className="lead">
            浏览实时运行的轨道、了解每颗行星的故事，并通过时间轴穿梭至不同阶段，感受太阳系的宏伟秩序。
          </p>
        </div>
      </header>

      <main className="layout">
        <section className="canvas-section">
          <SolarSystemCanvas />
          <ControlDock />
        </section>
        <InfoPanel />
      </main>
    </div>
  )
}

export default App
