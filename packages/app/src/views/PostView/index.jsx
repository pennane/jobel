import classes from './style.module.css'
import { repeat } from 'ramda'
import { EXAMPLE_POST } from '../../constants'
import { Post } from '../../components/Post'

export const PostView = () => {

  return (
    <div className={classes.mainView}>
      <div className={classes.postWrapper}>
        <div className={classes.originalPost}>
          <Post {...EXAMPLE_POST} />
        </div>
        <div className={classes.comment}>
          {repeat(EXAMPLE_POST, 10).map(i => <Post key={i} isComment={true} />)}
        </div>
      </div>
    </div>
  )
}