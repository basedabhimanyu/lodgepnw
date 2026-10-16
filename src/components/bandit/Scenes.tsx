import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Figure, SackShape, banditColors as c, ink } from './Figure'
import type { Outfit } from './Figure'
import { prefersReducedMotion } from '../../lib/reducedMotion'

// Animated scenes that stand in for Bandit's video spots. Each loops only while on screen
// and stays still for visitors who prefer less motion.

export type SceneId = 'desk' | 'canoe' | 'portrait' | 'heist'

export function Scene({ id, outfit }: { id: SceneId; outfit?: Outfit }) {
  if (id === 'desk') return <DeskScene />
  if (id === 'canoe') return <CanoeScene />
  if (id === 'portrait') return <PortraitScene outfit={outfit} />
  return <HeistScene />
}

type Build = (root: SVGSVGElement, q: (s: string) => Element[]) => gsap.core.Timeline | gsap.core.Timeline[] | void

function useSceneLoop(build: Build) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const q = (s: string) => Array.from(root.querySelectorAll(s))
      const made = build(root, q)
      const tls = (Array.isArray(made) ? made : made ? [made] : []) as gsap.core.Timeline[]
      tls.forEach((t) => t.pause())
      const io = new IntersectionObserver(([e]) => tls.forEach((t) => (e.isIntersecting ? t.play() : t.pause())))
      io.observe(root)
      return () => io.disconnect()
    }, root)
    return () => ctx.revert()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return ref
}

const blink = (lids: Element[]) =>
  gsap.timeline({ repeat: -1, repeatDelay: 2.6 }).to(lids, { scaleY: 2.4, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.inOut' })

// Quadratic arc from a to b, lifted by `lift`, for thrown things.
function arc(tl: gsap.core.Timeline, el: Element, a: P, b: P, lift: number, duration: number, at?: gsap.Position) {
  const ctrl = { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - lift }
  const t = { v: 0 }
  tl.to(
    t,
    {
      v: 1,
      duration,
      ease: 'power1.inOut',
      onStart: () => {
        t.v = 0
      },
      onUpdate: () => {
        const u = 1 - t.v
        gsap.set(el, {
          x: u * u * a.x + 2 * u * t.v * ctrl.x + t.v * t.v * b.x,
          y: u * u * a.y + 2 * u * t.v * ctrl.y + t.v * t.v * b.y,
          rotation: t.v * 300,
        })
      },
    },
    at,
  )
}
type P = { x: number; y: number }

const label = { fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, letterSpacing: '0.06em' } as const
const display = { fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900 } as const

function Pines({ y, n, x0 = 0, step = 26, h = 34, fill = ink }: { y: number; n: number; x0?: number; step?: number; h?: number; fill?: string }) {
  return (
    <g fill={fill}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * step
        const hh = h * (0.75 + ((i * 37) % 10) / 30)
        return <path key={i} d={`M${x} ${y} l${hh * 0.32} ${-hh} l${hh * 0.32} ${hh} z`} />
      })}
    </g>
  )
}

