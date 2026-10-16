import gsap from 'gsap'
import { motion } from '../config/motion'

const SVG = 'http://www.w3.org/2000/svg'

// Bandit's loot sack, drawn the same as SackShape in components/bandit/Figure.tsx (neck at 0,0).
const SACK = `
  <g stroke="#141A17" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" transform="scale(1.18)">
    <path d="M-6 2 L6 2 L8 9 C27 14 30 44 0 47 C-30 44 -27 14 -8 9 Z" fill="#CDB27E"/>
    <path d="M-8 9 C-4 11 4 11 8 9" fill="none" stroke="#CFE36B" stroke-width="3.4"/>
    <path d="M-10 24 l4 4 M8 30 l4 -3 M-2 38 l3 3" stroke="#A88E5C" stroke-width="2"/>
    <path d="M-4 0 C-8 -6 -2 -10 2 -6" fill="none" stroke-width="2.4"/>
  </g>`
const SACK_BODY_Y = 30 // centre of the sack body below its neck, in px

// Swipe & Swap: hover (or tap) a leak card and Bandit throws his loot sack over the broken
// icon, bags it, yanks it back and swaps in the fixed version, then FIXED gets stamped.
// One sack, so swipes queue. Each card is fixed once; fix all 8 and he gives a thumbs-up.
export function setupBandit() {
  const perch = document.querySelector<HTMLElement>('[data-mascot="leaks-perch"]')
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-leak]'))
  if (!perch || !cards.length) return () => {}

  const overlay = document.createElementNS(SVG, 'svg')
  overlay.setAttribute('aria-hidden', 'true')
  Object.assign(overlay.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: '45', overflow: 'visible' })
  document.body.appendChild(overlay)

  const done = new Set<HTMLElement>()
  const queued = new Set<HTMLElement>()
  const queue: HTMLElement[] = []
  const lastTry = new WeakMap<HTMLElement, number>()
  let busy = false

  const next = () => {
    const card = queue.shift()
    if (!card) {
      busy = false
      return
    }
    queued.delete(card)
    busy = true
    const finish = () => {
      done.add(card)
      if (done.size === cards.length) celebrate(perch)
      next()
    }
    if (isVisible(perch) && isVisible(card)) swipe(perch, card, overlay, finish)
    else swap(card, finish)
  }

  const off: (() => void)[] = []
  for (const card of cards) {
    const fire = () => {
      const now = performance.now()
      if (done.has(card) || queued.has(card)) return
      if (now - (lastTry.get(card) ?? -Infinity) < motion.cast.cooldown * 1000) return
      lastTry.set(card, now)
      // Counter for automated checks.
      document.body.dataset.swipes = String(Number(document.body.dataset.swipes ?? 0) + 1)
      queued.add(card)
      queue.push(card)
      if (!busy) next()
    }
    card.addEventListener('mouseenter', fire)
    card.addEventListener('click', fire)
    off.push(() => {
      card.removeEventListener('mouseenter', fire)
      card.removeEventListener('click', fire)
    })
  }

  return () => {
    off.forEach((fn) => fn())
    overlay.remove()
  }
}

function swipe(perch: HTMLElement, card: HTMLElement, overlay: SVGSVGElement, onDone: () => void) {
  const held = perch.querySelector<SVGGElement>('.b-sack')
  const arm = perch.querySelector<SVGGElement>('.b-arm-r')
  const lids = perch.querySelectorAll('.b-lid')
  const target = card.querySelector<HTMLElement>('[data-leak-target]')
  if (!held || !arm || !target) return swap(card, onDone)

  const svg = perch.querySelector('svg')!
  const scale = svg.getBoundingClientRect().width / svg.viewBox.baseVal.width
  const hr = held.getBoundingClientRect()
  const tr = target.getBoundingClientRect()
  const from = { x: hr.left + hr.width / 2, y: hr.top + 4 }
  const to = { x: tr.left + tr.width / 2, y: tr.top + tr.height / 2 - SACK_BODY_Y * scale }

  const flyer = document.createElementNS(SVG, 'g')
  flyer.innerHTML = SACK
  overlay.appendChild(flyer)
  gsap.set(flyer, { x: from.x, y: from.y, scale, opacity: 0, transformOrigin: '50% 50%' })

  const tl = gsap.timeline({
    onComplete: () => {
      flyer.remove()
      onDone()
    },
  })
  tl
    // One slow blink, then wind up and throw.
    .to(lids, { scaleY: 2.4, duration: 0.07, yoyo: true, repeat: 1 })
    .to(arm, { rotation: -160, svgOrigin: '138 140', duration: 0.14, ease: 'power2.in' })
    .to(arm, { rotation: -100, svgOrigin: '138 140', duration: 0.08, ease: 'power4.out' })
    .set(held, { opacity: 0 })
    .set(flyer, { opacity: 1 })
  arc(tl, flyer, from, to, 70, 0.22, 1)
  tl
    // Bagged: the broken icon vanishes into the sack, which cinches.
    .to(target, { scale: 0, opacity: 0, duration: 0.08 })
    .to(flyer, { scaleX: scale * 0.82, scaleY: scale * 1.12, duration: 0.07, yoyo: true, repeat: 1 })
  arc(tl, flyer, to, from, 50, 0.22, -1)
  tl.set(flyer, { opacity: 0 })
    // Pocketed: sack back in paw, bulging; the grin.
    .set(held, { opacity: 1 })
    .fromTo(held, { scale: 1.35, transformOrigin: '50% 0%' }, { scale: 1, duration: 0.4, ease: 'elastic.out(1.2, 0.4)' })
    .to(arm, { rotation: -128, svgOrigin: '138 140', duration: 0.25, ease: 'power2.out' }, '<')
    .add(() => grin(perch), '<')
    // The swap: the fixed version drops in where the leak was.
    .add(() => swap(card), '<0.05')
}

