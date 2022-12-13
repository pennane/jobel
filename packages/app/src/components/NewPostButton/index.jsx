import { Link } from 'react-router-dom'
import classes from './style.module.css'

export const NewPostButton = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.createPostLink}>
        <Link to="/createpost">➕</Link>
      </div>
    </div>

  )
}