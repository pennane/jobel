import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'
import { Form } from '../Form'
import { InputButton } from '../InputButton';
import { InputText } from '../InputText'
import { useQueryClient } from 'react-query'

const createLoginFormId = concat('login-')
const USERNAME_ID = createLoginFormId('username')
const PASSWORD_ID = createLoginFormId('password')

export const LoginForm = () => {
  const { user, isLoggedIn, login } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await login({ userName, password })
    queryClient.invalidateQueries('posts')
    setLoading(false)
  }

  return (<div className={classes.loginForm}>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <Form onSubmit={handleLogin}>
        <div><label htmlFor="login-username">Käyttäjätunnus:</label><InputText id={USERNAME_ID} maxLength={24} /></div>
        <div><label htmlFor="login-password">Salasana: </label><InputText id={PASSWORD_ID} type="password" maxLength={30} /></div>
        <InputButton type="submit" value="Kirjaudu sisään" disabled={loading} />
      </Form>
    }
  </div >)

}
