import { database } from 'firebase-admin'
import { Result } from 'server/routes/server-api'
import { User } from './index'

export type ArgsOfGetUser = {
  user_id: string
}

export type OptionsOfGetUser = {
  uid?: boolean
  password?: boolean
}

const getUser = async (
  db: database.Database,
  args: ArgsOfGetUser,
  options?: OptionsOfGetUser,
) => {
  if (args.user_id) {
    const targetUserRef = db
      .ref(`/users/`)
      .orderByChild('user_id')
      .equalTo(args.user_id)
      .limitToFirst(1)

    const targetRs = await targetUserRef.once('value')
    const _user = targetRs.val()

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

      if (typeof options === 'object' && options.uid) {
        const user_uid = Object.keys(_user)[0]
        userData.user_uid = user_uid
      }

      if (!(typeof options === 'object' && options.password)) {
        userData.password = undefined
        delete userData.password
      }

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
