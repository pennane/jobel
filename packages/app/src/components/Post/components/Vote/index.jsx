import classes from './style.module.css'

export const Vote = ({ score, isLoggedIn }) => {
  return <div className={classes.vote}>
    <div data-active={isLoggedIn} className={classes.arrow} data>&uarr;</div>
    <div data-active={isLoggedIn} className={classes.number}>{score}</div>
    <div data-active={isLoggedIn} className={classes.arrow}>&darr;</div>
  </div>
}