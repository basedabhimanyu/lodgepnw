import { destinationNames } from '../config/destinations'
import { MascotSlot } from '../components/MascotSlot'
import { navLinks } from './Chrome'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-fir pb-24 pt-16 text-paper sm:pb-0">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[2fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <h2 className="label m-0 text-lichen">Where we work</h2>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-2 gap-y-1 p-0 text-[14px] leading-relaxed text-paper/85 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:gap-y-1.5 sm:text-[15px] sm:text-paper">
            {destinationNames.map((d) => (
              <li key={d} className="after:ml-2 after:text-lichen after:content-['·'] last:after:content-none sm:after:content-none">
                {d}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="label m-0 text-lichen">Site</h2>
          <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-5 gap-y-1.5 p-0 text-[15px] sm:block sm:space-y-1.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-paper no-underline hover:text-lichen">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#start" className="text-paper no-underline hover:text-lichen">
                Free teardown
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="label m-0 text-lichen">Contact</h2>
          <ul className="m-0 mt-4 list-none space-y-1.5 p-0 text-[15px]">
            <li>
              <a href="mailto:abhimanyu@lodgepnw.com" className="break-words text-paper no-underline hover:text-lichen">
                abhimanyu@lodgepnw.com
              </a>
            </li>
            <li className="text-paper/85">Serving WA · OR · North Idaho</li>
          </ul>
          <p className="label m-0 mt-6 text-paper/60">© 2026 LodgePNW</p>
        </div>
      </div>

      <div className="relative mt-28 select-none" aria-hidden="true">
        <div className="absolute left-[8%] top-[-60px] z-10 sm:top-[-70px]">
          <MascotSlot id="footer-sleep" />
        </div>
        <p className="m-0 translate-y-[18%] whitespace-nowrap text-center font-display text-[25vw] font-black uppercase leading-[0.8] tracking-tighter text-basalt/70">
          LodgePNW
        </p>
      </div>
    </footer>
  )
}
