import { CounterButton } from "../../components/CounterButton"
import { LoginForm } from "../../components/LoginForm"
import { LogoutButton } from "../../components/LogoutButton"
import { SignupForm } from "../../components/SignupForm"
import classes from './style.module.css'

export const MainView = () => {
  return (
    <div className={classes.mainView}>
      <h1>This is the main view</h1>
      <CounterButton />
      <LoginForm />
      <LogoutButton />
      <SignupForm />
    </div>
  )
}