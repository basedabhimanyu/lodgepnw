import { leaks } from '../config/leaks'
import { LeakIcon } from '../components/LeakIcon'
import { MascotSlot } from '../components/MascotSlot'
import { BrushUnderline } from '../components/BrushUnderline'

export function Leaks() {
  return (
    <section id="leaks" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="label m-0 text-slate">Where direct bookings leak</p>
          <h2 className="mt-3 text-[clamp(40px,6vw,76px)]">
            8 places your guests{' '}
            <span className="relative inline-block">
              slip away
              <BrushUnderline className="-bottom-1 h-3" />
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-basalt/80">
            Most owners don't need more traffic. They need fewer exits between Google and checkout. These are the
            ones we find on almost every teardown.<span className="hidden md:inline"> Hover a leak and Bandit swipes it.</span>
          </p>
        </div>

        <div className="relative mt-14">
          <div className="mb-3 flex items-end justify-end gap-3 md:block">
            <p className="label relative m-0 mb-10 border-2 border-basalt bg-paper px-3 py-2 text-basalt shadow-hard-sm md:hidden">
              Tap a leak. I'll swipe it.
              <span className="absolute -right-[9px] bottom-3 h-3 w-3 rotate-45 border-r-2 border-t-2 border-basalt bg-paper" aria-hidden="true" />
            </p>
            <div className="pointer-events-none z-10 w-[124px] shrink-0 md:absolute md:-top-[178px] md:right-2 md:w-[170px]" data-cast-from>
              <MascotSlot id="leaks-perch" />
            </div>
          </div>
          <a
            href="#start"
            data-all-fixed
            className="label absolute -top-12 right-[190px] z-10 hidden border-2 border-basalt bg-lichen px-3 py-2 text-basalt no-underline opacity-0 shadow-hard-sm md:block"
          >
            All 8 fixed. Now do yours →
          </a>
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:gap-5 lg:grid-cols-4" data-deal>
            {leaks.map((leak, i) => (
              <li
                key={leak.id}
                data-deal-item
                data-leak={leak.id}
                className="card group relative flex min-h-[190px] flex-col p-3.5 sm:min-h-[220px] sm:p-5 transition-colors hover:bg-kraft"
              >
                <div className="flex items-start justify-between">
                  <span className="label text-slate">Leak {String(i + 1).padStart(2, '0')}</span>
                  <span className="stamp pointer-events-none rotate-[-8deg] !text-[13px] text-fir opacity-0 sm:!text-[15px]" data-fixed>
                    Fixed
                  </span>
                </div>
                <div className="relative mt-4 h-12 w-12 sm:h-14 sm:w-14">
                  <div className="absolute inset-0 grid place-items-center text-fir" data-leak-target>
                    <LeakIcon id={leak.id} className="h-10 w-10 sm:h-12 sm:w-12" />
                  </div>
                  {/* The fixed version Bandit swaps in */}
                  <div className="absolute inset-0 grid place-items-center border-2 border-basalt bg-lichen opacity-0 shadow-hard-sm" data-leak-fixed aria-hidden="true">
                    <LeakIcon id={leak.id} className="h-8 w-8 text-basalt sm:h-9 sm:w-9" />
                    <span className="absolute -right-2.5 -top-2.5 grid h-6 w-6 place-items-center border-2 border-basalt bg-fir">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="#F6F1E7" strokeWidth="3"><path d="M2 8.5l4 4 8-9" /></svg>
                    </span>
                  </div>
                </div>
                <h3 className="mt-auto pt-5 text-[21px] font-extrabold sm:pt-6 sm:text-[28px]">{leak.title}</h3>
                <p className="m-0 mt-2 text-[14px] leading-snug text-basalt/80 sm:text-[15.5px]">{leak.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
