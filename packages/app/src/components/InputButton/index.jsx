import classes from './style.module.css'

export const InputButton = ({ ...rest }) => {
  return <input type="submit" className={classes.button} {...rest}></input>
}