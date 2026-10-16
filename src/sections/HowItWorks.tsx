import { MascotSlot } from '../components/MascotSlot'
import type { MascotSlotId } from '../config/mascot'

const steps: { n: string; verb: string; line: string; slot: MascotSlotId; when: string }[] = [
  { n: '01', verb: 'Teardown', line: 'A 5-minute video of your Google-to-checkout path, on a phone.', slot: 'step-1', when: 'Free · 2 days' },
  { n: '02', verb: 'Fix', line: '10 business days of fixes on your current site and booking engine.', slot: 'step-2', when: 'Fixed price · 10 days' },
  { n: '03', verb: 'Grow', line: 'Monthly past-guest emails and local pages keep guests coming direct.', slot: 'step-3', when: 'Monthly · optional' },
]

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y-2 border-basalt bg-fir py-20 text-paper md:py-28" data-pin-section>
      <div className="wrap">
        <p className="label m-0 text-lichen">How it works</p>
        <h2 className="mt-3 max-w-3xl text-[clamp(40px,6vw,76px)]">One folio. Three stops. No retainer to start.</h2>

        <div className="kraft perf card relative mt-14 text-basalt">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-basalt/40 px-5 py-4 md:px-8">
            <span className="label">Guest folio · Direct booking plan</span>
            <span className="label hidden sm:inline">No. LP-0417</span>
          </div>
          <div className="relative px-5 py-4 md:px-8">
            <div className="absolute bottom-8 left-[40px] top-8 w-1 bg-basalt/15 md:left-[54px]" aria-hidden="true">
              <div className="h-full w-full origin-top bg-ember" data-progress />
            </div>
            <ol className="m-0 list-none p-0">
              {steps.map((s) => (
                <li
                  key={s.n}
                  data-step
                  className="relative grid grid-cols-[44px_1fr_44px] items-start gap-3 border-b-2 border-dashed border-basalt/25 py-6 last:border-b-0 md:grid-cols-[64px_1fr_auto_120px] md:items-center md:gap-8 md:py-7"
                >
                  <span className="relative z-[1] grid h-11 w-11 place-items-center border-2 border-basalt bg-paper font-mono text-base font-bold md:h-12 md:w-12 md:text-lg">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-[clamp(32px,4.4vw,52px)]">{s.verb}</h3>
                    <p className="m-0 mt-2 max-w-xl text-[16px] leading-snug text-basalt/85 md:text-[17px]">{s.line}</p>
                    <p className="label m-0 mt-2 text-slate">{s.when}</p>
                  </div>
                  <span className="grid h-11 w-11 place-items-center border-2 border-basalt bg-paper md:h-14 md:w-14" aria-hidden="true">
                    <svg viewBox="0 0 40 40" className="h-8 w-8 text-fir opacity-0 md:h-10 md:w-10" style={{ filter: 'url(#ink)' }} data-tick>
                      <path d="M7 21l9 9L34 9" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
                    </svg>
                  </span>
                  <div className="hidden md:block">
                    <MascotSlot id={s.slot} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
