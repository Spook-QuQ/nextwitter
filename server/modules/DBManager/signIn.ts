import { SignFormData } from '@/components/layouts/default/SignForm'
import { Session, SessionData } from 'express-session'
import { Database } from 'firebase-admin/lib/database/database'
import { Result } from 'server/routes/server-api'
import { User } from './index'
import getUser from './getUser'
import { Request } from 'express'

const errMsg = 'Sign in failed : Something went wrong.'

const signIn = async (db: Database, formData: SignFormData, req: Request) => {
  return await getUser(
    db,
    { user_id: formData.user_id },
    { uid: true, password: true },
  )
    .then(({ data: userData }) => {
      if (userData.password === formData.password) {
        userData.password = undefined
        delete userData.password

        return new Promise<Result<User> | Result>((resolve, reject) => {
          req.session.regenerate((err) => {
            if (err)
              reject({
                msg: err,
                status: 'error',
              } as Result)
            else {
              req.session.user_uid = userData.user_uid
              userData.user_uid = undefined
              delete userData.user_uid

              resolve({
                msg: 'Sign in successful.',
                status: 'success',
                data: userData,
              } as Result<User>)
            }
          })
        })
      } else {
        throw { msg: errMsg, status: 'error' } as Result
      }
    })
    .catch((result: Result) => {
      throw { msg: errMsg, status: 'error' } as Result
    })
}

export default signIn
