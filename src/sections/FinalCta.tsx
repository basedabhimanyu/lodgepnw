import { MascotSlot } from '../components/MascotSlot'
import { TeardownForm } from '../components/TeardownForm'
import { Rotator } from './Hero'

export function FinalCta() {
  return (
    <section id="teardown" aria-labelledby="cta-h" className="dark-band on-dark scroll-mt-20 border-y-2 border-basalt py-20 md:py-28">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="label m-0 text-lichen">Free teardown</p>
          <h2 id="cta-h" className="mt-3 text-[clamp(40px,6.4vw,84px)]">
            <span className="sr-only">Booking guests in the Pacific Northwest? Bandit's free this week.</span>
            <span aria-hidden="true">
              Booking guests in
              <br />
              <Rotator />?
              <br />
              Bandit's free this week.
            </span>
          </h2>
          <div className="card mt-10 bg-kraft p-5 text-basalt md:p-7">
            <TeardownForm variant="full" />
          </div>
        </div>
        <div className="card overflow-hidden border-paper bg-basalt" style={{ boxShadow: '4px 4px 0 0 #E8642C' }}>
          <div className="label flex justify-between border-b-2 border-paper/20 bg-fir px-3 py-2 text-paper">
            <span>● Recovering a guest</span>
            <span className="text-lichen">Heist 01</span>
          </div>
          <div className="aspect-[420/300]">
            <MascotSlot id="cta-cast" fill />
          </div>
        </div>
      </div>
    </section>
  )
}
