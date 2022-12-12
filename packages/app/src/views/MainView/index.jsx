import { Post } from '../../components/Post'
import classes from './style.module.css'
import { useApiGet } from '../../hooks/useApiGet'


export const MainView = () => {
  const { data, loading, error } = useApiGet('posts')

  if (error) {
    return <p>{JSON.stringify(error.message)}</p>
  }

  if (loading) {
    return null
  }

  const posts = data?.posts || []

  return (
    <div className={classes.mainView}>
      <div className={classes.postsWrapper}>
        {posts.length === 0 && <p>Ei vielä joblauksia</p>}
        {posts.length > 0 && posts.map((post, i) => <Post key={i} {...post} withLink={true} hideVisibleUserId={true} />)}
      </div>
    </div>
  )
}