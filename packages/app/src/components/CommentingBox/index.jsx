import classes from './style.module.css'
import { Button } from '../Button'
import { useAuthContext } from '../../hooks/useAuthContext'
import { createComment } from '../../lib'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useVisualViewport } from '../../hooks/useVisualViewport'
import { MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH } from '../../constants'

export const CommentingBox = () => {
  const [shown, setShown] = useState(false)
  const [content, setContent] = useState('')

  const visualViewport = useVisualViewport()

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
    setContent(data.slice(0, MAX_COMMENT_CONTENT_LENGTH))
  }

  const { token } = useAuthContext()
  const { id } = useParams()
  const createCommentWithToken = createComment(token)
  const { mutate } = useMutation({ mutationFn: createCommentWithToken, onSuccess: handleOnSuccess })


  const sendComment = () => {
    if (!content || content.length < MIN_COMMENT_CONTENT_LENGTH) {
      return
    }

    if (content.length > MAX_COMMENT_CONTENT_LENGTH) {
      alert("Kommentti voi olla maksimissaan " + MAX_COMMENT_CONTENT_LENGTH + " merkkiä")
      return
    }
    if (content.length < MIN_COMMENT_CONTENT_LENGTH) {
      alert("Kommenttin pitää olla vähintään " + MIN_COMMENT_CONTENT_LENGTH + " merkkiä")
      return
    }

    mutate({ content, id })
  }


  return (<div className={classes.wrapper} style={{ height: `${visualViewport.height}px` }}>
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
      <textarea value={content} onChange={handleOnChange} className={classes.textarea} maxLength={MAX_COMMENT_CONTENT_LENGTH} placeholder="#JoblaaMenee">

      </textarea>
      <Button onClick={sendComment} style={{ padding: '0.5rem 0' }} >Lähetä kommentti</Button>
    </div>
  </div>)
}