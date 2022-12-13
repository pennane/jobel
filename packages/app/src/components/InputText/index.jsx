import classes from './style.module.css'

export const InputText = ({ ...rest }) => {
  return <input type="text" className={classes.input} {...rest}></input>
}