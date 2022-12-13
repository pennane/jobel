import { useNavigate } from 'react-router-dom'
import classes from './style.module.css'
import { useState } from 'react';

export const CreatePostView = () => {
    const [post, setPost] = useState(null);

    const navigate = useNavigate()
    const handleBack = () => navigate('/')

    const handleSubmit = () => alert(post)

    const handlePostChange = e => {
        setPost(e.target.value)
    }


    return (
        <div className={classes.mainView}>
            <div className={classes.postWrapper}>
            <form onSubmit={handleSubmit}>
            <div>
                <div className={classes.ylaosa}>
                <button className={classes.backNappi} onClick={handleBack}>Takaisin</button>
                <input className={classes.backNappi} type='submit' value='Postaa'></input>
                </div>
                <hr color="black"></hr>
                <div className={classes.postfield}>
                <textarea
                className={classes.post}
                onChange={handlePostChange} 
                maxLength={280}
                placeholder='Jaa ajatuksesi ja kokemuksesi muilla joblaajille!'>
                </textarea>
                </div>
            </div>
            </form>
            </div>
        </div>
      )
}