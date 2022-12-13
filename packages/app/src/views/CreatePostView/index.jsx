import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { useState } from 'react';
import { randomInteger } from '../../lib';
import { COLORS } from '../../constants';
import { useMemo } from 'react';

export const CreatePostView = () => {
    const color = useMemo(() => randomInteger(0, COLORS.length - 1), [])

    const [post, setPost] = useState(null);

    const navigate = useNavigate()
    const handleBack = () => navigate('/')

    const handleSubmit = () => alert(post)

    const handlePostChange = e => {
        setPost(e.target.value)
    }


    return (
        <div className={classes.createPostView} style={{ ['--secondary-color']: `var(--secondary-color${color})` }}>
            <div className={classes.formWrapper}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.ylaosa}>
                        <button className={classes.nappi} onClick={handleBack}>Takaisin</button>
                        <input className={classes.nappi} type='submit' value='Postaa'></input>
                    </div>
                    <div className={classes.postfield}>
                        <textarea
                            className={classes.post}
                            onChange={handlePostChange}
                            maxLength={250}
                            placeholder='Jaa ajatuksesi ja kokemuksesi muilla joblaajille!'>
                        </textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}