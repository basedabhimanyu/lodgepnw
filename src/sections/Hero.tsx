import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BrushUnderline } from '../components/BrushUnderline'
import { MascotSlot } from '../components/MascotSlot'
import { TeardownForm } from '../components/TeardownForm'
import { motion } from '../config/motion'
import { useDestination } from '../lib/destination'
import { prefersReducedMotion } from '../lib/reducedMotion'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

// The rolling destination: old word slides up with a blur, new one rises with a bounce,
// the box width animates so the line never jumps, and the brush underline redraws.
export function Rotator({ className = '' }: { className?: string }) {
  const { name, setHovering } = useDestination()
  const [words, setWords] = useState<{ prev: string | null; cur: string }>({ prev: null, cur: name })
  const box = useRef<HTMLSpanElement>(null)
  const curRef = useRef<HTMLSpanElement>(null)
  const prevRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.fonts?.ready.then(() => {
      if (box.current && curRef.current && !gsap.isTweening(box.current)) box.current.style.width = `${curRef.current.offsetWidth}px`
    })
  }, [])

  useEffect(() => {
    if (name !== words.cur) setWords({ prev: words.cur, cur: name })
  }, [name]) // eslint-disable-line react-hooks/exhaustive-deps

  useIsoLayoutEffect(() => {
    const el = box.current
    const cur = curRef.current
    if (!el || !cur) return
    const target = cur.offsetWidth
    if (!words.prev) {
      el.style.width = `${target}px`
      return
    }
    const brush = el.querySelector('[data-brush]')
    const reduced = prefersReducedMotion()
    const tl = gsap.timeline()
    if (reduced) {
      tl.set(el, { width: target })
        .fromTo(cur, { opacity: 0 }, { opacity: 1, duration: motion.fade.duration })
        .set(prevRef.current, { opacity: 0 }, 0)
    } else {
      tl.to(prevRef.current, { yPercent: -100, opacity: 0, filter: 'blur(4px)', duration: motion.roll.out, ease: 'power2.in' }, 0)
        .to(el, { width: target, duration: motion.roll.out + motion.roll.in * 0.6, ease: 'power3.inOut' }, 0)
        .fromTo(cur, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: motion.roll.in, ease: motion.roll.ease }, motion.roll.out * 0.6)
        .fromTo(brush, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: motion.wipe.duration, ease: motion.wipe.ease }, motion.roll.out + 0.1)
    }
    return () => {
      tl.kill()
    }
  }, [words])

  return (
    <span
      ref={box}
      className={`relative inline-block overflow-hidden whitespace-nowrap align-bottom pb-[0.12em] ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      aria-hidden="true"
    >
      {words.prev && (
        <span ref={prevRef} key={`p-${words.prev}`} className="absolute left-0 top-0 text-ember">
          {words.prev}
        </span>
      )}
      <span ref={curRef} key={`c-${words.cur}`} className="inline-block text-ember">
        {words.cur}
      </span>
      <BrushUnderline className="bottom-0 h-[0.16em]" />
    </span>
  )
}

const chips = ['15.5% Airbnb host fee', '10-day fix', 'Fixed price']

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="wrap grid gap-12 py-12 md:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="label mb-5 inline-block border-2 border-basalt bg-lichen px-2.5 py-1 text-basalt" data-deal-item>
            PNW only · Fixed price · Owner-run
          </p>
          <h1 className="m-0 text-[clamp(46px,7.6vw,96px)]">
            <span className="sr-only">More direct bookings for stays across the Pacific Northwest</span>
            <span aria-hidden="true">
              More direct bookings for stays in
              <br />
              <Rotator />
            </span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-basalt/85 md:text-xl">
            Guests find you on Google, then book on Airbnb. We fix the leak so you keep the 15.5%.
          </p>
          <div id="start" className="mt-8 max-w-[36rem] scroll-mt-24">
            <TeardownForm />
          </div>
          <ul className="mt-6 flex list-none flex-wrap gap-2.5 p-0" data-deal>
            {chips.map((c) => (
              <li key={c} data-deal-item className="label border-2 border-basalt bg-paper px-2.5 py-1.5 shadow-hard-sm">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] pt-24">
          <div className="relative">
            <MascotSlot id="hero-peek" className="absolute bottom-[calc(100%-14px)] right-3 z-10" />
            <div className="card relative overflow-hidden bg-basalt">
              <div className="label flex items-center justify-between border-b-2 border-basalt bg-fir px-3 py-2 text-paper">
                <span>● Live · Front desk</span>
                <span className="text-lichen">LP-0417</span>
              </div>
              <div className="aspect-[480/300]">
                <MascotSlot id="hero-loop" fill />
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 rotate-[-4deg]" aria-hidden="true">
              <span className="stamp bg-paper text-ember">Book direct</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
