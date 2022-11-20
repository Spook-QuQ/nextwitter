import { Router, Request, Response } from 'express'
import { DBManager } from 'server/modules/DBManager'
import { Result } from './index'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  if (req.session && req.session.user_uid) {
    const dbManager = req.app.get('dbManager') as DBManager

    dbManager
      .getUserByUID({
        user_uid: req.session.user_uid,
      })
      .then((data) => {
        data.data.password = undefined
        delete data.data.password
        res.send(data)
      })
      .catch((data: Result) => {
        res.send(data)
      })
  } else {
    res.send({
      msg: '',
      status: 'success'
    } as Result)
  }
})

export default router