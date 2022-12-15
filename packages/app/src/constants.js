export const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/`

export const EXAMPLE_POST = {
  _id: '6395eec0c08fabf4908a724f',
  userId: '6395e681c08fabf4908a7249',
  voters: [],
  score: 0,
  content: 'bro',
  color: 0,
  comments: [],
  timeStamp: '2022-12-11T14:52:48.016Z',
  commentCount: 0,
}

export const COLORS = ['#800f3f', '#0f8022', '#b24822', '#5d23b2', '#242ab2']
export const MAX_COMMENT_CONTENT_LENGTH = 250
export const MIN_COMMENT_CONTENT_LENGTH = 2
export const MAX_USERNAME_LENGTH = 24
export const MIN_USERNAME_LENGTH = 3
export const MAX_PASSWORD_LENGTH = 30
export const MIN_PASSWORD_LENGTH = 5

export const SHOW_LOGIN_AS_DEFAULT = true

export const POST_STALE_TIME = 1000 * 60 // 1 minute
export const POSTS_STALE_TIME = 1000 * 10 // 10 seconds

export const LOCAL_STORAGE_TOKEN_KEY = 'jobel-auth-token'
export const LOCAL_STORAGE_USER_KEY = 'jobel-user'

export const HIDE_POST_SCORE = -5

export const EMOJIS = [
  [':jobel:', '/32.png'],
  [':alien:', '/emojis/alien.png'],
  [':3_hearts_smile:', '/emojis/3_hearts_smile.png'],
  [':angry:', '/emojis/angry.png'],
  [':anguished:', '/emojis/anguished.png'],
  [':bomb:', '/emojis/bomb.png'],
  [':call_me:', '/emojis/call_me.png'],
  [':camel:', '/emojis/camel.png'],
  [':cap:', '/emojis/cap.png'],
  [':clap:', '/emojis/clap.png'],
  [':clubmate:', '/emojis/clubmate.png'],
  [':expressionless:', '/emojis/expressionless.png'],
  [':eyes:', '/emojis/eyes.png'],
  [':faded:', '/emojis/faded.png'],
  [':fingers_crossed:', '/emojis/fingers_crossed.png'],
  [':gun:', '/emojis/gun.png'],
  [':heart_eyes_smile:', '/emojis/heart_eyes_smile.png'],
  [':hl:', '/emojis/hl.png'],
  [':jihuu:', '/emojis/jihuu.png'],
  [':love_you_gesture:', '/emojis/love_you_gesture.png'],
  [':lätty:', '/emojis/lätty.png'],
  [':neutral_face:', '/emojis/neutral_face.png'],
  [':pill:', '/emojis/pill.png'],
  [':point_down:', '/emojis/point_down.png'],
  [':point_up:', '/emojis/point_up.png'],
  [':rainbow:', '/emojis/rainbow.png'],
  [':robot:', '/emojis/robot.png'],
  [':skii:', '/emojis/skii.png'],
  [':skull:', '/emojis/skull.png'],
  [':smile:', '/emojis/smile.png'],
  [':sob:', '/emojis/sob.png'],
  [':sunglass_smile:', '/emojis/sunglass_smile.png'],
  [':thumbs_down:', '/emojis/thumbs_down.png'],
  [':thumbs_up:', '/emojis/thumbs_up.png'],
  [':weary:', '/emojis/weary.png'],
  [':whitebag:', '/emojis/whitebag.png'],
  [':wink:', '/emojis/wink.png'],
]
