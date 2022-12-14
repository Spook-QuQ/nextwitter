/*ãNOTE:

ð  user_idãéè¤ãã¦ãã¾ãå¯è½æ§ããã
ãã®å ´åãï¼ã¤ç®ã®ãã¼ã¿ã«åè´ããäººããã­ã°ã¤ã³ã§ããªããã¨ã«ã
ï¼åæã«åãuser_idã§ä½è£½ã»IDã®å¤æ´ãããã¦ãã¾ãã¨éè¤ã¯èµ·ãããããããªãï¼

*/

/* TODO:

ðããã­ã°ã¤ã³ãã¦ããããreq.session.user_uidã§ç¢ºèªãã
ã­ã°ã¤ã³ãã¦ããã Result.status = 'error' ãè¿ã
return res.send(???) ã§çµäº

*/

import { SignFormData } from '@/components/layouts/default/SignForm'
import dotenv from 'dotenv'
import { Request } from 'express'
// import { Session, SessionData } from 'express-session'
import firebaseAdmin, { database } from 'firebase-admin'
import createdUser from './createUser'
import getUser, { ArgsOfGetUser, OptionsOfGetUser } from './getUser'
import getUserByUID, {
  ArgsOfGetUserByUID,
  OptionsOfGetUserByUID,
} from './getUserByUID'
import signIn from './signIn'
import signUp from './signUp'
import follow, { ArgsOfFollow } from './follow'

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
  getUserByUID = async (
    args: ArgsOfGetUserByUID,
    options?: OptionsOfGetUserByUID,
  ) => await getUserByUID(db, args, options)
  signIn = async (formData: SignFormData, req: Request) =>
    await signIn(db, formData, req)
  signUp = async (formData: SignFormData, req: Request) =>
    await signUp(db, formData, req)
  follow = async (Args: ArgsOfFollow, req: Request) =>
    await follow(db, Args, req)
}
