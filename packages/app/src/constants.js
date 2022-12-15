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
