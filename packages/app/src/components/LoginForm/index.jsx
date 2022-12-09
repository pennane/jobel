import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'

export const LoginForm = () => {

  const { user, isLoggedIn, login } = useAuthContext();
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)

    const userName = e.target.username.value
    const password = e.target.password.value

    await login({ userName, password })
    setLoading(false)
  }

  return (<div>
    {isLoggedIn && "logged in as " + user.userName}
    {!isLoggedIn &&
      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <div><label htmlFor="login-username">Username:</label><input id="login-username" type="text" /></div>
        <div><label htmlFor="login-password">Password:</label><input id="login-password" type="password" /></div>
        <input type="submit" value="send" disabled={loading} />
      </form>
    }

  </div >)

}