// Drop in the fixed icon and stamp the card.
function swap(card: HTMLElement, onDone?: () => void) {
  const target = card.querySelector<HTMLElement>('[data-leak-target]')
  const fixed = card.querySelector<HTMLElement>('[data-leak-fixed]')
  const stamp = card.querySelector<HTMLElement>('[data-fixed]')
  const tl = gsap.timeline({ onComplete: onDone })
  if (target) tl.set(target, { opacity: 0 })
  if (fixed) tl.fromTo(fixed, { y: -26, opacity: 0, rotation: -10 }, { y: 0, opacity: 1, rotation: 0, duration: 0.3, ease: 'back.out(2.6)' })
  if (stamp) tl.fromTo(stamp, { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 1, duration: motion.snap.duration, ease: 'power4.in' })
}

function grin(slot: HTMLElement) {
  const calm = slot.querySelector('.b-mouth-calm')
  const happy = slot.querySelector('.b-mouth-grin')
  gsap.set(calm, { opacity: 0 })
  gsap.set(happy, { opacity: 1 })
  gsap.delayedCall(motion.cast.pocket, () => {
    gsap.set(calm, { opacity: 1 })
    gsap.set(happy, { opacity: 0 })
  })
}

// All 8 fixed: thumbs-up and a nudge toward the teardown form.
function celebrate(perch: HTMLElement) {
  const arm = perch.querySelector('.b-arm-r')
  gsap.timeline()
    .to(arm, { rotation: -170, svgOrigin: '138 140', duration: 0.18, yoyo: true, repeat: 3, ease: 'power1.inOut' })
    .add(() => grin(perch), 0)
  const chip = document.querySelector<HTMLElement>('[data-all-fixed]')
  if (chip) gsap.fromTo(chip, { opacity: 0, y: 10, rotation: -4 }, { opacity: 1, y: 0, rotation: -2, duration: 0.3, ease: 'back.out(2)' })
}

// Quadratic arc between two viewport points, spinning as it flies.
function arc(tl: gsap.core.Timeline, el: Element, a: { x: number; y: number }, b: { x: number; y: number }, lift: number, duration: number, spin: number) {
  const ctrl = { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - lift }
  const t = { v: 0 }
  tl.to(t, {
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
        rotation: spin * Math.sin(t.v * Math.PI) * 40,
      })
    },
  })
}

function isVisible(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight
}

// Less motion: hovering or tapping a card just swaps in the fixed icon and its stamp.
export function setupBanditReduced() {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-leak]'))
  const show = (e: Event) => {
    const card = e.currentTarget as HTMLElement
    for (const [sel, v] of [['[data-leak-target]', '0'], ['[data-leak-fixed]', '1'], ['[data-fixed]', '1']] as const) {
      const el = card.querySelector<HTMLElement>(sel)
      if (el) el.style.opacity = v
    }
  }
  cards.forEach((c) => {
    c.addEventListener('mouseenter', show)
    c.addEventListener('click', show)
  })
  return () =>
    cards.forEach((c) => {
      c.removeEventListener('mouseenter', show)
      c.removeEventListener('click', show)
    })
}
