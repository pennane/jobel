import { Link } from 'react-router-dom'
import classes from '../../layouts/RootLayout/style.module.css'

export const NewPostButton = () => {
  return (
    <div className={classes.createPostLink}>
      <Link to="/createpost">➕</Link>
    </div>
  )
}