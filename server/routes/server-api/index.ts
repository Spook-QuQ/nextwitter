import { Router, Request, Response, NextFunction } from 'express'

import getUser from './getUser'
import sign from './sign'
import checkSign from './checkSign'

export type Result<T = undefined> = {
  msg: string
  status: 'success' | 'error'
  data?: T
}

const router = Router()

router.use('/getUser', getUser)

const checkSignedInMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session && req.session.user_uid) {
    return res.send({ msg: 'Already signed in', status: 'error' } as Result)
  } else next()
}

router.use('/sign', checkSignedInMiddleWare, sign)

router.use('/checkSign', checkSign)

export default router
