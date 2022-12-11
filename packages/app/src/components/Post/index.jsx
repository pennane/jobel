import { useNavigate } from 'react-router-dom';
import classes from './style.module.css'

const getIntlTimeAgo = (input) => {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat();
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };

  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

const Vote = ({ score }) => {
  return <div className={classes.vote}>
    <div>&uarr;</div>
    <div>{score}</div>
    <div>&darr;</div>
  </div>
}

export const Post = ({ timeStamp, _id, commentCount, isComment, score, content, withLink }) => {
  const navigate = useNavigate()
  const handleOpenPostView = () => withLink && navigate(`/posts/${_id}`)

  return (
    <div className={classes.post} id={_id}>
      <header onClick={handleOpenPostView}>{getIntlTimeAgo(timeStamp)}</header>
      <section>
        <main onClick={handleOpenPostView}>
          {content}
        </main>
        <aside>
          <Vote score={score} />
        </aside>
      </section>
      {!isComment && <footer>{commentCount} comments</footer>}
    </div>
  )
}