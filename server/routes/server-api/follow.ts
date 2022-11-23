import { Router, Request, Response } from 'express'
import { DBManager } from 'server/modules/DBManager'
import { Result } from './index'

const router = Router()

type Args = {
  type: 'follow' | 'unfollow'
}

const routeHandler = async ({ type }: Args, req: Request, res: Response) => {
  const current_user_uid = req.session && req.session.user_uid
  if (!current_user_uid) {
    return res.send({
      msg: 'Please Sign in or Sign up.',
      status: 'error',
    } as Result)
  } else {
    const target_user_id = req.params.target_user_id as unknown

    if (typeof target_user_id === 'string') {
      const dbManager = req.app.get('dbManager') as DBManager
      const result = await dbManager.follow(
        {
          user_id: target_user_id,
          type,
        },
        req,
      )
      return res.send(result)
    } else {
      const result: Result = {
        msg: 'Target user id is empty or invalid.',
        status: 'error',
      }
      return res.send(result)
    }
  }
}

router.get('/:target_user_id', async (req: Request, res: Response) => {
  return await routeHandler({ type: 'follow' }, req, res)
})

router.delete('/:target_user_id', async (req: Request, res: Response) => {
  return await routeHandler({ type: 'unfollow' }, req, res)
})

export default router
