import { Router, Request, Response, NextFunction } from 'express'

import getUser from './getUser'
import sign from './sign'
import checkSign from './checkSign'
import checkFF from './checkFF'
import follow from './follow'

export type Result<T = undefined> = {
  msg: string
  status: 'success' | 'error'
  data?: T
}

const router = Router()

const checkSignMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session && req.session.user_uid) {
    return res.send({ msg: 'Already signed in', status: 'error' } as Result)
  } else next()
}

router.use('/get-user', getUser)
router.use('/sign', checkSignMiddleWare, sign)
router.use('/check-sign', checkSign)
router.use('/check-ff', checkFF)
router.use('/follow', follow)


export default router
