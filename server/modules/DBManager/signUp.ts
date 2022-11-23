import { Database } from 'firebase-admin/lib/database/database'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Session, SessionData } from 'express-session'
import userExistenceChecker from './userExistenceChecker'
import { Result } from 'server/routes/server-api'
import { User } from './index'
import createUser from './createUser'
import { Request } from 'express'

const signUp = async (
  db: Database,
  formData: SignFormData,
  req: Request,
): Promise<Result<User> | Result> => {
  // const isUserExists = await getUser(db, { user_id: formData.user_id })
  // console.log(isUserExists)

  // TODO:
  // 🍄 作ろうとしている User の user_id が正常かどうかを確認する
  //  ・特殊文字が含まれていないかどうか（ハイフンとアンダースコアは許す）
  //  ・文字数の制限をする
  const isNameSafe = true
  if (!isNameSafe) {
    const err: Result = {
      msg: 'The user ID is not valid.',
      status: 'error',
    }
    return err
  }

  const isUserExisted = await userExistenceChecker(db, {
    user_id: formData.user_id,
  })

  if (isUserExisted) {
    const err: Result = {
      msg: `Sign up failed: Alaready User "@${formData.user_id}" exists.`,
      status: 'error',
    }
    throw err
  } else {
    const newUserData: User = {
      user_id: formData.user_id,
      name: formData.name,
      password: formData.password,
      description: '',
    }

    const {
      msg,
      status,
      data: { user_id, user_uid, name, description },
    } = await createUser(db, newUserData).catch((result: Result) => result)

    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) {
          reject({
            msg: err,
            status: 'error',
          } as Result)
        } else {
          req.session.user_uid = user_uid // 🍄
          resolve({
            msg,
            status,
            data: {
              user_id,
              name,
              description,
            },
          } as Result<User>)
        }
      })
    })
  }
}

export default signUp
