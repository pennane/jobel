import classes from './style.module.css'

export const Toast = ({children}) => {
    return(
        <div className={classes.toast}>
            <img src="/32.png" alt=""/> <span>{children}</span>
        </div>
    )
}