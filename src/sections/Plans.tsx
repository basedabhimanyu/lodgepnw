import { MascotSlot } from '../components/MascotSlot'

type Plan = { name: string; from: number; unit: string; blurb: string; items: string[]; featured?: boolean }

const plans: Plan[] = [
  {
    name: 'Direct Booking Website',
    from: 3500,
    unit: '',
    blurb: "When your current site can't be saved.",
    items: ['New fast site on your current booking engine', 'Property and local guide pages', 'Schema for Google and AI search', '3 to 4 weeks'],
  },
  {
    name: 'Direct Booking Fix',
    from: 1500,
    unit: '',
    blurb: 'The leaks from your teardown, fixed.',
    items: ['Hero, copy and book-direct offer', 'Mobile speed and booking path', 'Google booking link and email capture', 'Before/after report · 10 days'],
    featured: true,
  },
  {
    name: 'Direct Growth',
    from: 600,
    unit: '/mo',
    blurb: 'Keep guests coming back direct.',
    items: ['Monthly past-guest email', '2 local SEO pages a month', 'Google Business Profile posts', 'Direct-vs-OTA report · 3-month minimum'],
  },
]

export function Plans() {
  return (
    <section id="plans" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <p className="label m-0 text-slate">Pricing</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(40px,6vw,76px)]">Fixed prices. Posted in public.</h2>
        <p className="mt-5 max-w-2xl text-lg text-basalt/80">
          No hourly billing and no surprise invoices. You'll know the number before we start.
        </p>

        <div className="mt-16 grid items-start gap-12 md:grid-cols-3 md:gap-6 lg:gap-10 xl:gap-28">
          {plans.map((p) => (
            <article
              key={p.name}
              data-swing
              className={`relative origin-top ${p.featured ? 'md:order-none md:-mt-6' : ''} ${p.featured ? 'order-first' : ''}`}
            >
              {/* clipboard clip */}
              <div className="absolute -top-5 left-1/2 z-10 h-9 w-28 -translate-x-1/2 border-2 border-basalt bg-slate shadow-hard-sm" aria-hidden="true">
                <div className="mx-auto mt-2 h-2 w-14 border-2 border-basalt bg-paper" />
              </div>
              <div className={`card kraft px-6 pb-7 pt-10 ${p.featured ? 'bg-lichen' : ''}`} style={p.featured ? { backgroundColor: '#E2EDA6' } : undefined}>
                {p.featured && (
                  <span className="stamp stamp-screen absolute -top-3 right-2 z-20 md:-right-3 rotate-[8deg] bg-paper text-[18px] text-ember" data-stamp-slam>
                    Start here
                  </span>
                )}
                <h3 className="text-[30px] font-extrabold">{p.name}</h3>
                <p className="m-0 mt-2 text-[15.5px] text-basalt/80">{p.blurb}</p>
                <p className="m-0 mt-6 flex items-baseline gap-2">
                  <span className="label text-slate">From</span>
                  <span className="font-display text-[64px] font-black leading-none">
                    $<span data-count={p.from}>{p.from.toLocaleString('en-US')}</span>
                  </span>
                  {p.unit && <span className="font-display text-2xl font-extrabold">{p.unit}</span>}
                </p>
                <ul className="m-0 mt-6 list-none space-y-2.5 border-t-2 border-dashed border-basalt/30 p-0 pt-5">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15.5px] leading-snug">
                      <span className="mt-[7px] h-2 w-2 shrink-0 bg-fir" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
                <a href="#start" className={`btn mt-7 w-full ${p.featured ? '' : 'btn-ghost'}`}>
                  {p.featured ? 'Start free' : 'Ask about this'}
                </a>
              </div>
              {p.featured && (
                <div className="pointer-events-none absolute -right-[112px] bottom-0 z-20 hidden w-[124px] xl:block">
                  <MascotSlot id="plans-lean" />
                </div>
              )}
            </article>
          ))}
        </div>

        <div className="card mt-14 flex flex-col gap-4 bg-paper p-5 md:flex-row md:items-center md:p-6">
          <span className="stamp shrink-0 rotate-[-4deg] text-fir">Pilot</span>
          <p className="m-0 text-[16.5px] leading-snug">
            <strong>Pilot pricing:</strong> the first 2 owners this season get the Direct Booking Fix for{' '}
            <strong>$750</strong> in exchange for a case study and a testimonial.
          </p>
        </div>
      </div>
    </section>
  )
}
