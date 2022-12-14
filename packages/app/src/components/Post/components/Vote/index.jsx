import classes from './style.module.css'
import { useMutation, useQueryClient } from 'react-query'
import { vote } from '../../../../lib'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useParams } from 'react-router-dom'

export const Vote = ({ score, isLoggedIn, hasVoted, isComment, _id }) => {
  const { id } = useParams()
  const { token } = useAuthContext()
  const createCommentWithToken = vote(token)
  const queryClient = useQueryClient()


  const handleOnSuccess = (newData) => {
    queryClient.setQueryData(isComment ? id : _id, (oldData) => {
      console.log({ newData, oldData, isComment, _id, id });
      if (isComment) {
        return { post: { ...oldData.post, comments: oldData.post.comments.map(c => c._id === _id ? ({ ...c, ...newData.comment }) : c) } }
      }

      return { post: { ...oldData.post, ...newData.post } }
    })
  }
  // const handleOnSuccess = (data) => {
  //   queryClient.setQueryData(isComment ? id, (old) => {
  //     return { post: { ...post, comments: [...post.comments, newComment] } }
  //   })
  // }

  const { mutate } = useMutation({ mutationFn: createCommentWithToken, onSuccess: handleOnSuccess })




  const upVote = (e) => {
    e.stopPropagation()
    mutate({ id: _id, isComment, score: 1 })
  }
  const downVote = (e) => {
    e.stopPropagation()
    mutate({ id: _id, isComment, score: -1 })
  }

  const active = isLoggedIn && !hasVoted

  return <div className={classes.vote}>
    <div data-active={active} onClick={upVote} className={classes.arrow}>&uarr;</div>
    <div style={hasVoted ? { color: "red" } : {}} data-active={active} className={classes.number}>{score}</div>
    <div data-active={active} onClick={downVote} className={classes.arrow}>&darr;</div>
  </div>
}