// Hero: Bandit at the lodge front desk hands a key card across. Bell. BOOKED DIRECT.
function DeskScene() {
  const ref = useSceneLoop((_, q) => {
    const arm = q('.desk-bandit .b-arm-l')[0]
    const heldCard = q('.desk-bandit .b-arm-l g g')[0]
    const card = q('.desk-card')[0]
    const bell = q('.desk-bell')[0]
    const ding = q('.desk-ding')[0]
    const receipt = q('.desk-receipt')[0]
    gsap.set(arm, { rotation: 12, svgOrigin: '62 140' })
    gsap.set([card, ding, receipt], { opacity: 0 })
    const main = gsap
      .timeline({ repeat: -1, repeatDelay: 0.6 })
      .set(heldCard, { opacity: 1 })
      .to(arm, { rotation: 78, svgOrigin: '62 140', duration: 0.35, ease: 'back.out(1.6)' }, 0.4)
      .set(heldCard, { opacity: 0 }, 0.8)
      .fromTo(card, { opacity: 1, x: 262, y: 168, rotation: -8 }, { x: 96, y: 176, rotation: 4, duration: 0.55, ease: 'power3.out' }, 0.8)
      .to(arm, { rotation: 12, svgOrigin: '62 140', duration: 0.4, ease: 'power2.inOut' }, 1.0)
      .to(bell, { rotation: 14, svgOrigin: '214 196', duration: 0.06, yoyo: true, repeat: 5 }, 1.5)
      .fromTo(ding, { opacity: 1, scale: 0.4, svgOrigin: '226 150' }, { scale: 1, duration: 0.2, ease: 'back.out(3)' }, 1.5)
      .to(ding, { opacity: 0, y: -10, duration: 0.3 }, 2.0)
      .fromTo(receipt, { opacity: 1, scale: 0, svgOrigin: '110 120' }, { scale: 1, duration: 0.35, ease: 'back.out(2.2)' }, 1.7)
      .to([receipt, card], { opacity: 0, duration: 0.25 }, 4.2)
      .set(ding, { y: 0 })
    return [main, blink(q('.desk-bandit .b-lid'))]
  })
  return (
    <svg ref={ref} viewBox="0 0 480 300" className="block h-full w-full" role="img" aria-label="Bandit at the lodge front desk hands a guest a key card. Booked direct, 0% fee.">
      <rect width="480" height="300" fill={c.cream} />
      <path d="M0 0H480" stroke="#D8CBB0" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${i * 40 + 20} 0V196`} stroke="#DCCFB2" strokeWidth="2" />
      ))}
      {/* window onto the mountains */}
      <g>
        <rect x="30" y="26" width="176" height="130" fill="#F4D9A0" />
        <circle cx="160" cy="66" r="17" fill={c.ember} opacity=".85" />
        <path d="M30 120 L72 72 L102 104 L136 64 L182 112 L206 96 V156 H30 Z" fill={c.slate} />
        <path d="M30 136 L62 112 L96 132 L140 104 L206 134 V156 H30 Z" fill={c.fir} />
        <Pines y={156} n={8} x0={34} step={22} h={26} />
        <rect x="30" y="26" width="176" height="130" fill="none" stroke={ink} strokeWidth="5" />
        <path d="M118 26V156M30 91H206" stroke={ink} strokeWidth="4" />
      </g>
      {/* routed wood sign */}
      <g>
        <rect x="246" y="22" width="206" height="36" fill={c.brown} stroke={ink} strokeWidth="3" />
        <text x="349" y="48" textAnchor="middle" fontSize="22" fill={c.cream} style={display} letterSpacing="2">
          FRONT DESK
        </text>
      </g>
      {/* Bandit behind the desk */}
      <g className="desk-bandit" transform="translate(250 36) scale(0.94)">
        <Figure propL="card" />
      </g>
      {/* desk */}
      <rect x="0" y="198" width="480" height="102" fill={c.fir} stroke={ink} strokeWidth="3" />
      <path d="M40 216V300M160 216V300M280 216V300M400 216V300" stroke={c.firLight} strokeWidth="3" />
      <rect x="-4" y="188" width="488" height="16" fill="#A9794A" stroke={ink} strokeWidth="3" />
      {/* bell */}
      <g className="desk-bell">
        <path d="M198 188 C198 170 230 170 230 188 Z" fill={c.sunset} stroke={ink} strokeWidth="3" />
        <rect x="194" y="186" width="40" height="5" fill={c.slate} stroke={ink} strokeWidth="2" />
        <circle cx="214" cy="168" r="3.5" fill={ink} />
      </g>
      <text className="desk-ding" x="226" y="152" fontSize="20" fill={c.ember} style={display}>
        DING!
      </text>
      {/* the key card that slides across */}
      <g className="desk-card">
        <rect x="-16" y="-11" width="32" height="21" rx="3" fill={c.lichen} stroke={ink} strokeWidth="2.5" />
        <rect x="-16" y="-5" width="32" height="5" fill={ink} />
      </g>
      {/* receipt */}
      <g className="desk-receipt">
        <rect x="34" y="96" width="160" height="50" fill="#F6F1E7" stroke={ink} strokeWidth="3" />
        <rect x="38" y="100" width="160" height="50" fill="none" stroke={ink} strokeWidth="0" />
        <text x="114" y="118" textAnchor="middle" fontSize="15" fill={c.fir} style={display} letterSpacing="1">
          BOOKED DIRECT
        </text>
        <text x="114" y="136" textAnchor="middle" fontSize="10" fill={ink} style={label}>
          0% OTA FEE · LP-0417
        </text>
      </g>
    </svg>
  )
}

// The math band: Bandit paddling across a lake.
function CanoeScene() {
  const ref = useSceneLoop((_, q) => {
    const boat = q('.canoe-boat')[0]
    const arm = q('.canoe-bandit .b-arm-l')[0]
    const ripples = q('.canoe-ripples')[0]
    gsap.set(arm, { rotation: 20, svgOrigin: '62 140' })
    return [
      gsap.timeline({ repeat: -1, yoyo: true }).to(boat, { y: 3, rotation: 1.4, svgOrigin: '210 190', duration: 1.1, ease: 'sine.inOut' }),
      gsap.timeline({ repeat: -1, yoyo: true }).to(arm, { rotation: -26, svgOrigin: '62 140', duration: 0.9, ease: 'sine.inOut' }),
      gsap.timeline({ repeat: -1 }).fromTo(ripples, { x: 0 }, { x: -60, duration: 2.4, ease: 'none' }),
      blink(q('.canoe-bandit .b-lid')),
    ]
  })
  return (
    <svg ref={ref} viewBox="0 0 420 236" className="block h-full w-full" role="img" aria-label="Bandit paddling a canoe across Lake Chelan">
      <rect width="420" height="236" fill="#F4D9A0" />
      <circle cx="324" cy="64" r="26" fill={c.ember} opacity=".9" />
      <path d="M0 140 L60 82 L104 118 L160 60 L222 124 L270 92 L330 134 L380 98 L420 120 V160 H0 Z" fill={c.slate} />
      <path d="M0 150 L70 116 L130 146 L200 112 L280 150 L350 120 L420 146 V164 H0 Z" fill={c.fir} />
      <Pines y={162} n={20} x0={-6} step={22} h={30} />
      <rect y="160" width="420" height="76" fill="#17382B" />
      <g className="canoe-ripples" stroke={c.lichen} strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={`M${i * 60 + (i % 2) * 24} ${178 + (i % 3) * 18} h26`} />
        ))}
      </g>
      <g className="canoe-boat">
        <g className="canoe-bandit" transform="translate(140 26) scale(0.7)">
          <Figure legs="none" tail={false} propL="paddle" armR={-24} />
        </g>
        <path d="M96 176 C140 204 280 204 324 176 L316 168 C270 182 150 182 104 168 Z" fill={c.ember} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <path d="M100 172 C150 186 270 186 320 172" fill="none" stroke="#B94E21" strokeWidth="3" />
        <path d="M120 176 C160 192 260 192 300 176" fill="none" stroke={ink} strokeWidth="2" opacity=".35" />
      </g>
    </svg>
  )
}

// Meet Bandit: full-length portrait, 9:16. Idles, blinks, tosses his sack.
function PortraitScene({ outfit = 'vest' }: { outfit?: Outfit }) {
  const ref = useSceneLoop((_, q) => {
    const body = q('.portrait-bandit .b-body')[0]
    const sack = q('.portrait-bandit .b-sack')[0]
    return [
      gsap.timeline({ repeat: -1, yoyo: true }).to(body, { scaleY: 1.015, svgOrigin: '100 252', duration: 1.4, ease: 'sine.inOut' }),
      gsap
        .timeline({ repeat: -1, repeatDelay: 2.8 })
        .to(sack, { y: -70, rotation: 200, duration: 0.42, ease: 'power2.out' })
        .to(sack, { y: 0, rotation: 360, duration: 0.38, ease: 'power2.in' })
        .set(sack, { rotation: 0 }),
      blink(q('.portrait-bandit .b-lid')),
    ]
  })
  return (
    <svg ref={ref} viewBox="0 0 300 533" className="block h-full w-full" role="img" aria-label={`Bandit the raccoon, head of guest recovery, in his ${outfitName[outfit]}`}>
      <rect width="300" height="533" fill={c.fir} />
      <g fill="none" stroke={c.lichen} strokeOpacity=".12" strokeWidth="1.5">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M-20 ${60 + i * 52} C60 ${30 + i * 52} 120 ${100 + i * 52} 200 ${60 + i * 52} S300 ${40 + i * 52} 340 ${70 + i * 52}`} />
        ))}
      </g>
      {/* trail sign */}
      <g>
        <rect x="34" y="64" width="10" height="120" fill={c.brown} stroke={ink} strokeWidth="3" />
        <path d="M18 70 H152 L168 86 L152 102 H18 Z" fill={c.brown} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <text x="86" y="93" textAnchor="middle" fontSize="18" fill={c.cream} style={display} letterSpacing="1.5">
          GUEST RECOVERY
        </text>
      </g>
      <ellipse cx="150" cy="458" rx="110" ry="16" fill={ink} opacity=".35" />
      <g className="portrait-bandit" transform="translate(30 150) scale(1.2)">
        <Figure outfit={outfit} armR={-128} prop="sack" />
      </g>
      <g>
        <rect x="30" y="482" width="240" height="30" fill={c.lichen} stroke={ink} strokeWidth="2.5" />
        <text x="150" y="502" textAnchor="middle" fontSize="11" fill={ink} style={label}>
          BANDIT · HEAD OF GUEST RECOVERY
        </text>
      </g>
    </svg>
  )
}
const outfitName: Record<Outfit, string> = { vest: 'fleece vest', fly: 'fly-fishing vest', rain: 'rain shell', apron: 'innkeeper apron', snow: 'snow gear' }

