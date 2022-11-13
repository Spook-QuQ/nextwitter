import { database } from 'firebase-admin'
import { Status } from './index'
import { User } from './createUser'

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

    const userData: User = _user[Object.keys(_user)[0]]

    if (userData) {
      const { user_id, description, name } = userData
      const partialOfUserData = { user_id, description, name }
      return {
        msg: `User "${args.user_id}" Found.`,
        status: 'success',
        data: partialOfUserData,
      } as Status
    } else {
      throw { msg: `User "${args.user_id}"`, status: 'error' }
    }
  }
}

export default getUser
