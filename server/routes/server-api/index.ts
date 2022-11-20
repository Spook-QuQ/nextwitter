import { Router } from 'express'

import getUser from './getUser'
import sign from './sign'

export type Result<T = undefined> = {
  msg: string
  status: 'success' | 'error'
  data?: T
}

const router = Router()

router.use('/getUser', getUser)

router.use('/sign', sign)

export default router
