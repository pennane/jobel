import { useState } from 'react'
import { API_BASE_URL } from '../../constants'
import { useAuthContext } from '../useAuthContext'

export const useApiPost = (endpoint) => {
  const { token, logout } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const fetchData = (data) => {
    if (loading || !endpoint) return
    setLoading(true)

    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          return setData(json)
        }
        if (json.code == 401) {
          logout()
        }
        throw json.error
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  return { loading, error, data, fetchData }
}
