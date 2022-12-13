import { useAuthContext } from '../../hooks/useAuthContext'
import { Button } from '../Button'
export const LogoutButton = () => {
  const { logout } = useAuthContext()

  return (<div>
    <Button onClick={logout}>Kirjaudu ulos</Button>
  </div >)
}
