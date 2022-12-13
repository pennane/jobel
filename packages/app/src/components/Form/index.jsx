import classes from './style.module.css'
export const Form = ({ contentStyle, children, ...rest }) => {

  return <form className={classes.form}  {...rest}>
    <div className={classes.content} style={contentStyle}>
      {children}
    </div>

  </form>
}