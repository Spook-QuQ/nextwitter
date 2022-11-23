import { Database } from 'firebase-admin/lib/database/database'
import { Request } from 'express'
import getUser from './getUser'
import { Result } from 'server/routes/server-api'

export type ArgsOfFollow = {
  user_id: string
  type: 'follow' | 'unfollow'
}

const follow = async (db: Database, args: ArgsOfFollow, req: Request) => {
  const current_user_uid = req.session.user_uid
  if (!current_user_uid) {
    return {
      msg: 'Please Sign in or Sign up.',
      status: 'error',
    } as Result
  }

  const { data: targetUserData } = await getUser(
    db,
    { user_id: args.user_id },
    { uid: true },
  )
  const target_user_uid = targetUserData.user_uid

  const type = args.type

  const now = Date.now()

  return Promise.all([
    db.ref(`/users/${current_user_uid}/followings/${target_user_uid}`).set(
      type === 'follow'
        ? {
            date: now,
          }
        : null,
    ),
    db.ref(`/users/${target_user_uid}/followers/${current_user_uid}`).set(
      type === 'follow'
        ? {
            date: now,
          }
        : null,
    ),
  ]).then(() => {
    const result: Result = {
      msg: `Complete ${ type } @${ targetUserData.user_id }`,
      status: 'success'
    }
    return result
  })
}

export default follow
