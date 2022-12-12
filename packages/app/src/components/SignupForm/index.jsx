import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'
import classes from '../../views/SettingsView/style.module.css'

const createSignupFormId = concat("signup-")
const USERNAME_ID = createSignupFormId("username")
const PASSWORD_ID = createSignupFormId("password")

export const SignupForm = () => {

  const { signup, user, isLoggedIn } = useAuthContext();
  const [loading, setLoading] = useState(false)

  const handleSignup = async (event) => {
    setLoading(true)
    event.preventDefault();

    const userName = path(['target', USERNAME_ID, 'value'], event)
    const password = path(['target', PASSWORD_ID, 'value'], event)

    await signup({ userName, password })
    setLoading(false)
  }

  return (<div className={classes.signupForm}>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div><label htmlFor="signup-username">Username:</label><input id={USERNAME_ID} type="text" maxLength={24} /></div>
        <div><label htmlFor="signup-password">Password: </label><input id={PASSWORD_ID} type="password" maxLength={30} /></div>
        <input type="submit" value="Sign up" disabled={loading} />
      </form>
    }

  </div>)

}