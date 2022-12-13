import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { createPost, randomInteger } from '../../lib';
import { COLORS } from '../../constants';
import { useMemo } from 'react';
import { useMutation } from 'react-query'
import { useAuthContext } from '../../hooks/useAuthContext'

export const CreatePostView = () => {
    const color = useMemo(() => randomInteger(0, COLORS.length - 1), [])

    const navigate = useNavigate()
    const toFrontPage = () => navigate('/')
    const handleBack = () => navigate(-1)

    const { token } = useAuthContext()

    const createPostWithToken = createPost(token)

    const { mutate, error } = useMutation({ mutationFn: createPostWithToken, onSuccess: toFrontPage })



    const handleSubmit = (e) => {
        e.preventDefault()
        const data = e.target["post-content"].value
        if (data.length > 250) {
            alert("Postaus voi olla maksimissaan 250 merkkiä")
            return
        }
        if (data.length < 2) {
            alert("Liian lyhyt postaus")
            return
        }
        mutate(data)
    }


    return (
        <div className={classes.createPostView} style={{ ['--secondary-color']: `var(--secondary-color${color})` }}>
            {error && <p>{JSON.stringify(error)}</p>}
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.ylaosa}>
                        <button className={classes.nappi} onClick={handleBack}>Takaisin</button>
                        <input className={classes.nappi} type='submit' value='Postaa'></input>
                    </div>
                    <div className={classes.postfield}>
                        <textarea
                            id="post-content"
                            className={classes.post}
                            maxLength={250}
                            placeholder='Jaa ajatuksesi ja kokemuksesi muilla joblaajille!'>
                        </textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}