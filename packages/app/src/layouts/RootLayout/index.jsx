import { NavLink, Outlet } from 'react-router-dom'
import classes from './style.module.css'

export const RootLayout = () => {
  return (
    <div className={classes.rootLayout}>
      <nav className={classes.nav}>
        <NavLink to="/">
          <div className={classes.homeLink}>

            <img src="/64.png" alt=""></img>
            <header>JOBEL</header>

          </div>
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  )
}

