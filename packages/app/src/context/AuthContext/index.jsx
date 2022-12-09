import { createContext, useState, useEffect, React } from 'react'
import { API_BASE_URL } from '../../constants'

export const AuthContext = createContext()

const LOCAL_STORAGE_TOKEN_KEY = "jobel-auth-token"
const LOCAL_STORAGE_USER_KEY = "jobel-user"

const getStoredToken = () => String(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) || null

const getStoredUser = () => {
  const userString = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
  if (!userString) return null
  try {
    return JSON.parse(userString)
  } catch {
    return null
  }
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
  return json
}

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken())
  const [user, setUser] = useState(getStoredUser())

  const setAuthValues = ({ user, token }) => {
    setToken(token)
    setUser(user)
  }

  const login = async ({ userName, password }) => {
    if (!userName || !password) return

    const { token, user } = await authPost('login', { userName, password })
    setAuthValues({ token, user })
  }


  const signup = async ({ userName, password }) => {
    if (!userName || !password) return

    const { token, user } = await authPost('signup', { userName, password })
    setAuthValues({ token, user })
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token))
  }, [token])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, signup, token, isLoggedIn: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
