import { Router } from 'express'
import { ServerSideContext as ServerSideContextOfUserIdPage } from '@/pages/user/[id]'
import { DBManager, Status } from 'server/modules/DBManager'

const router = Router()

router.post('/getUser', async (req, res) => {
  const {
    query: { id },
  } = req.body as ServerSideContextOfUserIdPage
  const dbManager = req.app.get('dbManager') as DBManager
  dbManager
    .getUser({
      user_id: id,
    })
    .then((data) => res.send(data))
    .catch((data) => res.send(data))
})

export default router
