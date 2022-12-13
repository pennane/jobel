import { API_BASE_URL } from './constants'
export const getMorePosts = async ({ pageParam }) => {
  const res = await fetch(`${API_BASE_URL}posts?olderThan=${pageParam || ''}`)
  return await res.json()
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

export const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min
