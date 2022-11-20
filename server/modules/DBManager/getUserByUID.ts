import { database } from 'firebase-admin'
import { Result } from 'server/routes/server-api'
import { User } from './index'

export type ArgsOfGetUserByUID = {
  user_uid: string
}

export type OptionsOfGetUserByUID = {
  uid?: boolean
  password?: boolean
}

const getUserByUID = async (
  db: database.Database,
  args: ArgsOfGetUserByUID,
  options?: OptionsOfGetUserByUID,
) => {
  if (args.user_uid) {
    const targetUserRef = db
      .ref(`/users/`)
      .orderByKey()
      .equalTo(args.user_uid)
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
        msg: `User By UID found.`,
        status: 'success',
        data: userData,
      } as Result<User>
    } else {
      throw { msg: `User By UID not found.`, status: 'error' }
    }
  }
}

export default getUserByUID
