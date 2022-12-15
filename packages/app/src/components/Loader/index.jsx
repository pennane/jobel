import classes from './style.module.css'
import { repeat } from 'ramda'

const FakePost = ({ i }) => {
  return <div style={{ animationDelay: .1 * i + 's' }} className={classes.post}>
  </div>
}

export const Loader = ({ loading }) => {
  if (!loading) return null
  return (
    <div className={classes.wrapper}>
      {repeat(0, 10).map((_, i) => <FakePost i={i} key={i} />)}
    </div>
  )
}