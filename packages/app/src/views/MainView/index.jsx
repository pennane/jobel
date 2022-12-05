import { CounterButton } from "../../components/CounterButton"
import classes from './style.module.css'

export const MainView = () => {
  return (
    <div className={classes.mainView}>
      <h1>This is the main view</h1>
      <CounterButton />
    </div>
  )
}