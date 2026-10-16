import { useId, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { useDestination } from '../lib/destination'
import { contactEmail, submitTeardown, teardownMailto, type TeardownRequest } from '../lib/leads'

export const bookingEngines = ['OwnerRez', 'Lodgify', 'Hostaway', 'Guesty', 'Hospitable', 'Cloudbeds', 'Other / none']

type Status = 'idle' | 'sending' | 'sent' | 'error'

// The free teardown request. Sends to the inbox via lib/leads; if sending fails, the visitor
// gets a pre-filled email instead so the lead isn't lost.
export function TeardownForm({ variant = 'hero' }: { variant?: 'hero' | 'full' }) {
  const [status, setStatus] = useState<Status>('idle')
  const [request, setRequest] = useState<TeardownRequest | null>(null)
  const { pinned } = useDestination()
  const uid = useId()
  const cta = pinned ? `Get my ${pinned} teardown` : 'Get my free teardown'

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    const data = new FormData(e.currentTarget)
    const req: TeardownRequest = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      website: String(data.get('website') ?? '').trim(),
      engine: String(data.get('engine') ?? ''),
      form: variant === 'hero' ? 'Hero form' : 'Final form',
      destination: pinned ?? '',
      page: window.location.href,
      botcheck: data.get('botcheck') === 'on',
    }
    setRequest(req)
    setStatus('sending')
    setStatus((await submitTeardown(req)) ? 'sent' : 'error')
  }

  if (status === 'sent') {
    return (
      <div className="card flex items-start gap-4 bg-lichen p-5" role="status" aria-live="polite">
        <span className="stamp shrink-0 -rotate-6 text-fir">ON IT</span>
        <p className="m-0 font-semibold leading-snug">
          Bandit's on it. Your teardown video lands in your inbox within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-3" aria-label="Request a free direct booking teardown">
      {/* Spam trap: hidden from people, filled in by bots. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {variant === 'full' && (
        <Field id={`${uid}-name`} label="Your name">
          <input id={`${uid}-name`} name="name" className="field" autoComplete="name" required />
        </Field>
      )}
      <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <Field id={`${uid}-site`} label="Property website">
          <input
            id={`${uid}-site`}
            name="website"
            className="field"
            inputMode="url"
            autoComplete="url"
            placeholder="yourcabin.com"
            required
          />
        </Field>
        <Field id={`${uid}-engine`} label="Booking engine">
          <select id={`${uid}-engine`} name="engine" className="field" defaultValue="" required>
            <option value="" disabled>
              Pick one
            </option>
            {bookingEngines.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={`${uid}-email`} label="Email for your video">
        <input id={`${uid}-email`} name="email" type="email" className="field" autoComplete="email" placeholder="you@yourcabin.com" required />
      </Field>
      <button type="submit" className="btn w-full disabled:cursor-wait disabled:opacity-80" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : cta}
        {status !== 'sending' && <Arrow />}
      </button>
      {status === 'error' && request ? (
        <p className="m-0 border-2 border-basalt bg-paper p-3 text-[15px] leading-snug text-basalt" role="alert">
          That didn't go through.{' '}
          <a href={teardownMailto(request)} className="font-semibold text-fir">
            Send it by email instead
          </a>{' '}
          and it lands in the same inbox ({contactEmail}).
        </p>
      ) : (
        <p className="label m-0 text-slate">Free · 5-minute video · No call needed</p>
      )}
    </form>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="label text-basalt">
        {label}
      </label>
      {children}
    </div>
  )
}

export function Arrow() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M3 10h13M11 4l6 6-6 6" />
    </svg>
  )
}
