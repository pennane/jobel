import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { Vote } from './components/Vote'
import { UserTag } from './components/UserTag'
import { useAuthContext } from '../../hooks/useAuthContext'

const getIntlTimeAgo = (input) => {
  const date = input instanceof Date ? input : new Date(input)
  const formatter = new Intl.RelativeTimeFormat()
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }


  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key]
      return formatter.format(Math.round(delta), key)
    }
  }
}

const parseCommentsText = (n) => {
  if (n === 1) return n + 'kommentti'
  return n + ' kommenttia'
}

export const Post = ({
  timeStamp,
  _id,
  commentCount,
  isComment,
  score,
  content,
  withLink,
  color,
  visibleUserId,
  hideVisibleUserId,
}) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthContext()
  const handleOpenPostView = () => withLink && navigate(`/posts/${_id}`)

  return (
    <div
      className={`${classes.post} background-color${color}`}
      id={_id}
      onClick={handleOpenPostView}
      style={withLink ? { cursor: 'pointer' } : {}}
    >
      <section className={classes.section}>
        <header className={classes.header}>
          {!hideVisibleUserId && <UserTag visibleUserId={visibleUserId} />}{' '}
          {getIntlTimeAgo(timeStamp)}
        </header>
        <main className={classes.main}>{content}</main>
        {!isComment && (
          <footer className={classes.footer}>{parseCommentsText(commentCount)}</footer>
        )}
      </section>
      <aside className={classes.aside}>
        <Vote score={score} isLoggedIn={isLoggedIn} />
      </aside>
    </div>
  )
}
