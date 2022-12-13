import { NavLink, Outlet } from 'react-router-dom'
import classes from './style.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'

export const RootLayout = () => {
  const { user, isLoggedIn } = useAuthContext()
  return (
    <div className={classes.rootLayout}>
      <nav className={classes.nav}>
        <NavLink to="/">
          <div className={classes.homeLink}>
            <img src="/64.png" alt=""></img>
            <header>JOBEL</header>
          </div>
        </NavLink>
        <div className={classes.rightSide}>
          <div>
            {isLoggedIn && <div>sisäänkirjautuneena {user.userName}</div>}
          </div>
          <NavLink to="/settings">
            <div className={classes.navLink}>⚙️</div>
          </NavLink>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}
