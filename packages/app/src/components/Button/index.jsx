import classes from './style.module.css'

export const Button = ({ children, ...rest }) => {
  return <button className={classes.button} {...rest}> {children}</button>
}