import { scrypt as deriveKey, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(deriveKey);

function result(status, authorized = false, extraHeaders = {}) {
  return Response.json({ authorized }, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  });
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return result(405, false, { Allow: 'POST' });
    }

    const contentType = request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase();
    if (contentType !== 'application/json') return result(415);

    const verifier = process.env.GAME_OVERLAY_ADMIN_SCRYPT?.match(/^([a-f0-9]{32}):([a-f0-9]{128})$/);
    if (!verifier) return result(503);

    const body = await request.json().catch(() => null);
    const key = body?.key;
    if (typeof key !== 'string' || !key || Buffer.byteLength(key, 'utf8') > 128) {
      return result(400);
    }

    const salt = Buffer.from(verifier[1], 'hex');
    const expected = Buffer.from(verifier[2], 'hex');
    const actual = await scrypt(key, salt, expected.length);
    return timingSafeEqual(actual, expected) ? result(200, true) : result(401);
  },
};
