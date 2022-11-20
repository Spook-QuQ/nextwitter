/*　NOTE:

🍄  user_idが重複してしまう可能性がある
その場合、１つ目のデータに合致した人しかログインできないことに。
（同時に同じuser_idで作製・IDの変更をされてしまうと重複は起こるかもしれない）

*/

/* TODO:

🍄もうログインしているかをreq.session.user_uidで確認する
ログインしていたら Result.status = 'error' を返す
return res.send(???) で終了

*/

import { SignFormData } from '@/components/layouts/default/SignForm'
import dotenv from 'dotenv'
import { Session, SessionData } from 'express-session'
import firebaseAdmin, { database } from 'firebase-admin'
import createdUser from './createUser'
import getUser, { ArgsOfGetUser, OptionsOfGetUser } from './getUser'
import signIn from './signIn'
import signUp from './signUp'

dotenv.config()

const {
  GSA_TYPE,
  GSA_PROJECT_ID,
  GSA_PRIVATE_KEY_ID,
  GSA_PRIVATE_KEY,
  GSA_CLIENT_EMAIL,
  GSA_CLIENT_ID,
  GSA_AUTH_URL,
  GSA_TOKEN_URL,
  GSA_AUTH_PROVIDER_x509_CERT_URL,
  GSA_CLIENT_x509_CERT_URL,
  FIREBASE_DATABASE_URL,
} = process.env

const serviceAccountContext = {
  GSA_TYPE,
  GSA_PROJECT_ID,
  GSA_PRIVATE_KEY_ID,
  GSA_PRIVATE_KEY,
  GSA_CLIENT_EMAIL,
  GSA_CLIENT_ID,
  GSA_AUTH_URL,
  GSA_TOKEN_URL,
  GSA_AUTH_PROVIDER_x509_CERT_URL,
  GSA_CLIENT_x509_CERT_URL,
}

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(
    Object.keys(serviceAccountContext).reduce((obj, key) => {
      obj[key.toLowerCase().replace('gsa_', '')] = serviceAccountContext[key]
      return obj
    }, {}),
  ),
  databaseURL: FIREBASE_DATABASE_URL,
})

const db = firebaseAdmin.database()

export type User = {
  user_id: string
  user_uid?: string
  password?: string
  name: string
  description?: string
  // birthday
  followings?: {
    [user_data_id: string]: { date: string }
  }
  followers?: {
    [user_data_id: string]: { date: string }
  }
  ffCount?: {
    followings: number
    followers: number
  }
}

export class DBManager {
  // db: database.Database

  constructor() {
    // this.db = db
  }

  createUser = async (args: User) => await createdUser(db, args)
  getUser = async (args: ArgsOfGetUser, options?: OptionsOfGetUser) =>
    await getUser(db, args, options)
  signIn = async (
    formData: SignFormData,
    session: Session & Partial<SessionData>,
  ) => await signIn(db, formData, session)
  signUp = async (
    formData: SignFormData,
    session: Session & Partial<SessionData>,
  ) => await signUp(db, formData, session)
}
