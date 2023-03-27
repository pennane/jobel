import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { Vote } from './components/Vote'
import { UserTag } from './components/UserTag'
import { useAuthContext } from '../../hooks/useAuthContext'
import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Toast } from '../Toast'
import { Tag } from '../Tag'
import { HIDE_POST_SCORE, EMOJIS } from '../../constants'
import { intersperse } from 'ramda'


const includesCustomEmoji = (text) => EMOJIS.find((m) => text.includes(m[0]))
const findCustomEmoji = (text) => EMOJIS.find((m) => m[0] === text)

const emojiRegex = /:\w+:/g

const parseEmoji = (content) => {
  if (!includesCustomEmoji(content)) return content
  const out = []
  let lastIndex = 0
  let i = 0

  for (const match of content.matchAll(emojiRegex)) {
    if (i === 0) {
      out.push(content.substring(lastIndex, match.index))
    }

    const customEmoji = findCustomEmoji(match[0])
    if (!customEmoji) {
      const newIndex = match.index + match[0].length
      out.push(content.substring(lastIndex, newIndex))
      lastIndex = newIndex
      continue
    }
    lastIndex = match.index + match[0].length
    out.push(<img alt="" className="emoji" src={customEmoji[1]} key={i} />)
    i++
  }
  out.push(content.substring(lastIndex, content.length))

  return out
}

const parsePartForImage = content => p => {
  if (typeof p !== "string") return p
  const [match, url] = MD_IMAGE_REGEX.exec(p) || []
  if (!match || !url) return p
  const parts = content.split(match)
  return intersperse(<img alt="" className='post-image' src={url} />, parts)
}

// eslint-disable-next-line no-useless-escape
const MD_IMAGE_REGEX = /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/

/**
 * 
 * @param {import('react').ReactNode[]} content 
 * @returns 
 */
const parseImages = (content) => {
  console.log(content);
  if (!Array.isArray(content)) return parsePartForImage(content)(content)
  return content.flatMap(parsePartForImage(content))
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
  if (n === 1) return n + ' kommentti'
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
  you,
}) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthContext()
  const handleOpenPostView = () => withLink && navigate(`/posts/${_id}`)

  const handleShare = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(`${window.location.origin}/posts/${_id}`)

    toast(<Toast>Kopioitu leikepöydälle! </Toast>)
  }

  if (score <= HIDE_POST_SCORE) {
    return null
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
          {you && <Tag>SINÄ</Tag>}
          {getIntlTimeAgo(timeStamp)}
        </header>
        <main className={classes.main}>{parseImages(parseEmoji(content))}</main>
        {!isComment && (
          <footer className={classes.footer}>
            {parseCommentsText(commentCount)}

            <div className={classes.shareButton} onClick={handleShare}>
              🔗
            </div>
          </footer>
        )}
      </section>
      <aside className={classes.aside}>
        <Vote
          score={score}
          isLoggedIn={isLoggedIn}
          hasVoted={hasVoted}
          _id={_id}
          isComment={isComment}
          hideVisibleUserId={hideVisibleUserId}
        />
      </aside>
    </div>
  )
}
