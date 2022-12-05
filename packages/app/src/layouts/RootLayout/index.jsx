import { Outlet } from 'react-router-dom'
import classes from './style.module.css'

export const RootLayout = () => {
  return (
    <div className={classes.rootLayout}>
      <nav>nav</nav>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  )
}

