import { useEffect, useRef, useState } from 'react'
import { Logo } from '../components/Logo'
import { MascotSlot } from '../components/MascotSlot'
import { Arrow } from '../components/TeardownForm'
import { useDestination } from '../lib/destination'

export const navLinks = [
  { href: '#leaks', label: 'Leaks' },
  { href: '#how', label: 'How it works' },
  { href: '#plans', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function TopBar() {
  const { name } = useDestination()
  return (
    <div className="bg-fir text-paper">
      <div className="wrap flex h-9 items-center justify-between gap-4">
        <p className="label m-0 flex min-w-0 items-center gap-2 truncate">
          <span className="inline-block h-2 w-2 shrink-0 bg-lichen" aria-hidden="true" />
          <span className="truncate sm:hidden">
            Teardowns open · <span className="text-lichen">{name}</span>
          </span>
          <span className="hidden truncate sm:inline">
            Free teardowns this week for <span className="text-lichen">{name}</span> owners
          </span>
        </p>
        <a href="mailto:abhimanyu@lodgepnw.com" className="label hidden shrink-0 text-paper no-underline hover:text-lichen sm:block">
          abhimanyu@lodgepnw.com
        </a>
      </div>
    </div>
  )
}

// Hides while scrolling down, comes back when scrolling up.
export function Nav() {
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 160 && y > last.current)
      last.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-40 border-b-2 border-basalt bg-paper transition-transform duration-300"
      style={{ transform: hidden ? 'translateY(-100%)' : 'none' }}
    >
      <nav className="wrap flex h-16 items-center justify-between gap-4" aria-label="Main">
        <div className="flex items-center gap-3">
          <Logo />
          <MascotSlot id="nav-badge" className="hidden sm:flex" />
        </div>
        <ul className="m-0 hidden list-none gap-7 p-0 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label text-[13px] text-basalt no-underline decoration-lichen decoration-4 underline-offset-4 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#start" className="btn hidden min-h-11 px-4 text-lg sm:inline-flex">
          Get a teardown
        </a>
      </nav>
    </header>
  )
}

// Pinned to the bottom on phones once the hero form is out of view; hidden again while the
// final form is on screen, so it never covers a form's own button.
export function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const seen = new Map<Element, boolean>()
    const forms = ['#start', '#teardown'].map((s) => document.querySelector(s)).filter(Boolean) as Element[]
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting))
      const heroGone = !seen.get(forms[0]) && (forms[0]?.getBoundingClientRect().bottom ?? 0) < 0
      setShow(heroGone && !seen.get(forms[1]))
    })
    forms.forEach((f) => io.observe(f))
    return () => io.disconnect()
  }, [])
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-basalt bg-paper p-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 sm:hidden"
      style={{ transform: show ? 'none' : 'translateY(110%)' }}
      aria-hidden={!show}
    >
      <a href="#start" className="btn w-full" tabIndex={show ? 0 : -1}>
        Get a free teardown <Arrow />
      </a>
    </div>
  )
}
