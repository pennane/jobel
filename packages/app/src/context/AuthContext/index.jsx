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

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken())
  const [user, setUser] = useState(getStoredUser())

  const login = ({ userName, password }) => {
    if (!userName || !password) return


    fetch(`${API_BASE_URL}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userName, password })
    })
      .then(res => res.json())
      .then(({ token, user }) => {
        setToken(token)
        setUser(user)
      })

  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(token))
  }, [token])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, token }}>
      {children}
    </AuthContext.Provider>
  )
}
