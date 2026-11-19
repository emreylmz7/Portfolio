// Cloudflare Pages Function behind the contact form (POST /api/contact).
//
// It checks the Turnstile token, so only visitors who passed the bot check get
// through, and then forwards the message to Formspree. The Formspree form ID and
// the Turnstile secret are Pages secrets, so bots cannot read the form endpoint
// from the page and post to it directly.
//
// Secrets (Pages project → Settings → Variables and Secrets):
//   TURNSTILE_SECRET_KEY  secret key of the Turnstile widget
//   FORMSPREE_FORM_ID     ID of the Formspree form that emails the messages

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  FORMSPREE_FORM_ID?: string;
}

interface Context {
  request: Request;
  env: Env;
}

const MAX_NAME = 200;
const MAX_MESSAGE = 5000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

async function passedTurnstile(token: string, secret: string, ip: string | null) {
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  });
  if (!response.ok) return false;
  const outcome = (await response.json()) as { success?: boolean };
  return outcome.success === true;
}

export const onRequestPost = async ({ request, env }: Context) => {
  if (!env.TURNSTILE_SECRET_KEY || !env.FORMSPREE_FORM_ID) {
    console.error('Contact form secrets are not set');
    return reply(500, { error: 'not-configured' });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(400, { error: 'invalid' });
  }
  const field = (name: string) => String(form.get(name) ?? '').trim();

  // The hidden honeypot was filled in: answer as if it worked, so the bot moves on.
  if (field('_gotcha')) return reply(200, { ok: true });

  const name = field('name');
  const email = field('email');
  const message = field('message');
  if (!name || name.length > MAX_NAME || !EMAIL.test(email) || !message || message.length > MAX_MESSAGE) {
    return reply(400, { error: 'invalid' });
  }

  const token = field('cf-turnstile-response');
  const human =
    token !== '' &&
    (await passedTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP')));
  if (!human) return reply(403, { error: 'verification' });

  const forward = new FormData();
  forward.set('name', name);
  forward.set('email', email);
  forward.set('topic', field('topic'));
  forward.set('message', message);
  forward.set('_language', field('_language'));

  const delivered = await fetch(`https://formspree.io/f/${env.FORMSPREE_FORM_ID}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: forward,
  });
  if (!delivered.ok) {
    console.error(`Formspree responded with ${delivered.status}`);
    return reply(502, { error: 'delivery' });
  }

  return reply(200, { ok: true });
};
