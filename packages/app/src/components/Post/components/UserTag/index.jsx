
import classes from './style.module.css'

const parseVisibleUserId = (id) => id === 0 ? 'oj' : id

export const UserTag = ({ visibleUserId }) => {
  return (
    <div className={classes.userTag}>
      <span>@{parseVisibleUserId(visibleUserId)}</span>
    </div>
  )

}