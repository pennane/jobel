import classes from './style.module.css'
import { Button } from '../Button'
import { useAuthContext } from '../../hooks/useAuthContext'
import { createComment } from '../../lib'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export const CommentingBox = () => {
  const [shown, setShown] = useState(false)
  const [content, setContent] = useState('')

  const queryClient = useQueryClient()

  const addComment = (newComment) => {
    queryClient.setQueryData(id, ({ post }) => {
      return { post: { ...post, comments: [...post.comments, newComment] } }
    })
  }

  const handleOnSuccess = (data) => {
    setContent('')
    setShown(false)
    addComment(data.comment)
  }


  const handleOnChange = (e) => {
    const data = e?.target?.value || ''
    setContent(data.slice(0, 250))
  }

  const { token } = useAuthContext()
  const { id } = useParams()
  const createCommentWithToken = createComment(token)
  const { mutate } = useMutation({ mutationFn: createCommentWithToken, onSuccess: handleOnSuccess })


  const sendComment = () => {
    if (!content || content.length < 2) {
      return
    }

    if (content.length > 250) {
      alert("Kommentti voi olla maksimissaan 250 merkkiä")
      return
    }

    mutate({ content, id })
  }


  return (<div className={classes.wrapper}>
    <div className={classes.commentingBox} style={{ marginBottom: shown ? '5rem' : '-9rem' }} >
      <div className={classes.opener} onClick={() => setShown(v => !v)} style={{ backgroundColor: shown ? 'var(--bg-color4)' : 'var(--accent-color)' }}>
        <span style={
          {
            transform: shown ? 'rotate(180deg)' : '',
            display: 'block',

          }}>
          ⬆️
        </span>
      </div>
      <textarea value={content} onChange={handleOnChange} className={classes.textarea} maxLength={250} placeholder="#JoblaaMenee">

      </textarea>
      <Button onClick={sendComment} style={{ padding: '0.5rem 0' }} >Lähetä kommentti</Button>
    </div>
  </div>)
}