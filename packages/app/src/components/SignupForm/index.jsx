import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'
import { InputButton } from '../InputButton'
import { Form } from '../Form'
import { InputText } from '../InputText'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toast } from '../Toast'
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from '../../constants'

const createSignupFormId = concat('signup-')
const USERNAME_ID = createSignupFormId('username')
const PASSWORD_ID = createSignupFormId('password')

export const SignupForm = () => {
  const { signup, user, isLoggedIn } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const handleSuccess = () => {
    queryClient.invalidateQueries()
    toast(<Toast>Uusi käyttäjätili luotu</Toast>)
    navigate('/')
  }

  const handleError = (error) => {
    toast(<Toast>Error: {error.error}</Toast>)
  }

  const handleSignup = async (event) => {
    setLoading(true)
    event.preventDefault()

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await signup({
      userName,
      password,
      onSuccess: handleSuccess,
      onError: handleError,
    })

    setLoading(false)
  }

  return (
    <div className={classes.signupForm}>
      {isLoggedIn && 'kirjautuneena ' + user?.profile?.userName}
      {!isLoggedIn && (
        <Form onSubmit={handleSignup}>
          <div>
            <label htmlFor="signup-username">Käyttäjätunnus:</label>
            <InputText id={USERNAME_ID} maxLength={MAX_USERNAME_LENGTH} minLength={MIN_USERNAME_LENGTH} />
          </div>
          <div>
            <label htmlFor="signup-password">Salasana: </label>
            <InputText
              autoComplete="new-password"
              id={PASSWORD_ID}
              type="password"
              maxLength={MAX_PASSWORD_LENGTH}
              minLength={MIN_PASSWORD_LENGTH}
            />
          </div>
          <InputButton
            type="submit"
            value="Luo käyttäjätili"
            disabled={loading}
          />
        </Form>
      )}
    </div>
  )
}
