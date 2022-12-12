import { API_BASE_URL } from './constants'
export const getMorePosts = async ({ pageParam }) => {
  const res = await fetch(`${API_BASE_URL}posts?olderThan=${pageParam || ''}`)
  return await res.json()
}
