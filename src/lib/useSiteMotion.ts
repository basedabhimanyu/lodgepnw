import { useEffect } from 'react'
import gsap from 'gsap'
import type Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from '../config/motion'
import { setupBandit, setupBanditReduced } from './bandit'

// Page-wide motion: smooth scroll plus every scroll-triggered section animation.
// Fast and physical; visitors who prefer less motion get quick fades only.
export function useSiteMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const cleanups: (() => void)[] = []
    const mm = gsap.matchMedia()

    mm.add(
      { full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1024px)' },
      (ctx) => {
        const { full, desktop } = ctx.conditions as { full: boolean; reduced: boolean; desktop: boolean }

        if (!full) {
          reducedMotion()
          cleanups.push(setupBanditReduced())
          return
        }

        cleanups.push(smoothScroll())
        deal()
        brushes()
        ticker()
        folio(desktop)
        clipboards()
        stamps()
        mapDots()
        typeNotes()
        idleBandits()
        cleanups.push(setupBandit())
      },
    )

    return () => {
      cleanups.forEach((fn) => fn())
      cleanups.length = 0
      mm.revert()
    }
  }, [])
}

const once = (trigger: Element, start = 'top 85%') => ({ trigger, start, once: true })

function smoothScroll() {
  let lenis: Lenis | null = null
  let tick: ((t: number) => void) | null = null
  let cancelled = false

  import('lenis').then(({ default: LenisCtor }) => {
    if (cancelled) return
    const instance = new LenisCtor({ lerp: 0.14 })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    tick = (t: number) => instance.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
  })

  // In-page links go through Lenis so they stay smooth and land below the nav.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest?.('a[href^="#"]') as HTMLAnchorElement | null
    if (!a || !lenis) return
    const target = document.querySelector<HTMLElement>(a.getAttribute('href')!)
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: -90 })
  }
  document.addEventListener('click', onClick)

  return () => {
    cancelled = true
    document.removeEventListener('click', onClick)
    if (tick) gsap.ticker.remove(tick)
    lenis?.destroy()
  }
}

// Cards and chips are dealt in one after another.
function deal() {
  gsap.utils.toArray<HTMLElement>('[data-deal]').forEach((group) => {
    const items = group.querySelectorAll('[data-deal-item]')
    gsap.from(items, {
      y: 36,
      rotate: () => gsap.utils.random(-4, 4),
      opacity: 0,
      duration: motion.deal.duration,
      stagger: motion.deal.stagger,
      ease: motion.deal.ease,
      scrollTrigger: once(group),
    })
  })
}

// Brush underlines in headings draw in on scroll (the rotator handles its own).
function brushes() {
  gsap.utils.toArray<SVGPathElement>('h2 [data-brush]').forEach((path) => {
    gsap.fromTo(
      path,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: motion.wipe.duration * 2, ease: motion.wipe.ease, scrollTrigger: once(path, 'top 80%') },
    )
  })
}

// Endless destination band that speeds up with scroll velocity, plus Bandit hopping along the top.
function ticker() {
  const track = document.querySelector<HTMLElement>('[data-ticker-track]')
  const band = document.querySelector<HTMLElement>('[data-ticker]')
  if (!track || !band) return
  const loop = gsap.to(track, { xPercent: -50, duration: 60, ease: 'none', repeat: -1 })
  ScrollTrigger.create({
    trigger: band,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 7)
      gsap.to(loop, { timeScale: boost, duration: 0.15, overwrite: true })
      gsap.to(loop, { timeScale: 1, duration: 0.9, delay: 0.2, ease: 'power2.out' })
    },
  })

  const hop = band.querySelector<HTMLElement>('[data-hop]')
  if (!hop) return
  const travel = () => band.offsetWidth - hop.offsetWidth - 16
  gsap.to(hop, { x: travel, duration: 14, ease: 'none', repeat: -1, yoyo: true, invalidateOnRefresh: true })
  gsap.to(hop, { y: -motion.hop.height, duration: motion.hop.duration, ease: 'power2.out', repeat: -1, yoyo: true })
}

// How it works: pins on desktop, an ember line draws down, each row gets a stamped tick.
function folio(desktop: boolean) {
  const section = document.querySelector<HTMLElement>('[data-pin-section]')
  if (!section) return
  const line = section.querySelector('[data-progress]')
  const rows = gsap.utils.toArray<HTMLElement>('[data-step]', section)
  const stampTick = (row: HTMLElement) =>
    gsap.fromTo(
      row.querySelector('[data-tick]'),
      { scale: 2.6, opacity: 0, rotate: -18 },
      { scale: 1, opacity: 1, rotate: -6, duration: motion.snap.duration, ease: motion.snap.ease },
    )

  if (desktop) {
    gsap.set(line, { scaleY: 0 })
    const fired = new Set<number>()
    ScrollTrigger.create({
      trigger: section,
      // Pin by the bottom edge so all three rows are on screen while it's pinned.
      start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
      end: '+=900',
      invalidateOnRefresh: true,
      pin: true,
      scrub: 0.4,
      animation: gsap.to(line, { scaleY: 1, ease: 'none' }),
      onUpdate: (self) => {
        rows.forEach((row, i) => {
          const at = (i + 0.6) / rows.length
          if (self.progress >= at && !fired.has(i)) {
            fired.add(i)
            stampTick(row)
          }
        })
      },
    })
  } else {
    gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: section.querySelector('ol'), start: 'top 70%', end: 'bottom 60%', scrub: true } })
    rows.forEach((row) => ScrollTrigger.create({ ...once(row, 'top 60%'), onEnter: () => stampTick(row) }))
  }
}

