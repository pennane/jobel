// import { CounterButton } from "../../components/CounterButton"
// import { LoginForm } from "../../components/LoginForm"
// import { LogoutButton } from "../../components/LogoutButton"
// import { SignupForm } from "../../components/SignupForm"
import classes from './style.module.css'
import { times, identity } from 'ramda'

const Post = () => {
  return (<div className={classes.post}>
    <header>
      10 minutes ago
    </header>
    <section>
      <main>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illo quae ullam minus, asperiores omnis consequatur praesentium sunt totam deserunt dolor a vel explicabo suscipit? Dicta libero eos enim quod?
      </main>
      <aside>
        <div className={classes.vote}>
          <div>up</div>
          <div>10</div>
          <div>down</div>
        </div>
      </aside>
    </section>
    <footer>
      10 comments
    </footer>
  </div>)
}

export const MainView = () => {
  return (
    <div className={classes.mainView}>
      <div className={classes.postsWrapper}>
        {times(identity, 10).map(i => <Post key={i} />)}
      </div>


      {/* <CounterButton />
      <LoginForm />
      <LogoutButton />
      <SignupForm /> */}
    </div>
  )
}