// Final call to action: Bandit bags a guest off the OTA fee tag and drops them at your own front door.
function HeistScene() {
  const ref = useSceneLoop((_, q) => {
    const arm = q('.heist-bandit .b-arm-r')[0]
    const held = q('.heist-bandit .b-sack')[0]
    const flyer = q('.heist-sack')[0]
    const guest = q('.heist-guest')[0]
    const tag = q('.heist-tag')[0]
    const door = q('.heist-door')[0]
    const arrived = q('.heist-arrived')[0]
    const grin = q('.heist-bandit .b-mouth-grin')[0]
    const calm = q('.heist-bandit .b-mouth-calm')[0]
    const paw = { x: 330, y: 154 }
    const onTag = { x: 92, y: 166 }
    const atDoor = { x: 214, y: 236 }
    gsap.set(arm, { rotation: -128, svgOrigin: '138 140' })
    gsap.set([flyer, arrived], { opacity: 0 })
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 })
    tl.to(arm, { rotation: -160, svgOrigin: '138 140', duration: 0.25, ease: 'power2.in' }, 0.5)
      .to(arm, { rotation: -95, svgOrigin: '138 140', duration: 0.14, ease: 'power4.out' })
      .set(held, { opacity: 0 })
      .set(flyer, { opacity: 1 })
    arc(tl, flyer, paw, onTag, 90, 0.45)
    tl.to(guest, { scale: 0, svgOrigin: '92 172', duration: 0.12 })
      .to(flyer, { scaleX: 0.8, scaleY: 1.15, duration: 0.08, yoyo: true, repeat: 1 })
      .to(tag, { rotation: 10, svgOrigin: '92 44', duration: 0.12, yoyo: true, repeat: 3, ease: 'sine.inOut' }, '<')
    arc(tl, flyer, onTag, atDoor, 60, 0.4)
    tl.to(door, { scaleX: 0.15, svgOrigin: '200 0', duration: 0.15 })
      .to(flyer, { scale: 0, duration: 0.12 })
      .fromTo(arrived, { opacity: 1, scale: 0.3, svgOrigin: '214 214' }, { scale: 1, duration: 0.3, ease: 'back.out(2.4)' })
      .to(door, { scaleX: 1, svgOrigin: '200 0', duration: 0.2 }, '<0.1')
      .set(calm, { opacity: 0 }, '<')
      .set(grin, { opacity: 1 }, '<')
      .to(arm, { rotation: -128, svgOrigin: '138 140', duration: 0.3 }, '<')
      .set(held, { opacity: 1 }, '<')
      .to({}, { duration: 1.4 })
      .to(arrived, { opacity: 0, duration: 0.25 })
      .set(guest, { scale: 1 })
      .set(flyer, { opacity: 0, scale: 1, rotation: 0, x: 0, y: 0 })
      .set(calm, { opacity: 1 })
      .set(grin, { opacity: 0 })
    return [tl, blink(q('.heist-bandit .b-lid'))]
  })
  return (
    <svg ref={ref} viewBox="0 0 420 300" className="block h-full w-full" role="img" aria-label="Bandit bags a guest off the 15.5% OTA fee tag and drops them at the owner's own front door: booked direct.">
      <rect width="420" height="300" fill="#1B2420" />
      <g fill="none" stroke={c.lichen} strokeOpacity=".08" strokeWidth="1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M-20 ${30 + i * 50} C80 ${0 + i * 50} 160 ${70 + i * 50} 260 ${30 + i * 50} S400 ${10 + i * 50} 440 ${40 + i * 50}`} />
        ))}
      </g>
      {/* OTA fee tag on a hook */}
      <g className="heist-tag">
        <path d="M92 0V44" stroke={c.slate} strokeWidth="3" />
        <path d="M60 58 L92 44 L124 58 V132 H60 Z" fill={c.slate} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="92" cy="60" r="5" fill="#1B2420" stroke={ink} strokeWidth="2" />
        <text x="92" y="88" textAnchor="middle" fontSize="12" fill={c.cream} style={label}>
          OTA FEE
        </text>
        <text x="92" y="116" textAnchor="middle" fontSize="28" fill={c.ember} style={display}>
          15.5%
        </text>
        <g className="heist-guest">
          <rect x="70" y="146" width="44" height="40" fill="#F6F1E7" stroke={ink} strokeWidth="2.5" />
          <circle cx="92" cy="160" r="6" fill="none" stroke={c.fir} strokeWidth="2.5" />
          <path d="M80 182 C80 172 104 172 104 182" fill="none" stroke={c.fir} strokeWidth="2.5" />
          <path d="M92 132 V146" stroke={ink} strokeWidth="2" />
        </g>
      </g>
      {/* the owner's own cabin door */}
      <g>
        <path d="M150 206 L214 158 L278 206 Z" fill={c.ember} stroke={ink} strokeWidth="3" strokeLinejoin="round" />
        <rect x="160" y="204" width="108" height="72" fill={c.brown} stroke={ink} strokeWidth="3" />
        <path d="M160 222H268M160 240H268M160 258H268" stroke="#4E3019" strokeWidth="2" />
        <rect x="200" y="226" width="28" height="50" fill={c.fir} stroke={ink} strokeWidth="2.5" />
        <rect className="heist-door" x="200" y="226" width="28" height="50" fill="#A9794A" stroke={ink} strokeWidth="2.5" />
        <rect x="170" y="186" width="88" height="16" fill={c.lichen} stroke={ink} strokeWidth="2" />
        <text x="214" y="198" textAnchor="middle" fontSize="10" fill={ink} style={label}>
          BOOK DIRECT
        </text>
      </g>
      <rect y="276" width="420" height="24" fill={ink} />
      {/* the guest, arrived */}
      <g className="heist-arrived">
        <rect x="150" y="96" width="128" height="40" fill={c.lichen} stroke={ink} strokeWidth="3" transform="rotate(-6 214 116)" />
        <text x="214" y="122" textAnchor="middle" fontSize="18" fill={ink} style={display} transform="rotate(-6 214 116)">
          BOOKED DIRECT
        </text>
      </g>
      <g className="heist-bandit" transform="translate(232 70) scale(0.76)">
        <Figure armR={-128} prop="sack" armL={22} />
      </g>
      <g className="heist-sack">
        <SackShape full />
      </g>
    </svg>
  )
}
