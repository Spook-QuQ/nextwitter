import { database } from 'firebase-admin'
import { Result } from 'server/routes/server-api'
import { User } from './index'
import userExistenceChecker from './userExistenceChecker'

const createUser = async (
  db: database.Database,
  props: User,
): Promise<Result<User>> => {
  const { user_id, password, name, description } = props

  if (user_id && password && name) {
    const isUserExisted = await userExistenceChecker(db, { user_id })
    
    if (isUserExisted) {
      throw { msg: `Sign up failed: Alaready User "@${user_id}" exists.` } as Result
    } else {
      const usersRef = db.ref('/users')
      return usersRef
        .push({
          user_id,
          password,
          name,
          description,
          // followings: {}, // 入れても空なら消える
          // folowers: {},
        })
        .then(() => {
          return {
            msg: `User "${user_id}" created.`,
            status: 'success',
            data: {
              name,
              user_id,
              description
            }
          } as Result<User>
        })
        .catch(() => {
          return {
            msg: `User "${user_id}" already exists.`,
            status: 'error',
          } as Result
        })
    }
  }
}

export default createUser
