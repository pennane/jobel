import classes from './style.module.css'
import { Post } from '../../components/Post'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getPost } from '../../lib'
import { useAuthContext } from '../../hooks/useAuthContext'
import { CommentingBox } from '../../components/CommentingBox'

export const PostView = () => {
  const { id } = useParams()
  const { token, isLoggedIn } = useAuthContext()
  const getPostWithToken = getPost(token)


  const { data, isFetching, error } = useQuery({
    queryKey: [id],
    queryFn: () => getPostWithToken(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false
  })



  if (error) {
    return <p>{JSON.stringify(error)}</p>
  }

  if (isFetching || !data) {
    return null
  }

  const post = data.post

  if (!post) {
    return <p>No post with that id</p>
  }


  return (
    <div className={classes.mainView}>
      {isLoggedIn && <CommentingBox />}
      <div className={classes.originalPost}>
        <Post {...post} />
      </div>
      <div className={classes.postWrapper}>
        {post.comments && post.comments.map((comment, i) => <Post key={i} isComment={true} {...comment} color={post.color} />)}
      </div>
    </div>
  )
}