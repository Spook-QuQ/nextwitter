import { Router, Request, Response } from 'express'
import { DBManager } from 'server/modules/DBManager'
import { Result } from './index'

const router = Router()

router.get('/:target_user_id', async (req: Request, res: Response) => {
  const current_user_uid = req.session && req.session.user_uid
  if (!current_user_uid) {
    return {
      msg: 'Please Sign in or Sign up.',
      status: 'error',
    } as Result
  } else {
    const target_user_id = req.params.target_user_id as unknown

    if (typeof target_user_id === 'string') {
      const dbManager = req.app.get('dbManager') as DBManager

      Promise.all([
        dbManager.getUser(
          { user_id: target_user_id },
          { uid: true, plainFFList: true },
        ),
        dbManager.getUserByUID(
          { user_uid: current_user_uid },
          { uid: true, plainFFList: true },
        ),
      ]).then(([{ data: targetUserData }, { data: currentUserData }]) => {
        const isFollowing: boolean =
          currentUserData && typeof currentUserData.followings === 'object'
            ? !!currentUserData.followings[targetUserData.user_uid]
            : false

        const isFollowsYou: boolean =
          targetUserData && typeof targetUserData.followings === 'object'
            ? !!targetUserData.followings[currentUserData.user_uid]
            : false

        const data = {
          isFollowing,
          isFollowsYou
        }
        const result: Result<typeof data> = {
          msg: 'FF checked.',
          status: 'success',
          data,
        }
        return res.send(result)
      })
    } else {
      const result: Result = {
        msg: 'Target user id is empty or invalid.',
        status: 'error',
      }
      return res.send(result)
    }
  }
})

export default router
