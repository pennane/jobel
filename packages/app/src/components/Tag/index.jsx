import classes from './style.module.css'

export const Tag = ({children}) => {
  return (
    <div className={classes.tag}>
      <span>{children}</span>
    </div>
  )
}
