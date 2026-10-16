import { MascotSlot } from '../components/MascotSlot'

export const faqs = [
  {
    q: 'Do I have to leave Airbnb?',
    a: 'No. Most owners keep Airbnb and VRBO for discovery. We make sure the guests who find you anyway, and the ones who come back, book on your own site.',
  },
  {
    q: 'Will you replace my booking engine or PMS?',
    a: 'No. We work with the engine you already run, like OwnerRez, Lodgify, Hostaway or Guesty, and fix the path that leads to it.',
  },
  {
    q: 'How fast is it?',
    a: 'Your teardown video lands within 2 business days. The Direct Booking Fix takes 10 business days from kickoff.',
  },
  {
    q: 'What do you need from me?',
    a: 'Website and booking-engine logins, your best photos, and about 2 hours of your time across the project. We handle the rest.',
  },
  {
    q: 'What does it cost?',
    a: 'The teardown is free. The Fix starts at $1,500 fixed price, and the first 2 owners this season get it for $750 in exchange for a case study.',
  },
  {
    q: 'Which areas do you cover?',
    a: "Independent stays across Washington, Oregon and North Idaho, from Lake Chelan and Leavenworth to Cannon Beach and Bend. Everything is done remotely, so if you're just outside the map, ask.",
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="label m-0 text-slate">FAQ</p>
          <h2 className="mt-3 text-[clamp(40px,6vw,76px)]">Straight answers.</h2>
          <p className="mt-5 max-w-sm text-lg text-basalt/80">
            Anything else, email <a href="mailto:abhimanyu@lodgepnw.com" className="font-semibold text-fir">abhimanyu@lodgepnw.com</a>.
          </p>
        </div>
        <div className="relative pt-16">
          <MascotSlot id="faq-peek" className="absolute right-6 top-[10px] z-10" />
          <div className="card relative z-[11] divide-y-2 divide-basalt bg-paper">
            {faqs.map((f, i) => (
              <details key={f.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 font-display text-[24px] font-extrabold uppercase leading-tight md:px-6 md:text-[28px] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-basalt bg-lichen font-mono text-xl" aria-hidden="true">
                    <span className="transition-transform duration-200 group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="m-0 px-5 pb-6 text-[16.5px] leading-relaxed text-basalt/85 md:px-6">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  )
}
