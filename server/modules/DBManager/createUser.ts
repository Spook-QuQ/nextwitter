import { database } from 'firebase-admin'
import { Status } from './index'

export type User = {
  user_id: string
  password: string
  name: string
  description?: string
  // birthday
}

const createUser = async (props: User, db: database.Database): Promise<Status> => {
  const { user_id, password, name, description } = props

  if (user_id && password && name) {
    const usersRef = db.ref('/users')
    const isUserExisted = (
      await usersRef.orderByChild('user_id').equalTo(user_id).once('value')
    ).val()
    if (isUserExisted) {
      throw { msg: `User ID "${user_id}" already exists!` } as Status
    } else {
      return usersRef
        .push({
          user_id,
          password,
          name,
          description,
        })
        .then(
          (_) =>
            ({
              msg: `User "${user_id}" created.`,
              status: 'success',
            } as Status),
        )
        .catch(
          (_) =>
            ({
              msg: `User "${user_id}" created.`,
              status: 'error',
            } as Status),
        )
    }
  }
}

export default createUser