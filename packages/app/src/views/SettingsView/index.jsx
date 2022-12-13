import classes from './style.module.css'
import { LoginForm } from '../../components/LoginForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { SignupForm } from '../../components/SignupForm'
import { LogoutButton } from '../../components/LogoutButton'
import { useState } from 'react'
import { Button } from '../../components/Button'

export const SettingsView = () => {
  const { isLoggedIn } = useAuthContext()
  const [formVisibility, setFormVisibility] = useState(true)

  const toggleSignup = () => {
    setFormVisibility(!formVisibility)
  }

  return (
    <div className={classes.mainView}>
      {isLoggedIn && <LogoutButton />}
      {!isLoggedIn && (
        (formVisibility ?
          <><LoginForm className={classes.loginForm} /> <Button onClick={toggleSignup}>Luo käyttäjätili</Button></>
          : <> <SignupForm className={classes.signupForm} /> <Button onClick={toggleSignup}>Kirjaudu sisään</Button></>)
      )}
    </div >
  )
}
