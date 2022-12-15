import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { createPost, randomInteger } from '../../lib';
import { COLORS } from '../../constants';
import { useMemo } from 'react';
import { useMutation } from 'react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { useQueryClient } from 'react-query'
import { MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH } from '../../constants'

export const CreatePostView = () => {
    const color = useMemo(() => randomInteger(0, COLORS.length - 1), [])

    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const onSuccess = (data) => {
        queryClient.invalidateQueries('posts')
        navigate('/posts/' + data.post._id)
    }
    const handleBack = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const { token } = useAuthContext()
    const { isLoggedIn } = useAuthContext()

    const createPostWithToken = createPost(token)

    const { mutate, error } = useMutation({ mutationFn: createPostWithToken, onSuccess })



    const handleSubmit = (e) => {
        e.preventDefault()
        const data = e.target["post-content"].value

        if (data.length > MAX_COMMENT_CONTENT_LENGTH) {
            alert("Postaus voi olla maksimissaan MAX_COMMENT_CONTENT_LENGTH merkkiä")
            return
        }
        if (data.length < MIN_COMMENT_CONTENT_LENGTH) {
            alert("Liian lyhyt postaus")
            return
        }
        mutate(data)

    }


    return (
        <div className={classes.createPostView} style={{ ['--secondary-color']: `var(--secondary-color${color})` }}>
            {error && <p>{JSON.stringify(error)}</p>}
            <div className={classes.formWrapper}>
                <Form onSubmit={handleSubmit} contentStyle={{
                    alignSelf: 'stretch'
                }}>
                    <div className={classes.ylaosa}>
                        <Button className={classes.nappi} onClick={handleBack}>Takaisin</Button>
                        <input className={classes.nappi} type='submit' value='Postaa' disabled={!isLoggedIn} />
                    </div>
                    <div className={classes.postfield}>
                        <textarea
                            id="post-content"
                            className={classes.post}
                            maxLength={MAX_COMMENT_CONTENT_LENGTH}
                            placeholder={isLoggedIn ? 'Jaa ajatuksesi ja kokemuksesi muilla joblaajille!' : 'Nyt seikkailet väärillä sivuilla, vain käyttäjillä on oikeus tänne. Kirjaudu sisään tai rekisteröidy päästäksesi käsiksi postaamiseen'}
                            disabled={!isLoggedIn}>
                        </textarea>
                    </div>
                </Form>
            </div>
        </div >
    )
}