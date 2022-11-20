import { DBManager } from 'server/modules/DBManager'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Router } from 'express'
import { Result } from './index'

const router = Router()

router.post('/', async (req, res) => {
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
      .signIn(formData, req.session)
      .then((result) => res.send(result))
      .catch((result) => res.send(result))
  } else if (formData.signType === 'up') {
    dbManager
      .signUp(formData, req.session) // 🍄 signUp 作成中 / 作製後、データ加工の必要性を要確認
      .then((result) => {
        console.log(result)
        res.send(result)
      })
      .catch((result) => res.send(result))
  }
})

export default router