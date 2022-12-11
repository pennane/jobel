import dotenv from 'dotenv'
dotenv.config()

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { createHmac } from 'node:crypto'
import { pick, pipe, map } from 'ramda'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line no-undef
const { OG_ENCRYPTION_KEY, VITE_BACKEND_URL, OG_URL, NODE_ENV } = process.env
const API_BASE_URL = `${VITE_BACKEND_URL}/api/v1/`
const POST_ID_REGEX = /^\/posts\/(?<id>[\w\d]+)/
const OG_PARTS = ['content', 'score', 'commentCount', 'timeStamp']

const createToken = async (post) => {
  const hmac = createHmac('sha256', OG_ENCRYPTION_KEY)
  hmac.update(JSON.stringify(post, null, ''))
  const token = hmac.digest('hex')
  return token
}

const getPostIdFromRoute = (route) => {
  const match = POST_ID_REGEX.exec(route)
  if (!match) return null
  return match.groups.id
}

const fetchPost = async (id) => {
  try {
    const path = `${API_BASE_URL}posts/og/${id}`
    const res = await fetch(path)
    if (!res.ok) return null
    const post = await res.json()
    return pipe(
      pick(OG_PARTS),
      map((v) => String(v))
    )(post)
  } catch {
    return null
  }
}

const createMetaFromPost = async (post) => {
  return `<meta
    property="og:image"
    content="${OG_URL}/api/encrypted?token=${await createToken(
    post
  )}&${Object.entries(post)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')}"
  />`
}

const createHtmlEnrichment = async (url) => {
  const postId = getPostIdFromRoute(url)
  if (!postId) return ''
  const post = await fetchPost(postId)
  if (!post) return ''
  const meta = await createMetaFromPost(post)
  return meta
}

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let template = fs.readFileSync(
        path.resolve(
          __dirname,
          NODE_ENV === 'production' ? 'dist/client/index.html' : 'index.html'
        ),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      const html = template.replace(
        `<!--ssr-outlet-->`,
        await createHtmlEnrichment(url)
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  app.listen(5173, () => {
    console.log('Listening on port 5173')
  })
}

createServer()
