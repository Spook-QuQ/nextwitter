import { DBManager } from 'server/modules/DBManager'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Request, Response, Router } from 'express'
import { Result } from './index'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
  const formData = req.body.formData as SignFormData

  // 入力が足りない場合のエラー
  if (!formData.user_id || !formData.password || !formData.signType) {
    const result: Result = { msg: '', status: 'error' }
    return res.send(result)
  }
  // 入力が足りない場合エラー
  if (formData.signType === 'up' && !formData.name) {
    const result: Result = { msg: '', status: 'error' }
    return res.send(result)
  }

  const dbManager = req.app.get('dbManager') as DBManager

  if (formData.signType === 'in') {
    dbManager
      .signIn(formData, req)
      .then((result) => res.send(result))
      .catch((result) => res.send(result))
  } else if (formData.signType === 'up') {
    dbManager
      .signUp(formData, req)
      .then((result) => res.send(result))
      .catch((result) => res.send(result))
  }
})

router.get('/out',(req: Request, res: Response) => {
  // req.session.destroy() // でもいい。そのままサイトに滞在する事を考えてregenerateにした。
  req.session.regenerate((err) => {
    if (err) {
      res.send({
        msg: err,
        status: 'error',
      } as Result)
    } else {
      res.send({
        msg: 'Signed out.',
        status: 'success',
      } as Result)
    }
  })
})

export default router
