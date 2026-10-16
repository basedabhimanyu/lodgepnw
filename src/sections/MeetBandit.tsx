import { useState } from 'react'
import { MascotSlot } from '../components/MascotSlot'
import type { MascotSlotId } from '../config/mascot'
import type { Outfit } from '../components/bandit/Figure'

const notes = [
  "Guests don't hate booking direct. They hate guessing if it's safe.",
  'The book button was in the footer. The guests were not.',
  'Airbnb keeps the guest list. Your site should keep a copy.',
]

const outfits: { id: MascotSlotId; outfit: Outfit; label: string }[] = [
  { id: 'bandit-var-1', outfit: 'fly', label: 'Fly vest' },
  { id: 'bandit-var-2', outfit: 'rain', label: 'Rain shell' },
  { id: 'bandit-var-3', outfit: 'apron', label: 'Apron' },
  { id: 'bandit-var-4', outfit: 'snow', label: 'Snow gear' },
]

export function MeetBandit() {
  const [outfit, setOutfit] = useState<Outfit>('vest')
  return (
    <section id="bandit" className="py-20 md:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[auto_1fr] lg:gap-20">
        <div className="mx-auto w-[280px] sm:w-[300px]">
          <div className="border-[3px] border-basalt bg-basalt p-2.5 shadow-hard">
            <div className="mx-auto mb-2 h-1.5 w-16 bg-slate" aria-hidden="true" />
            <div className="aspect-[9/16] bg-fir">
              <MascotSlot key={outfit} id="bandit-hero" fill outfit={outfit} />
            </div>
          </div>
          <p className="label m-0 mt-6 text-slate">Change his outfit</p>
          <div className="mt-2.5 grid grid-cols-2 gap-3" role="group" aria-label="Bandit's outfits">
            {outfits.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setOutfit(outfit === o.outfit ? 'vest' : o.outfit)}
                aria-pressed={outfit === o.outfit}
                className={`flex min-h-[64px] cursor-pointer items-center gap-2 border-2 border-basalt py-1 pl-1 pr-2 text-left transition-transform active:translate-x-[2px] active:translate-y-[2px] ${
                  outfit === o.outfit ? 'bg-lichen' : 'bg-kraft shadow-hard-sm'
                }`}
              >
                <MascotSlot id={o.id} className="pointer-events-none !w-[52px]" />
                <span className="min-w-0 font-display text-[16px] font-extrabold uppercase leading-[1.05]">{o.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="order-first lg:order-none">
          <p className="label m-0 text-slate">Mascot on duty</p>
          <h2 className="mt-3 text-[clamp(44px,7vw,92px)]">
            Meet Bandit.
            <br />
            <span className="text-fir">Head of Guest Recovery.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg text-basalt/80">
            Masked, patient, never in a hurry. Bandit finds the guests your site lets slip away and walks them back to your
            own booking page.
          </p>
          <ol className="m-0 mt-8 grid list-none gap-3 p-0">
            {notes.map((n, i) => (
              <li key={n} className="kraft card flex flex-col gap-1.5 px-4 py-3.5 sm:flex-row sm:gap-4">
                <span className="label shrink-0 pt-1 text-slate">Field note {String(i + 1).padStart(2, '0')}</span>
                <span className="font-mono text-[14.5px] leading-snug sm:text-[15px]" data-type>
                  {n}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex items-center gap-4 border-t-2 border-dashed border-basalt/30 pt-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center border-2 border-basalt bg-fir shadow-hard-sm" aria-hidden="true">
              <span className="font-display text-[30px] font-black leading-none text-lichen">AN</span>
            </div>
            <p className="m-0 text-[15.5px] leading-snug">
              <strong>Bandit's the mascot. Abhimanyu does the work.</strong> I'm the founder of LodgePNW. I build and fix
              direct-booking sites for independent PNW stays, and I answer every email myself.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
