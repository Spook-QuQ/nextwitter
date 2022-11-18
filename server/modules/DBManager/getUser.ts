import { database } from 'firebase-admin'
import { Result } from 'server/routes/server-api'
import { User } from './index'

export type ArgsOfGetUser = {
  user_id: string
}

const getUser = async (args: ArgsOfGetUser, db: database.Database) => {
  if (args.user_id) {
    const _user = (
      await db
        .ref(`/users/`)
        .orderByChild('user_id')
        .equalTo(args.user_id)
        .once('value')
    ).val()

    if (_user) {
      const userData: User = _user[Object.keys(_user)[0]]
      const { user_id, description, name } = userData

      const { followings, followers } = userData

      userData.ffCount = {
        followings: Object.keys(followings || {}).length,
        followers: Object.keys(followers || {}).length,
      }

      userData.followers = undefined
      delete userData.followers
      userData.followings = undefined
      delete userData.followings

      return {
        msg: `User "${args.user_id}" found.`,
        status: 'success',
        data: userData,
      } as Result<User>
    } else {
      throw { msg: `User "${args.user_id}" not found.`, status: 'error' }
    }
  }
}

export default getUser
