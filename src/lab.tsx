// Dev-only page for reviewing Bandit's poses and scenes: http://localhost:5173/lab.html
import { createRoot } from 'react-dom/client'
import '@fontsource/barlow-condensed/latin-900.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './styles/index.css'
import { Bandit, type Pose } from './components/bandit/Bandit'
import type { Outfit } from './components/bandit/Figure'
import { Scene } from './components/bandit/Scenes'

const poses: Pose[] = ['stand', 'hop', 'perch', 'thumbs', 'peek', 'eyes', 'head', 'phone', 'hammer', 'wave', 'lean', 'stamp', 'bust', 'sleep']
const outfits: Outfit[] = ['vest', 'fly', 'rain', 'apron', 'snow']

function Lab() {
  return (
    <div className="p-6">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 16 }}>
        {poses.map((p) => (
          <figure key={p} className="m-0 border-2 border-basalt bg-kraft p-2">
            <Bandit pose={p} style={{ height: 200, width: "100%", display: "block" }} />
            <figcaption className="label mt-1">{p}</figcaption>
          </figure>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, marginTop: 24 }}>
        {outfits.map((o) => (
          <figure key={o} className="m-0 border-2 border-basalt bg-fir p-2">
            <Bandit pose="stand" outfit={o} style={{ height: 260, width: "100%", display: "block" }} />
            <figcaption className="label mt-1 text-paper">{o}</figcaption>
          </figure>
        ))}
      </div>
      <div id="scenes" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 0.6fr 1fr", gap: 16, marginTop: 24, alignItems: "start" }}>
        <div style={{ aspectRatio: "480/300" }}><Scene id="desk" /></div>
        <div style={{ aspectRatio: "420/236" }}><Scene id="canoe" /></div>
        <div style={{ aspectRatio: "9/16" }}><Scene id="portrait" /></div>
        <div style={{ aspectRatio: "420/300" }}><Scene id="heist" /></div>
      </div>
    </div>
  )
}
createRoot(document.getElementById('lab')!).render(<Lab />)
