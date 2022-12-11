import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../constants'
import { useAuthContext } from '../useAuthContext'

export const useApiGet = (endpoint, skip) => {
  const { token } = useAuthContext()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (skip) return

    const controller = new AbortController()
    const signal = controller.signal

    fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
      signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          throw error
        }
        setData(json)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))

    return () => {
      setLoading(false)
    }
  }, [endpoint, skip])

  return { loading, error, data }
}
