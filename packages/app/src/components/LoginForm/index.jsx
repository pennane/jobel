import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'
import { Form } from '../Form'
import { InputButton } from '../InputButton';
import { InputText } from '../InputText'

const createLoginFormId = concat('login-')
const USERNAME_ID = createLoginFormId('username')
const PASSWORD_ID = createLoginFormId('password')

export const LoginForm = () => {
  const { user, isLoggedIn, login } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await login({ userName, password })
    setLoading(false)
  }

  return (<div className={classes.loginForm}>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <Form onSubmit={handleLogin}>
        <div><label htmlFor="login-username">Käyttäjätunnus:</label><InputText id={USERNAME_ID} maxLength={24} /></div>
        <div><label htmlFor="login-password">Salasana: </label><InputText id={PASSWORD_ID} type="password" maxLength={30} /></div>
        <InputButton type="submit" value="Log in" disabled={loading} />
      </Form>
    }
  </div >)

}
