import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'

const createLoginFormId = concat("login-")
const USERNAME_ID = createLoginFormId("username")
const PASSWORD_ID = createLoginFormId("password")

export const LoginForm = () => {

  const { user, isLoggedIn, login } = useAuthContext();
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await login({ userName, password })
    setLoading(false)

  }

  return (<div className={classes.loginForm}>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <form onSubmit={handleLogin}>
        <h3>Log in</h3>
        <div><label htmlFor="login-username">Username:</label><input id={USERNAME_ID} type="text" /></div>
        <div><label htmlFor="login-password">Password: </label><input id={PASSWORD_ID} type="password" /></div>
        <input type="submit" value="Log in" disabled={loading} />
      </form>
    }
  </div >)

}