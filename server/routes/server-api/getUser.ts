import { Router } from 'express'
import { DynamicRouteQuery as DynamicRouteQueryOfUserIdPage } from '@/pages/user/[id]'
import { DBManager } from 'server/modules/DBManager'
import { Result } from './index'

const router = Router()

router.post('/', async (req, res) => {
  /* TODO:
    🍄 user_id が無い場合の処理
  */

  const {
    query: { id },
  } = req.body as { query: DynamicRouteQueryOfUserIdPage }

  if (!id) return res.send({
    msg: 'query "id" is invalid',
    status: 'error'
  } as Result)

  const dbManager = req.app.get('dbManager') as DBManager
  dbManager
    .getUser({
      user_id: id,
    })
    .then((data) => {
      data.data.password = undefined
      delete data.data.password
      res.send(data)
    })
    .catch((data: Result) => res.send(data))
})

export default router