import classes from './style.module.css'
import { LoginForm } from '../../components/LoginForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { SignupForm } from '../../components/SignupForm'
import { LogoutButton } from '../../components/LogoutButton'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { SHOW_LOGIN_AS_DEFAULT } from '../../constants'

const getBackgroundColor = (isLoggedIn, showLogin) => {
  if (!isLoggedIn && !showLogin) return "var(--color4)"
  return "var(--bg-color5)"
}

export const SettingsView = () => {
  const { isLoggedIn } = useAuthContext()
  const [showLogin, setShowLogin] = useState(SHOW_LOGIN_AS_DEFAULT)

  const toggleView = () => {
    setShowLogin(!showLogin)
  }

  const text = showLogin ? 'Uusi täällä? Luo käyttäjä' : 'Kirjaudu olemassaolevalle käyttäjälle'


  return (
    <div className={classes.mainView} style={{ backgroundColor: getBackgroundColor(isLoggedIn, showLogin) }}>
      {isLoggedIn && (
        <div>
          <LogoutButton />
        </div>
      )}
      {!isLoggedIn && (
        <>
          {showLogin ? <LoginForm className={classes.loginForm} /> : <SignupForm className={classes.signupForm} />}
          <Button style={{ padding: "1rem", backgroundColor: "var(--secondary-color4)" }} onClick={toggleView}>{text}</Button>
        </>
      )}
    </div >
  )
}
