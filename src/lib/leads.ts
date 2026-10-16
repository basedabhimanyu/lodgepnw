// Teardown requests go to the inbox through Web3Forms (https://web3forms.com), a form-to-email
// service. The access key is set at build time as VITE_WEB3FORMS_KEY; it is designed to be
// public and only lets this form send to the inbox it was created for.

export const contactEmail = 'abhimanyu@lodgepnw.com'

const endpoint = 'https://api.web3forms.com/submit'
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

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
  if (!accessKey) {
    console.warn('VITE_WEB3FORMS_KEY is not set; showing the email fallback.')
    return false
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Teardown request: ${req.website}`,
        from_name: 'LodgePNW website',
        replyto: req.email,
        Name: req.name || '(not given)',
        Email: req.email,
        Website: req.website,
        'Booking engine': req.engine,
        Form: req.form,
        'Pinned destination': req.destination || '(none)',
        Page: req.page,
      }),
    })
    const body = (await res.json().catch(() => ({}))) as { success?: boolean }
    return res.ok && body.success === true
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
