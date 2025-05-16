import { signUp } from './signUp'
import { userInfo } from './userInfo'

const combinedUsersPath = {
  '/users': {
    ...signUp['/users'],
  },
  '/users/info': {
    ...userInfo['/users/info'],
  },
}
export const users = {
  ...combinedUsersPath,
}

export * from './person'
