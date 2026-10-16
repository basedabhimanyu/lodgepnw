import { useId, useState } from 'react'
import { destinations } from '../config/destinations'
import { MascotSlot } from '../components/MascotSlot'

const AIRBNB_FEE = 0.155
const CARD_FEE = 0.03

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`

export function TheMath() {
  const [revenue, setRevenue] = useState(120000)
  const [share, setShare] = useState(15)
  const uid = useId()
  const moved = revenue * (share / 100)
  const kept = moved * (AIRBNB_FEE - CARD_FEE)

  return (
    <section id="math" aria-labelledby={`${uid}-h`} className="dark-band on-dark border-y-2 border-basalt py-20 md:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="label m-0 text-lichen">The math</p>
          <h2 id={`${uid}-h`} className="mt-3 text-[clamp(40px,6vw,76px)]">
            What the 15.5% <span className="text-ember">costs you</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-paper/80">
            Airbnb's host-only fee went to 15.5% in late 2025. Move a slice of that revenue to your own site and keep the
            difference, minus about 3% for card processing.
          </p>

          <div className="mt-10 grid gap-8">
            <Slider
              id={`${uid}-rev`}
              label="Yearly booking revenue"
              value={usd(revenue)}
              min={20000}
              max={600000}
              step={5000}
              raw={revenue}
              onChange={setRevenue}
            />
            <Slider
              id={`${uid}-share`}
              label="Share moved to direct"
              value={`${share}%`}
              min={5}
              max={50}
              step={1}
              raw={share}
              onChange={setShare}
            />
          </div>

          <div className="mt-10">
            <p className="label m-0 mb-3 text-paper/70">Fees you keep per year</p>
            <SplitFlap value={usd(kept)} />
            <p className="label m-0 mt-4 text-paper/60">
              {usd(moved)} booked direct × (15.5% − 3%) · an estimate, not a promise
            </p>
          </div>
        </div>

        <div className="grid gap-8">
          <PnwMap />
          <div className="card overflow-hidden border-paper bg-basalt" style={{ boxShadow: '4px 4px 0 0 #CFE36B' }}>
            <div className="label flex justify-between border-b-2 border-paper/20 bg-fir px-3 py-2 text-paper">
              <span>● On the water</span>
              <span className="text-lichen">Lake Chelan</span>
            </div>
            <div className="aspect-[420/236]">
              <MascotSlot id="math-canoe" fill />
            </div>
          </div>
        </div>
      </div>
      <p className="wrap m-0 mt-16 text-center font-display text-[clamp(26px,4.4vw,56px)] font-black uppercase leading-none tracking-tight text-lichen">
        30 destinations · 1 crew · 0% commission
      </p>
    </section>
  )
}

function Slider(props: {
  id: string
  label: string
  value: string
  min: number
  max: number
  step: number
  raw: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={props.id} className="label text-paper/80">
          {props.label}
        </label>
        <output htmlFor={props.id} className="font-mono text-xl font-bold text-lichen">
          {props.value}
        </output>
      </div>
      <input
        id={props.id}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.raw}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="mt-3 h-3 w-full cursor-pointer accent-[#CFE36B]"
      />
    </div>
  )
}

// Each character is its own tile; a changed character remounts and flips.
export function SplitFlap({ value }: { value: string }) {
  const chars = value.split('')
  return (
    <div className="flex gap-1 sm:gap-1.5" role="img" aria-label={value}>
      {chars.map((c, i) => (
        <span
          key={`${i}-${c}`}
          className="flap relative grid h-[52px] w-[30px] place-items-center border-2 border-basalt bg-[#202823] font-display text-[38px] font-black leading-none text-paper shadow-[2px_2px_0_0_#000] sm:h-[72px] sm:w-[46px] sm:text-[54px]"
          aria-hidden="true"
        >
          {c === ' ' ? '' : c}
          <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-basalt" />
        </span>
      ))}
    </div>
  )
}

// Simple equirectangular PNW map with one dot per destination.
const LON0 = -124.9, LON1 = -115.6, LAT0 = 42, LAT1 = 49.2
const W = 400
const K = Math.cos((46 * Math.PI) / 180)
const H = Math.round((W * (LAT1 - LAT0)) / ((LON1 - LON0) * K))
const px = (lon: number) => ((lon - LON0) / (LON1 - LON0)) * W
const py = (lat: number) => ((LAT1 - lat) / (LAT1 - LAT0)) * H
const poly = (pts: [number, number][]) => pts.map(([lon, lat]) => `${px(lon).toFixed(1)},${py(lat).toFixed(1)}`).join(' ')

const WA: [number, number][] = [
  [-124.73, 48.38], [-123.2, 48.15], [-122.75, 49.0], [-117.03, 49.0], [-117.03, 46.42], [-116.92, 46.0],
  [-119.0, 46.0], [-119.6, 45.92], [-121.2, 45.65], [-122.0, 45.6], [-122.75, 45.65], [-123.0, 46.1],
  [-123.9, 46.25], [-124.05, 46.3], [-124.1, 46.9], [-124.2, 47.4], [-124.6, 47.9],
]
const OR: [number, number][] = [
  [-123.95, 46.2], [-123.0, 46.1], [-122.75, 45.65], [-122.0, 45.6], [-121.2, 45.65], [-119.6, 45.92],
  [-119.0, 46.0], [-116.92, 46.0], [-116.46, 45.6], [-116.9, 44.9], [-117.2, 44.3], [-117.03, 44.0],
  [-117.03, 42.0], [-124.2, 42.0], [-124.4, 42.8], [-124.1, 43.7], [-124.0, 44.8], [-123.95, 45.9],
]
const ID: [number, number][] = [
  [-117.03, 49.0], [-116.05, 49.0], [-116.05, 48.0], [-115.6, 47.4], [-115.6, 42.0], [-117.03, 42.0],
  [-117.03, 44.0], [-117.2, 44.3], [-116.9, 44.9], [-116.46, 45.6], [-116.92, 46.0], [-117.03, 46.42],
]

function PnwMap() {
  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Map of 30 destinations across Washington, Oregon and North Idaho">
        <g fill="#1F4D3A" stroke="#CFE36B" strokeOpacity=".5" strokeWidth="1.5">
          <polygon points={poly(WA)} />
          <polygon points={poly(OR)} />
          <polygon points={poly(ID)} />
        </g>
        <g fill="#F6F1E7" fillOpacity=".35" fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="700">
          <text x={px(-118.9)} y={py(46.6)}>WA</text>
          <text x={px(-119.8)} y={py(43.1)}>OR</text>
          <text x={px(-116.0)} y={py(44.4)}>ID</text>
        </g>
        {destinations.map((d) => (
          <g key={d.name} data-map-dot>
            <rect x={px(d.lon) - 4} y={py(d.lat) - 4} width="8" height="8" fill="#E8642C" stroke="#141A17" strokeWidth="1.5">
              <title>{d.name}</title>
            </rect>
          </g>
        ))}
      </svg>
      <figcaption className="label mt-3 text-paper/60">Washington · Oregon · North Idaho · all work done remotely</figcaption>
    </figure>
  )
}