// Clipboards swing in from their clips; prices count up.
function clipboards() {
  gsap.utils.toArray<HTMLElement>('[data-swing]').forEach((board, i) => {
    gsap.from(board, {
      rotate: i % 2 ? 9 : -9,
      y: -30,
      opacity: 0,
      duration: motion.swing.duration,
      ease: motion.swing.ease,
      delay: i * motion.deal.stagger * 2,
      scrollTrigger: once(board),
    })
  })
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count)
    const n = { v: 0 }
    gsap.to(n, {
      v: to,
      duration: motion.swing.duration,
      ease: 'power3.out',
      scrollTrigger: once(el),
      onUpdate: () => {
        el.textContent = Math.round(n.v).toLocaleString('en-US')
      },
      onComplete: () => {
        el.textContent = to.toLocaleString('en-US')
      },
    })
  })
}

// Stamps slam in and shake what they land on.
function stamps() {
  gsap.utils.toArray<HTMLElement>('[data-stamp-slam]').forEach((stamp) => {
    const tl = gsap.timeline({ scrollTrigger: once(stamp, 'top 80%') })
    tl.from(stamp, { scale: 3, opacity: 0, duration: motion.snap.duration, ease: 'power4.in' }).fromTo(
      stamp.parentElement,
      { x: 0 },
      { x: 3, duration: 0.04, repeat: 3, yoyo: true, ease: 'none', clearProps: 'x' },
    )
  })
}

function mapDots() {
  const dots = gsap.utils.toArray<SVGGElement>('[data-map-dot]')
  if (!dots.length) return
  gsap.from(dots, {
    scale: 0,
    transformOrigin: '50% 50%',
    duration: motion.snap.duration * 2,
    stagger: 0.03,
    ease: 'back.out(3)',
    scrollTrigger: once(dots[0].closest('svg')!),
  })
}

// Field notes type themselves out. The untyped part stays in place but invisible, so the
// box never changes size; the full text is in the HTML for crawlers and screen readers.
function typeNotes() {
  gsap.utils.toArray<HTMLElement>('[data-type]').forEach((el, i) => {
    const text = el.textContent ?? ''
    const typed = document.createElement('span')
    const rest = document.createElement('span')
    rest.style.color = 'transparent'
    rest.setAttribute('aria-hidden', 'true')
    el.setAttribute('aria-label', text)
    const n = { c: 0 }
    const render = () => {
      const k = Math.round(n.c)
      typed.textContent = text.slice(0, k)
      rest.textContent = text.slice(k)
    }
    gsap.to(n, {
      c: text.length,
      duration: text.length * 0.022,
      delay: i * 0.35,
      ease: 'none',
      scrollTrigger: {
        ...once(el, 'top 85%'),
        onEnter: () => {
          el.replaceChildren(typed, rest)
          render()
        },
      },
      onUpdate: render,
    })
  })
}

// Every posed Bandit blinks now and then; the sleeper's z's drift up.
function idleBandits() {
  gsap.utils.toArray<SVGSVGElement>('svg[data-bandit]').forEach((svg) => {
    const lids = svg.querySelectorAll('.b-lid')
    if (lids.length) {
      gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2.5, 5.5), delay: gsap.utils.random(0, 3) })
        .to(lids, { scaleY: 2.4, duration: 0.07, yoyo: true, repeat: 1, ease: 'power1.inOut' })
    }
  })
  gsap.utils.toArray<SVGGElement>('.b-zzz text').forEach((z, i) => {
    gsap.fromTo(z, { y: 6, opacity: 0 }, { y: -10, opacity: 1, duration: 1.6, repeat: -1, delay: i * 0.5, ease: 'sine.out' })
  })
}

// Less motion: no pins, hops, swipes or shakes. Quick fades only.
function reducedMotion() {
  gsap.utils.toArray<HTMLElement>('[data-deal-item], [data-swing], [data-stamp-slam]').forEach((el) => {
    gsap.from(el, { opacity: 0, duration: motion.fade.duration, scrollTrigger: once(el) })
  })
  gsap.utils.toArray<SVGElement>('[data-tick]').forEach((tick) => gsap.set(tick, { opacity: 1, rotate: -6 }))
  gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((line) => gsap.set(line, { scaleY: 1 }))
}
