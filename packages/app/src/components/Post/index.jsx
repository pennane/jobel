import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { Vote } from './components/Vote'
import { UserTag } from './components/UserTag'
import { useAuthContext } from '../../hooks/useAuthContext'
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '../Toast'

const parseJobel = (content) => {
  if (!content.includes(":jobel:")) return content

  return (<>
    {content.split(':jobel:').map((str, i) => <React.Fragment key={i}>
      {i > 0 && <img className='jobel' src={'/32.png'} />}
      <span>{str}</span>
    </React.Fragment>)}
  </>)
}

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
  hasVoted,
}) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthContext()
  const handleOpenPostView = () => withLink && navigate(`/posts/${_id}`)

  const handleShare = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/posts/${_id}`)
  
    toast(<Toast>Kopioitu leikepöydälle! </Toast> ,{
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
      });
  }

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
        <main className={classes.main}>{parseJobel(content)}</main>
        {!isComment && (
          <footer className={classes.footer}>{parseCommentsText(commentCount)}
        
          <div className={classes.shareButton} onClick={handleShare}>🔗</div>
          </footer>
        )}
      </section>
      <aside className={classes.aside}>
        <Vote score={score} isLoggedIn={isLoggedIn} hasVoted={hasVoted} _id={_id} isComment={isComment} hideVisibleUserId={hideVisibleUserId} />
      </aside>
    </div>
  )
}
