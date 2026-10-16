import { useId } from 'react'

// Bandit the raccoon, drawn as layered SVG on a 200 x 260 canvas (feet at y = 252).
// Animatable parts carry classes: b-lid (blink), b-arm-l / b-arm-r (pose), b-mouth-calm /
// b-mouth-grin (pocket face), b-sack (his loot sack), b-body (whole figure).

export type Outfit = 'vest' | 'fly' | 'rain' | 'apron' | 'snow'
export type Prop = 'sack' | 'phone' | 'hammer' | 'stamp' | 'card' | 'paddle' | 'thumb' | 'none'

export const ink = '#141A17'
const c = {
  fur: '#8F8A82',
  furDark: '#4B4742',
  mask: '#1E1D1B',
  cream: '#EFE6D2',
  amber: '#E3A532',
  fir: '#1F4D3A',
  firLight: '#2C6249',
  lichen: '#CFE36B',
  ember: '#E8642C',
  emberDark: '#B94E21',
  red: '#B23A2E',
  tan: '#C9A574',
  brown: '#6B4426',
  burlap: '#CDB27E',
  khaki: '#B5A577',
  slate: '#5E6A66',
  sunset: '#F2B33D',
}
const line = { stroke: ink, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export type FigureProps = {
  armL?: number // degrees; positive swings the paw outward
  armR?: number // degrees; negative swings the paw outward
  prop?: Prop
  propL?: Prop
  outfit?: Outfit
  squint?: boolean
  asleep?: boolean
  grin?: boolean
  legs?: 'stand' | 'sit' | 'none'
  tail?: boolean
  tilt?: number
  headOnly?: boolean
}

// The whole body as a <g>, so scenes can place it.
export function Figure({
  armL = 12,
  armR = -12,
  prop = 'none',
  propL = 'none',
  outfit = 'vest',
  squint = false,
  asleep = false,
  grin = false,
  legs = 'stand',
  tail = true,
  tilt = 0,
  headOnly = false,
}: FigureProps) {
  const uid = useId().replace(/:/g, '')
  const plaid = `url(#plaid-${uid})`
  const sleeve = outfit === 'rain' ? c.firLight : outfit === 'snow' ? c.ember : plaid
  return (
    <g className="b-body" transform={tilt ? `rotate(${tilt} 100 252)` : undefined}>
      <defs>
        <pattern id={`plaid-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={c.red} />
          <rect width="14" height="5" fill="#1A1A1A" opacity=".55" />
          <rect width="5" height="14" fill="#1A1A1A" opacity=".55" />
          <rect x="10" width="1.2" height="14" fill="#F0B3A5" opacity=".45" />
          <rect y="10" width="14" height="1.2" fill="#F0B3A5" opacity=".45" />
        </pattern>
        <clipPath id={`eyeL-${uid}`}>
          <circle cx="74" cy="96" r="9.5" />
        </clipPath>
        <clipPath id={`eyeR-${uid}`}>
          <circle cx="126" cy="96" r="9.5" />
        </clipPath>
      </defs>

      {!headOnly && (
        <>
          {tail && <Tail />}
          {legs !== 'none' && <Legs sit={legs === 'sit'} />}
          <Torso outfit={outfit} plaid={plaid} />
          {armL <= 95 && <Arm side="l" angle={armL} sleeve={sleeve} prop={propL} />}
          {armR >= -95 && <Arm side="r" angle={armR} sleeve={sleeve} prop={prop} />}
        </>
      )}
      <Head uid={uid} squint={squint} asleep={asleep} grin={grin} outfit={outfit} />
      {/* raised arms go in front of the head */}
      {!headOnly && armL > 95 && <Arm side="l" angle={armL} sleeve={sleeve} prop={propL} />}
      {!headOnly && armR < -95 && <Arm side="r" angle={armR} sleeve={sleeve} prop={prop} />}
    </g>
  )
}

function Tail() {
  const d = 'M126 204 C168 212 190 176 176 128'
  return (
    <g>
      <path d={d} fill="none" stroke={ink} strokeWidth="31" strokeLinecap="round" />
      <path d={d} fill="none" stroke={c.fur} strokeWidth="25" strokeLinecap="round" />
      <path d={d} fill="none" stroke={c.mask} strokeWidth="25" strokeDasharray="9 12" strokeDashoffset="-4" />
      <circle cx="176" cy="128" r="12.5" fill={c.mask} />
    </g>
  )
}

function Legs({ sit }: { sit: boolean }) {
  if (sit) {
    return (
      <g {...line}>
        <rect x="62" y="200" width="34" height="30" rx="12" fill={c.tan} />
        <rect x="104" y="200" width="34" height="30" rx="12" fill={c.tan} />
        <rect x="58" y="222" width="40" height="26" rx="11" fill={c.brown} />
        <rect x="102" y="222" width="40" height="26" rx="11" fill={c.brown} />
        <path d="M68 234h20M68 240h20M112 234h20M112 240h20" stroke={c.lichen} strokeWidth="2.5" />
      </g>
    )
  }
  return (
    <g {...line}>
      <rect x="66" y="206" width="29" height="32" rx="6" fill={c.tan} />
      <rect x="105" y="206" width="29" height="32" rx="6" fill={c.tan} />
      <path d="M60 252 v-10 a12 12 0 0 1 12 -12 h14 a10 10 0 0 1 10 10 v12 z" fill={c.brown} />
      <path d="M140 252 v-10 a12 12 0 0 0 -12 -12 h-14 a10 10 0 0 0 -10 10 v12 z" fill={c.brown} />
      <path d="M72 238l10 4M72 244l10-2M118 238l10 4M118 244l10-2" stroke={c.lichen} strokeWidth="2.5" />
    </g>
  )
}

function Torso({ outfit, plaid }: { outfit: Outfit; plaid: string }) {
  const body = 'M62 130 C55 150 51 182 56 212 L144 212 C149 182 145 150 138 130 C124 121 76 121 62 130 Z'
  const left = 'M62 130 C55 150 51 182 56 212 L89 212 L92 128 C80 125 70 126 62 130 Z'
  const right = 'M138 130 C145 150 149 182 144 212 L111 212 L108 128 C120 125 130 126 138 130 Z'
  const full = outfit === 'rain' ? c.firLight : outfit === 'snow' ? c.ember : plaid
  return (
    <g {...line}>
      <path d={body} fill={full} />
      {outfit === 'vest' && (
        <>
          <path d={left} fill={c.ember} />
          <path d={right} fill={c.ember} />
          <rect x="66" y="150" width="19" height="11" rx="1.5" fill="#F6F1E7" strokeWidth="2" />
          <path d="M66 182h20M114 182h20" stroke={c.emberDark} strokeWidth="2" />
        </>
      )}
      {outfit === 'fly' && (
        <>
          <path d={left} fill={c.khaki} />
          <path d={right} fill={c.khaki} />
          <rect x="64" y="150" width="20" height="16" rx="2" fill={c.tan} strokeWidth="2" />
          <rect x="116" y="150" width="20" height="16" rx="2" fill={c.tan} strokeWidth="2" />
          <rect x="64" y="176" width="20" height="16" rx="2" fill={c.tan} strokeWidth="2" />
          <rect x="116" y="176" width="20" height="16" rx="2" fill={c.tan} strokeWidth="2" />
          <circle cx="126" cy="140" r="3.5" fill={c.lichen} strokeWidth="2" />
        </>
      )}
      {outfit === 'rain' && (
        <>
          <path d="M100 126 V212" strokeWidth="2.5" />
          <path d="M78 126 L100 142 L122 126" fill={c.fir} />
          <rect x="66" y="176" width="22" height="5" rx="2" fill={c.fir} strokeWidth="2" />
          <rect x="112" y="176" width="22" height="5" rx="2" fill={c.fir} strokeWidth="2" />
        </>
      )}
      {outfit === 'apron' && (
        <>
          <path d="M72 148 H128 L130 212 H70 Z" fill="#F6F1E7" />
          <path d="M76 148 L86 126 M124 148 L114 126" strokeWidth="3" fill="none" />
          <rect x="86" y="174" width="28" height="18" rx="2" fill={c.cream} strokeWidth="2" />
          <path d="M70 168 C60 168 56 172 54 178" fill="none" strokeWidth="2.5" />
        </>
      )}
      {outfit === 'snow' && (
        <>
          <path d="M58 150 H142 M55 172 H145 M56 194 H144" stroke={c.emberDark} strokeWidth="2.5" />
          <path d="M100 126 V212" strokeWidth="2.5" />
          <path d="M80 124 C88 134 112 134 120 124" fill={c.ember} />
        </>
      )}
      <rect x="54" y="203" width="92" height="10" rx="2" fill={c.brown} />
      <rect x="93" y="203" width="14" height="10" rx="1" fill={c.lichen} strokeWidth="2" />
    </g>
  )
}

function Arm({ side, angle, sleeve, prop }: { side: 'l' | 'r'; angle: number; sleeve: string; prop: Prop }) {
  const sx = side === 'l' ? 62 : 138
  const sy = 140
  return (
    <g className={`b-arm-${side}`} data-origin={`${sx} ${sy}`} transform={`rotate(${angle} ${sx} ${sy})`}>
      <rect x={sx - 12} y={sy - 8} width="24" height="52" rx="11" fill={sleeve} {...line} />
      <g transform={`translate(${sx} ${sy + 52})`}>
        <ellipse cx="0" cy="0" rx="12.5" ry="11.5" fill={c.furDark} {...line} />
        <path d="M-5 -4v7M0 -5v8M5 -4v7" stroke={c.mask} strokeWidth="1.6" strokeLinecap="round" />
        <g transform={`rotate(${-angle})`}>
          <PropArt prop={prop} side={side} />
        </g>
      </g>
    </g>
  )
}

export function PropArt({ prop, side = 'r' }: { prop: Prop; side?: 'l' | 'r' }) {
  switch (prop) {
    case 'sack':
      return (
        <g className="b-sack">
          <SackShape />
        </g>
      )
    case 'phone':
      return (
        <g {...line} strokeWidth="2.5">
          <rect x="-11" y="-38" width="22" height="34" rx="4" fill={ink} />
          <rect x="-7" y="-33" width="14" height="22" rx="1.5" fill={c.lichen} strokeWidth="0" />
          <path d="M-4 -26h8M-4 -21h6M-4 -16h8" stroke={c.fir} strokeWidth="1.8" />
        </g>
      )
    case 'hammer':
      return (
        <g {...line} strokeWidth="2.5">
          <rect x="-3.5" y="-46" width="7" height="50" rx="2" fill={c.brown} />
          <path d="M-18 -56 H14 a6 6 0 0 1 6 6 v4 H-18 Z" fill={c.slate} />
        </g>
      )
    case 'stamp':
      return (
        <g {...line} strokeWidth="2.5">
          <circle cx="0" cy="-44" r="8" fill={c.brown} />
          <rect x="-4.5" y="-37" width="9" height="16" fill={c.brown} />
          <rect x="-20" y="-22" width="40" height="13" rx="2" fill={c.brown} />
          <rect x="-20" y="-9" width="40" height="6" fill={c.ember} />
        </g>
      )
    case 'card':
      return (
        <g {...line} strokeWidth="2.2" transform={`translate(${side === 'l' ? -10 : 10} -6)`}>
          <rect x="-14" y="-10" width="28" height="19" rx="2.5" fill={c.lichen} />
          <rect x="-14" y="-5" width="28" height="4" fill={ink} strokeWidth="0" />
          <path d="M-9 4h10" stroke={ink} strokeWidth="1.8" />
        </g>
      )
    case 'paddle':
      return (
        <g {...line} strokeWidth="2.5">
          <rect x="-3" y="-60" width="6" height="96" rx="3" fill={c.brown} />
          <path d="M-10 34 h20 v26 a10 12 0 0 1 -20 0 z" fill={c.tan} />
        </g>
      )
    case 'thumb':
      return <rect x="-4" y="-22" width="8" height="15" rx="4" fill={c.furDark} {...line} strokeWidth="2.5" />
    default:
      return null
  }
}

// Burlap loot sack, hanging from the paw (neck at 0,0). Also used by the throw overlay.
export function SackShape({ full = false }: { full?: boolean }) {
  const s = full ? 1.35 : 1.18
  return (
    <g {...line} strokeWidth="2.6" transform={`scale(${s})`}>
      <path d="M-6 2 L6 2 L8 9 C27 14 30 44 0 47 C-30 44 -27 14 -8 9 Z" fill={c.burlap} />
      <path d="M-8 9 C-4 11 4 11 8 9" fill="none" stroke={c.lichen} strokeWidth="3.4" />
      <path d="M-10 24 l4 4 M8 30 l4 -3 M-2 38 l3 3" stroke="#A88E5C" strokeWidth="2" />
      <path d="M-4 0 C-8 -6 -2 -10 2 -6" fill="none" strokeWidth="2.4" />
    </g>
  )
}

function Head({ uid, squint, asleep, grin, outfit }: { uid: string; squint: boolean; asleep: boolean; grin: boolean; outfit: Outfit }) {
  const lidH = asleep ? 20 : squint ? 12.5 : 8.5
  return (
    <g>
      {/* ears */}
      <g {...line}>
        <path d="M54 68 L42 32 L78 52 Z" fill={c.furDark} />
        <path d="M56 58 L48 40 L68 51 Z" fill={c.cream} strokeWidth="0" />
        <path d="M146 68 L158 32 L122 52 Z" fill={c.furDark} />
        <path d="M144 58 L152 40 L132 51 Z" fill={c.cream} strokeWidth="0" />
      </g>
      {/* fluffy head */}
      <path
        d="M48 66 C44 86 38 100 36 106 L26 111 L41 118 C56 132 80 138 100 138 C120 138 144 132 159 118 L174 111 L164 106 C162 100 156 86 152 66 C146 42 54 42 48 66 Z"
        fill={c.fur}
        {...line}
      />
      <ellipse cx="76" cy="77" rx="13" ry="5" fill={c.cream} transform="rotate(-10 76 77)" />
      <ellipse cx="124" cy="77" rx="13" ry="5" fill={c.cream} transform="rotate(10 124 77)" />
      {/* bandit mask */}
      <path
        d="M44 90 C50 78 70 80 88 90 L100 96 L112 90 C130 80 150 78 156 90 C158 100 150 112 136 112 C124 112 114 106 106 102 L100 108 L94 102 C86 106 76 112 64 112 C50 112 42 100 44 90 Z"
        fill={c.mask}
      />
      {/* eyes with heavy lids */}
      {(['L', 'R'] as const).map((s) => {
        const cx = s === 'L' ? 74 : 126
        return (
          <g key={s}>
            <circle cx={cx} cy="96" r="9.5" fill={c.amber} stroke={ink} strokeWidth="2" />
            <circle cx={cx + 1} cy="97.5" r="4.6" fill={ink} />
            <circle cx={cx - 2.4} cy="93.5" r="1.7" fill="#fff" />
            <g clipPath={`url(#eye${s}-${uid})`}>
              <rect className="b-lid" x={cx - 11} y="86" width="22" height={lidH} fill={c.mask} style={{ transformBox: 'fill-box', transformOrigin: '50% 0%' }} />
            </g>
            <path d={`M${cx - 9.5} ${86 + lidH} Q${cx} ${88 + lidH} ${cx + 9.5} ${86 + lidH}`} fill="none" stroke={c.fur} strokeWidth="1.6" className="b-lidline" />
          </g>
        )
      })}
      {/* muzzle, nose, mouth */}
      <path d="M78 108 C78 98 90 96 100 98 C110 96 122 98 122 108 C122 126 112 134 100 134 C88 134 78 126 78 108 Z" fill={c.cream} {...line} strokeWidth="2.4" />
      <path d="M92 104 Q100 100 108 104 Q106 112 100 113 Q94 112 92 104 Z" fill={ink} />
      <g className="b-mouth-calm" style={{ opacity: grin ? 0 : 1 }}>
        <path d="M100 113 V118 M92 121 Q100 125 110 117" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g className="b-mouth-grin" style={{ opacity: grin ? 1 : 0 }}>
        <path d="M100 113 V117 M89 118 Q100 132 113 116 Q101 123 89 118 Z" fill={ink} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <circle cx="86" cy="116" r="1.2" fill={c.furDark} />
      <circle cx="114" cy="116" r="1.2" fill={c.furDark} />
      {/* beanie */}
      <g {...line}>
        <path d="M52 62 C52 18 148 18 148 62 Z" fill={c.fir} />
        <path d="M76 30 C80 42 80 52 78 60 M100 24 V60 M124 30 C120 42 120 52 122 60" fill="none" stroke={c.firLight} strokeWidth="2" />
        <rect x="47" y="53" width="106" height="19" rx="6" fill={c.firLight} />
        <path d="M57 56v13M65 56v13M73 56v13M81 56v13M89 56v13M97 56v13M105 56v13M113 56v13M121 56v13M129 56v13M137 56v13M145 56v13" stroke={c.fir} strokeWidth="2" />
        <rect x="118" y="57" width="15" height="10" rx="1.5" fill={c.lichen} strokeWidth="2" />
        {outfit === 'snow' && (
          <g>
            <rect x="60" y="42" width="80" height="6" fill={ink} strokeWidth="0" />
            <rect x="66" y="34" width="30" height="20" rx="9" fill={c.lichen} />
            <rect x="104" y="34" width="30" height="20" rx="9" fill={c.lichen} />
            <path d="M72 40 l8 -3 M110 40 l8 -3" stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </g>
    </g>
  )
}

// Two paws gripping an edge, for peeking poses.
export function EdgePaws({ y = 140 }: { y?: number }) {
  return (
    <g {...line}>
      {[68, 132].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx="15" ry="10" fill={c.furDark} />
          <path d={`M${x - 7} ${y - 2}v6M${x} ${y - 3}v7M${x + 7} ${y - 2}v6`} stroke={c.mask} strokeWidth="1.8" />
        </g>
      ))}
    </g>
  )
}

export const banditColors = c
