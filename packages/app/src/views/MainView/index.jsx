import { Post } from '../../components/Post'
import classes from './style.module.css'
import { useInfiniteQuery } from 'react-query'
import { getMorePosts } from '../../lib'
import { NewPostButton } from '../../components/NewPostButton'
import { useState } from 'react'
import { useIsOnScreen } from '../../hooks/useIsOnScreen'
import { useAuthContext } from '../../hooks/useAuthContext'

export const MainView = () => {
  const { token } = useAuthContext()
  const getMorepostsWithToken = getMorePosts(token)
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getMorepostsWithToken,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastTimeStamp : null,
    staleTime: 1000 * 10, // 10 seconds
  })

  const { isLoggedIn } = useAuthContext()

  const pages = data?.pages

  const [ref, setRef] = useState(null)
  const isLastPageOnScreen = useIsOnScreen(ref)

  if (isLastPageOnScreen && hasNextPage && !isFetching) {
    fetchNextPage()
  }

  return (
    <div>
      {isLoggedIn && <NewPostButton />}
      <div className={classes.mainView}>
        {pages?.length > 0 &&
          pages.map((page, i) => (
            <div
              className={classes.postsWrapper}
              key={page.lastTimeStamp}
              ref={i === pages.length - 1 ? setRef : null}
            >
              {page.posts.length > 0 &&
                page.posts.map((post) => (
                  <Post
                    key={post._id + post.timeStamp}
                    {...post}
                    withLink={true}
                    hideVisibleUserId={true}
                  />
                ))}
            </div>
          ))}
        {!hasNextPage && pages && pages.length > 0 && <p>Ei enempää joblauksia :D</p>}
      </div>
    </div>
  )
}
