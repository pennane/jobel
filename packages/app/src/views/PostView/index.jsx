import classes from './style.module.css'
import { Post } from '../../components/Post'
import { useApiGet } from '../../hooks/useApiGet'
import { useParams } from 'react-router-dom'

export const PostView = () => {
  const { id } = useParams()

  const { data, loading, error } = useApiGet(`posts/${id}`, !id)

  if (error) {
    return <p>{JSON.stringify(error.message)}</p>
  }

  if (loading || !data) {
    return null
  }

  const post = data.post

  if (!post) {
    return <p>No post with that id</p>
  }


  return (
    <div className={classes.mainView}>
      <div className={classes.postWrapper}>
        <div className={classes.originalPost}>
          <Post {...post} />
        </div>
        <div className={classes.comment}>
          {post.comments && post.comments.map((comment, i) => <Post key={i} isComment={true} {...comment} />)}
        </div>
      </div>
    </div>
  )
}