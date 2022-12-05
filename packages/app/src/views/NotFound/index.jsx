import { Link } from 'react-router-dom'
import classes from './style.module.css'

export const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <h1>404 not found</h1>
      <p>Requested page does not exist in this cicd demo thing</p>
      <Link to="/">back home</Link>
    </div>
  )
}