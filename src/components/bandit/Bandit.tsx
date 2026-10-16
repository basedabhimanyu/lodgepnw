import type { CSSProperties } from 'react'
import { Figure, EdgePaws, banditColors as c, ink } from './Figure'
import type { FigureProps, Outfit } from './Figure'

export type Pose =
  | 'stand' | 'hop' | 'perch' | 'thumbs' | 'peek' | 'eyes' | 'head'
  | 'phone' | 'hammer' | 'wave' | 'lean' | 'stamp' | 'bust' | 'sleep'

const FULL = '-4 12 214 244'

const poses: Record<Exclude<Pose, 'sleep'>, { view: string; fig: FigureProps; paws?: number }> = {
  stand: { view: FULL, fig: {} },
  hop: { view: FULL, fig: { armL: 50, armR: -50, grin: true } },
  perch: { view: FULL, fig: { armL: 26, armR: -128, prop: 'sack', legs: 'sit' } },
  thumbs: { view: FULL, fig: { armL: 26, armR: -128, prop: 'thumb', legs: 'sit', grin: true } },
  peek: { view: '20 20 160 136', fig: { headOnly: true }, paws: 142 },
  eyes: { view: '22 22 156 106', fig: { headOnly: true }, paws: 124 },
  head: { view: '22 20 156 124', fig: { headOnly: true } },
  phone: { view: FULL, fig: { armR: -118, prop: 'phone', squint: true } },
  hammer: { view: FULL, fig: { armR: -136, prop: 'hammer', grin: true } },
  wave: { view: FULL, fig: { armR: -140, armL: 14, grin: true } },
  lean: { view: '-24 12 234 244', fig: { armL: 128, armR: -128, prop: 'thumb', tilt: -6, grin: true } },
  stamp: { view: FULL, fig: { armL: 22, armR: -130, prop: 'stamp' } },
  bust: { view: '14 14 172 172', fig: { legs: 'none', tail: false } },
}

type Props = { pose: Pose; outfit?: Outfit; className?: string; label?: string; style?: CSSProperties }

// A posed Bandit as a standalone, responsive SVG.
export function Bandit({ pose, outfit = 'vest', className = '', label, style }: Props) {
  if (pose === 'sleep') return <BanditSleep className={className} label={label} />
  const p = poses[pose]
  return (
    <svg
      viewBox={p.view}
      className={className}
      preserveAspectRatio="xMidYMax meet"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-bandit={pose}
      style={{ overflow: 'visible', ...style }}
    >
      <Figure {...p.fig} outfit={outfit} />
      {p.paws !== undefined && <EdgePaws y={p.paws} />}
    </svg>
  )
}

// Curled up asleep on the footer wordmark: body, then head resting on it, tail wrapped in front.
export function BanditSleep({ className = '', label }: { className?: string; label?: string }) {
  const tail = 'M58 100 C100 116 170 114 206 86'
  return (
    <svg viewBox="0 0 220 110" className={className} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} data-bandit="sleep" style={{ overflow: 'visible' }}>
      <path d="M60 104 C52 70 92 50 140 52 C182 54 210 70 206 104 Z" fill={c.ember} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
      <path d="M118 54 C112 72 112 90 116 104 M168 58 C162 76 162 92 166 104" fill="none" stroke="#B94E21" strokeWidth="2.5" />
      <rect x="128" y="66" width="16" height="10" rx="1.5" fill="#F6F1E7" stroke={ink} strokeWidth="2" />
      <g transform="translate(-14 4) scale(0.66) rotate(-8 100 100)">
        <Figure headOnly asleep />
      </g>
      <path d={tail} fill="none" stroke={ink} strokeWidth="24" strokeLinecap="round" />
      <path d={tail} fill="none" stroke={c.fur} strokeWidth="18" strokeLinecap="round" />
      <path d={tail} fill="none" stroke={c.mask} strokeWidth="18" strokeDasharray="10 13" />
      <circle cx="206" cy="86" r="9" fill={c.mask} />
      <g className="b-zzz" fill={c.lichen} fontFamily="Barlow Condensed, sans-serif" fontWeight="900">
        <text x="100" y="30" fontSize="20">z</text>
        <text x="116" y="16" fontSize="15">z</text>
        <text x="128" y="4" fontSize="11">z</text>
      </g>
    </svg>
  )
}
