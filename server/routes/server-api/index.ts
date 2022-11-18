import { Router } from 'express'
import { DynamicRouteQuery as DynamicRouteQueryOfUserIdPage } from '@/pages/user/[id]'
import { DBManager } from 'server/modules/DBManager'
import { User } from 'server/modules/DBManager'
import { SignFormData } from '@/components/layouts/default/SignForm'

export type Result<T = any> = {
  msg: string
  status: 'success' | 'error'
  data?: T
}

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
    .catch((data: Result<User>) => res.send(data))
})

router.post('/sign', async (req, res) => {
  const formData = req.body.formData as SignFormData
  
  if (!formData.user_id || !formData.password || !formData.signType) {
    const result: Result = { msg: '', status: 'error' }
    return result
  }
  if (formData.signType === 'up' && !formData.name) {
    const result: Result = { msg: '', status: 'error' }
    return result
  }
  
  const result: Result = {
    msg: 'Signed ' + formData.signType,
    status: 'success',
  }
  res.send(result)
})

export default router
