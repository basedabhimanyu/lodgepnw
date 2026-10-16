import { MascotSlot } from '../components/MascotSlot'

export function Guarantee() {
  return (
    <section aria-labelledby="guarantee-h" className="relative overflow-hidden border-y-2 border-basalt bg-ember">
      <div className="stripes h-3 border-b-2 border-basalt" />
      <div className="wrap grid items-center gap-10 py-16 md:grid-cols-[1fr_auto] md:py-24">
        <div>
          <p className="label m-0">The guarantee</p>
          <h2 id="guarantee-h" className="mt-3 text-[clamp(46px,8vw,112px)]">
            Clearer path,
            <br />
            or we keep working.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            If your booking path isn't measurably clearer when we hand it over, we keep going until it is. We guarantee the
            work we control: faster mobile pages, fewer taps to dates, a working book-direct offer. We don't promise
            booking numbers, and you should be wary of anyone who does.
          </p>
        </div>
        <div className="relative mx-auto flex w-[220px] flex-col items-center">
          <MascotSlot id="guarantee-stamp" />
          <span className="stamp mt-[-16px] rotate-[-10deg] bg-ember text-[34px] text-basalt" data-stamp-slam>
            Guaranteed
          </span>
        </div>
      </div>
      <div className="stripes h-3 border-t-2 border-basalt" />
    </section>
  )
}
