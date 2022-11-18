import dotenv from 'dotenv'
import firebaseAdmin, { database } from 'firebase-admin'
import createdUser from './createUser'
import getUser, { ArgsOfGetUser } from './getUser'

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

  createUser = async (args: User) => await createdUser(args, db)
  getUser = async (args: ArgsOfGetUser) => await getUser(args, db)
}
