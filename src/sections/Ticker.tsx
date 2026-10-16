import { destinationNames } from '../config/destinations'
import { MascotSlot } from '../components/MascotSlot'

// Endless destination band. Animations scroll [data-ticker-track] and speed it up with scroll velocity.
export function Ticker() {
  const row = (hidden: boolean) => (
    <ul className="m-0 flex shrink-0 list-none items-center gap-0 p-0" aria-hidden={hidden || undefined}>
      {destinationNames.map((d) => (
        <li key={d} className="flex items-center whitespace-nowrap font-display text-[28px] font-extrabold uppercase leading-none md:text-[34px]">
          <span className="px-5">{d}</span>
          <span className="text-lichen" aria-hidden="true">▲</span>
        </li>
      ))}
    </ul>
  )
  return (
    <section aria-label="Destinations we cover" className="relative mt-14 border-y-2 border-basalt" data-ticker>
      <div className="absolute bottom-full left-0 z-10 h-[72px] w-16" data-hop>
        <MascotSlot id="marquee-hop" />
      </div>
      <div className="stripes h-3 border-b-2 border-basalt" />
      <div className="dark-band overflow-hidden py-4">
        <div className="flex w-max" data-ticker-track>
          {row(false)}
          {row(true)}
        </div>
      </div>
      <div className="stripes h-3 border-t-2 border-basalt" />
    </section>
  )
}
