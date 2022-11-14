import { database } from 'firebase-admin'
import { Result } from './index'
import { User } from './index'

const createUser = async (
  props: User,
  db: database.Database,
): Promise<Result> => {
  const { user_id, password, name, description } = props

  if (user_id && password && name) {
    const usersRef = db.ref('/users')
    const isUserExisted = (
      await usersRef.orderByChild('user_id').equalTo(user_id).once('value')
    ).val()
    if (isUserExisted) {
      throw { msg: `User ID "${user_id}" already exists!` } as Result
    } else {
      return usersRef
        .push({
          user_id,
          password,
          name,
          description,
          // followings: {}, // 入れても空なら消える
          // folowers: {},
        })
        .then(
          (_) =>
            ({
              msg: `User "${user_id}" created.`,
              status: 'success',
            } as Result),
        )
        .catch(
          (_) =>
            ({
              msg: `User "${user_id}" already exists.`,
              status: 'error',
            } as Result),
        )
    }
  }
}

export default createUser
