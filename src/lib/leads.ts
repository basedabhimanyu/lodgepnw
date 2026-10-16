// Teardown requests go to the inbox through FormSubmit (https://formsubmit.co), a form-to-email
// service with no account: the first submission emails an activation link to the inbox, and
// once that is clicked every request arrives as an email. Until then (or if it is ever down)
// the form falls back to a pre-filled email, so no lead is lost.

export const contactEmail = 'abhimanyu@lodgepnw.com'

// FormSubmit's alias for that inbox (sent after activation), so the address isn't in the
// form's endpoint. VITE_FORMSUBMIT_ID can override it.
const formId = (import.meta.env.VITE_FORMSUBMIT_ID as string | undefined) || '2e731b3f4a61c6c0ece89e7315f123cb'
const endpoint = `https://formsubmit.co/ajax/${formId}`

export type TeardownRequest = {
  name: string
  email: string
  website: string
  engine: string
  form: string
  destination: string
  page: string
  botcheck: boolean
}

// Resolves true when the request reached the inbox.
export async function submitTeardown(req: TeardownRequest): Promise<boolean> {
  // A filled spam trap gets a fake success and is never sent.
  if (req.botcheck) return true
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Teardown request: ${req.website}`,
        _replyto: req.email,
        _template: 'table',
        _captcha: 'false',
        Name: req.name || '(not given)',
        Email: req.email,
        Website: req.website,
        'Booking engine': req.engine,
        Form: req.form,
        'Pinned destination': req.destination || '(none)',
        Page: req.page,
      }),
    })
    const body = (await res.json().catch(() => ({}))) as { success?: boolean | string }
    return res.ok && String(body.success) === 'true'
  } catch {
    return false
  }
}

export function teardownMailto(req: TeardownRequest) {
  const body = [
    'Hi Abhimanyu, I would like a free direct booking teardown.',
    '',
    `Website: ${req.website}`,
    `Booking engine: ${req.engine}`,
    `Name: ${req.name}`,
    `Email: ${req.email}`,
  ].join('\n')
  return `mailto:${contactEmail}?subject=${encodeURIComponent(`Teardown request: ${req.website}`)}&body=${encodeURIComponent(body)}`
}
