import classes from './style.module.css'

export const InputText = ({ ...rest }) => {
  return <input type="test" className={classes.input} {...rest}></input>
}