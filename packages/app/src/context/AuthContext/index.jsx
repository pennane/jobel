import { isNil } from 'ramda'
import { createContext, useState, useEffect, React } from 'react'
import { API_BASE_URL } from '../../constants'

export const AuthContext = createContext()

const LOCAL_STORAGE_TOKEN_KEY = "jobel-auth-token"
const LOCAL_STORAGE_USER_KEY = "jobel-user"

const getLocalStorageValue = (key) => {
  try {
    const [value] = JSON.parse(localStorage.getItem(key))
    if (isNil(value)) return null
    return value
  } catch {
    return null
  }
}

const setLocalStorageValue = (key, value) => {
  if (isNil(value)) {
    localStorage.removeItem(key)
    return
  }
  localStorage.setItem(key, JSON.stringify([value]))
}




const authPost = async (endpoint, data) => {
  const response = await fetch(`${API_BASE_URL}auth/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const json = await response.json()

  if (!String(response.status).startsWith(2))
    throw { error: json.error, code: response.status }

  return json
}

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY))
  const [user, setUser] = useState(getLocalStorageValue(LOCAL_STORAGE_USER_KEY))

  const setAuthValues = ({ user, token }) => {
    setToken(token)
    setUser(user)
  }

  const login = async ({ userName, password, onSuccess, onError }) => {
    if (!userName || !password) return
    try {
      const { token, user } = await authPost('login', { userName, password })
      setAuthValues({ token, user })
      onSuccess({ token, user })
    } catch (e) {
      onError(e)
    }

  }


  const signup = async ({ userName, password, onSuccess, onError }) => {
    if (!userName || !password) return

    try {
      const { token, user } = await authPost('signup', { userName, password })
      setAuthValues({ token, user })
      onSuccess({ token, user })
    } catch (e) {
      onError(e)
    }


  }

  const logout = async ({ onSuccess }) => {
    setToken(null)
    setUser(null)
    onSuccess()
  }

  useEffect(() => {
    setLocalStorageValue(LOCAL_STORAGE_TOKEN_KEY, token)
  }, [token])

  useEffect(() => {
    setLocalStorageValue(LOCAL_STORAGE_USER_KEY, user)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, signup, token, isLoggedIn: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
