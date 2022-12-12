import { Post } from '../../components/Post'
import classes from './style.module.css'
import { useInfiniteQuery } from 'react-query'
import { getMorePosts } from '../../lib'

import { useState } from 'react'

import { useIsOnScreen } from '../../hooks/useIsOnScreen'


export const MainView = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getMorePosts,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.lastTimeStamp : null,
  })

  const pages = data?.pages

  const [ref, setRef] = useState(null)
  const isLastPageOnScreen = useIsOnScreen(ref)

  if (isLastPageOnScreen && hasNextPage && !isFetching) {
    fetchNextPage()
  }

  return (
    <div>
      <div className={classes.mainView}>
        {pages?.length > 0 && pages.map((page, i) => (
          <div className={classes.postsWrapper} key={page.lastTimeStamp} ref={i === pages.length - 1 ? setRef : null}>
            {page.posts.length === 0 && <p>Ei enempää joblauksia</p>}
            {page.posts.length > 0 && page.posts.map((post) => <Post key={post._id + post.timeStamp}  {...post} withLink={true} hideVisibleUserId={true} />)}
          </div>
        ))}
      </div>
    </div>
  )


}