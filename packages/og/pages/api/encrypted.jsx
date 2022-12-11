// This function verifies the token to prevent generating images with random parameters (`id`).

import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge',
};

const OG_PARTS = ['content', 'score', 'commentCount', 'timeStamp']

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(process.env.OG_ENCRYPTION_KEY),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign'],
);

function toHex(arrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('');
}

export default async function handler(req) {
  const { searchParams } = req.nextUrl;

  const post = Object.fromEntries(OG_PARTS.map(key => [key, searchParams.get(key)]))
  console.log(JSON.stringify(post, null, ""));
  const token = searchParams.get('token');

  const verifyToken = toHex(
    await crypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(JSON.stringify(post, null, "")),
    ),
  );


  if (token !== verifyToken) {
    return new Response('Invalid token.', { status: 401 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Card generated, content={post.content} score={post.score} comments={post.commentCount}.</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}