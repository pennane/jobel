import { useState } from 'react';
import { API_BASE_URL } from '../../constants'
import { useAuthContext } from '../../hooks/useAuthContext'

export const SignupForm = () => {

  const { signup, user, isLoggedIn } = useAuthContext();
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();

    const userName = e.target.username.value
    const password = e.target.password.value

    await signup({ userName, password })
    setLoading(false)
  }

  return (<div>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&

      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <div><label htmlFor="username">Username:</label><input id="username" type="text" /></div>
        <div><label htmlFor="password">Password:</label><input id="password" type="password" /></div>
        <input type="submit" value="send" disabled={loading} />
      </form>
    }

  </div>)

}