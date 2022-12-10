import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { path, concat } from 'ramda'

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

  return (<div>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div><label htmlFor="signup-username">Username:</label><input id={USERNAME_ID} type="text" /></div>
        <div><label htmlFor="signup-password">Password:</label><input id={PASSWORD_ID} type="password" /></div>
        <input type="submit" value="send" disabled={loading} />
      </form>
    }

  </div>)

}