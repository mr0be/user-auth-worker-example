import { Hono } from 'hono'
import { setCookie, getCookie } from 'hono/cookie'


async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
  );
  const derivedBits = await crypto.subtle.deriveBits(
      {
          name: 'PBKDF2',
          salt: enc.encode(salt),
          iterations: 100000,
          hash: 'SHA-256',
      },
      keyMaterial,
      256
  );
  return Array.from(new Uint8Array(derivedBits))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
}

type Bindings = {
  DB: D1Database,
  SALT_TOKEN: string

}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/api/login', async (c) => {
  const { username, password } = await c.req.json()


  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE username = ?'
  ).bind(username).first<{ password: string }>()

  if (!user) {
    return c.json({ success: false, message: 'User not found' }, 401)
  }

  const passwordhash =  await hashPassword(password,c.env.SALT_TOKEN);
  if (passwordhash !== user.password){
	return c.json({ success: false, message: 'Wrong password' }, 401)
  }

  await setCookie(c, 'session', username, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'Strict',
    maxAge: 3600
  })

  return c.json({ success: true })
})

app.get('/api/session', async (c) => {
	const session = getCookie(c, 'session')
	if (!session) return c.json({ authenticated: false }, 401)
	return c.json({ authenticated: true })
  })

export default app