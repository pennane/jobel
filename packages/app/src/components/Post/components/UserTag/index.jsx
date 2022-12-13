import classes from './style.module.css'

const parseVisibleUserId = (id) => (id === 0 ? 'og' : id)

export const UserTag = ({ visibleUserId }) => {
  return (
    <div className={classes.userTag}>
      <span>@{parseVisibleUserId(visibleUserId)}</span>
    </div>
  )
}
