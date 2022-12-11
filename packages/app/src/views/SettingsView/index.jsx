import classes from './style.module.css'
import { LoginForm } from '../../components/LoginForm'
import { LogoutButton } from '../../components/LogoutButton'
import { useAuthContext } from '../../hooks/useAuthContext'
import { SignupForm } from '../../components/SignupForm'

export const SettingsView = () => {
  const { isLoggedIn } = useAuthContext()

  return (
    <div className={classes.mainView}>
      {isLoggedIn && <LogoutButton />}
      {!isLoggedIn && (
        <>
          <LoginForm />
          <SignupForm />
        </>
      )}
    </div>
  )
}
