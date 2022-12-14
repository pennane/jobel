import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'
import { InputButton } from '../InputButton';
import { Form } from '../Form';
import { InputText } from '../InputText';
import { useQueryClient } from 'react-query'

const createSignupFormId = concat('signup-')
const USERNAME_ID = createSignupFormId('username')
const PASSWORD_ID = createSignupFormId('password')

export const SignupForm = () => {
  const { signup, user, isLoggedIn } = useAuthContext()
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSignup = async (event) => {
    setLoading(true)
    event.preventDefault()

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await signup({ userName, password })
    queryClient.invalidateQueries('posts')
  }

  return (<div className={classes.signupForm}>
    {isLoggedIn && "kirjautuneena " + user.userName}
    {!isLoggedIn &&
      <Form onSubmit={handleSignup}>
        <div><label htmlFor="signup-username">Käyttäjätunnus:</label><InputText id={USERNAME_ID} maxLength={24} /></div>
        <div><label htmlFor="signup-password">Salasana: </label><InputText autoComplete='new-password' id={PASSWORD_ID} type="password" maxLength={30} /></div>
        <InputButton type="submit" value="Luo käyttäjätili" disabled={loading} />
      </Form>
    }

  </div>)

}
