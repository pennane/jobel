import { useAuthContext } from '../../hooks/useAuthContext'

export const LogoutButton = () => {
  const { logout } = useAuthContext()

  return (
    <div>
      <button onClick={logout}>Kirjaudu ulos</button>
    </div>
  )
}
