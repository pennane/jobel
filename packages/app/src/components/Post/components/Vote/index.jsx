import classes from './style.module.css'
import { useMutation, useQueryClient } from 'react-query'
import { vote } from '../../../../lib'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useParams } from 'react-router-dom'

export const Vote = ({
  score,
  isLoggedIn,
  hasVoted,
  isComment,
  _id,
}) => {
  const { id } = useParams()
  const { token } = useAuthContext()
  const createCommentWithToken = vote(token)
  const queryClient = useQueryClient()

  const handleOnSuccess = (newData) => {
    if (!isComment) {
      queryClient.setQueryData('posts', (oldData) => {
        const updated = oldData.pages.map((page) => ({
          hasMore: page.hasMore,
          timestamp: page.timestamp,
          posts: page.posts.map((post) =>
            post._id === newData.post._id ? { ...post, ...newData.post } : post
          ),
        }))
        return { pages: updated, pageParams: oldData.pageParams }
      })
    }


    queryClient.setQueryData(id, (oldData) => {
      if (isComment) {
        return {
          post: {
            ...oldData.post,
            comments: oldData.post.comments.map((c) =>
              c._id === newData.comment._id ? { ...c, ...newData.comment } : c
            ),
          },
        }
      }
      return { post: { ...oldData.post, ...newData.post } }
    })
  }

  const { mutate } = useMutation({
    mutationFn: createCommentWithToken,
    onSuccess: handleOnSuccess,
  })

  const upVote = (e) => {
    if (hasVoted || !isLoggedIn) return
    e.stopPropagation()
    mutate({ id: _id, isComment, score: 1 })
  }
  const downVote = (e) => {
    if (hasVoted || !isLoggedIn) return
    e.stopPropagation()
    mutate({ id: _id, isComment, score: -1 })
  }

  const active = isLoggedIn && !hasVoted

  return (
    <div className={classes.vote}>
      <div data-active={active} onClick={upVote} className={classes.arrow}>
        &uarr;
      </div>
      <div
        style={hasVoted ? { color: 'white' } : {}}
        data-active={isLoggedIn}
        className={classes.number}
      >
        {score}
      </div>
      <div data-active={active} onClick={downVote} className={classes.arrow}>
        &darr;
      </div>
    </div>
  )
}
