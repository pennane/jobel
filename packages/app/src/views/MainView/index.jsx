import { Post } from '../../components/Post'
import classes from './style.module.css'
import { repeat } from 'ramda'
import { EXAMPLE_POST } from '../../constants'


export const MainView = () => {
  return (
    <div className={classes.mainView}>
      <div className={classes.postsWrapper}>
        {repeat(EXAMPLE_POST, 10).map((post, i) => <Post key={i} {...post} withLink={true} />)}
      </div>
    </div>
  )
}