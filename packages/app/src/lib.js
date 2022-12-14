import { API_BASE_URL } from './constants'

export const getMorePosts = (token) => {
  return async ({ pageParam }) => {
    const res = await fetch(
      `${API_BASE_URL}posts?olderThan=${pageParam || ''}`,
      {
        ...(token
          ? {
              headers: {
                Authorization: `bearer ${token}`,
              },
            }
          : {}),
      }
    )
    const json = await res.json()
    if (!String(res.status).startsWith(2))
      throw { error: json.error, code: res.status }
    return json
  }
}
export const getPost = (token) => async (id) => {
  const res = await fetch(`${API_BASE_URL}posts/${id}`, {
    ...(token
      ? {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      : {}),
  })
  const json = await res.json()
  if (!String(res.status).startsWith(2))
    throw { error: json.error, code: res.status }
  return json
}

export const createPost = (token) => async (data) => {
  const res = await fetch(`${API_BASE_URL}posts`, {
    method: 'POST',
    body: JSON.stringify({ content: data }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  })
  const json = await res.json()
  if (!String(res.status).startsWith(2))
    throw { error: json.error, code: res.status }
  return json
}

export const createComment =
  (token) =>
  async ({ content, id }) => {
    const res = await fetch(`${API_BASE_URL}comments/${id}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
    })
    const json = await res.json()
    if (!String(res.status).startsWith(2))
      throw { error: json.error, code: res.status }
    return json
  }

export const vote =
  (token) =>
  async ({ score, id, isComment }) => {
    const res = await fetch(
      `${API_BASE_URL}vote/${isComment ? 'comment' : 'post'}/${id}`,
      {
        method: 'POST',
        body: JSON.stringify({ score }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
      }
    )
    const json = await res.json()
    if (!String(res.status).startsWith(2))
      throw { error: json.error, code: res.status }
    return json
  }

export const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
