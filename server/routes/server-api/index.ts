import { Router } from 'express'
import { DynamicRouteQuery as DynamicRouteQueryOfUserIdPage } from '@/pages/user/[id]'
import { DBManager, Result } from 'server/modules/DBManager'

const router = Router()

router.post('/getUser', async (req, res) => {
  const {
    query: { id },
  } = req.body as { query: DynamicRouteQueryOfUserIdPage }
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
    .catch((data) => res.send(data))
})

export default router
