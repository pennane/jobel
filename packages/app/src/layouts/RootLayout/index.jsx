import { NavLink, Outlet } from 'react-router-dom'
import classes from './style.module.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loader } from '../../components/Loader'

export const RootLayout = () => {
  const { user, isLoggedIn, hasLoaded } = useAuthContext()

  return (
    <div className={classes.rootLayout}>
      <ToastContainer
        {...{
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        }}
      />
      <nav className={classes.nav}>
        <NavLink to="/">
          <div className={classes.homeLink}>
            <img src="/64.png" alt=""></img>
            <header>JOBEL</header>
          </div>
        </NavLink>
        <div className={classes.rightSide}>
          <div>
            {isLoggedIn && <div>Kirjautuneena sisään: {user?.profile?.userName}</div>}
          </div>
          <NavLink to="/settings">
            <div className={classes.navLink}>⚙️</div>
          </NavLink>
        </div>
      </nav>
      <main>
        {!hasLoaded && <Loader loading={true} />}
        {hasLoaded && <Outlet />}
      </main>
      <footer></footer>
    </div>
  )
}
