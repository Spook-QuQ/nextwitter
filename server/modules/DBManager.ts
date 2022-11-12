import dotenv from 'dotenv'
import firebaseAdmin, { database } from 'firebase-admin'

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

// const snapshot = await db.ref('test').once('value')
// console.log(snapshot.val())

type PropsOfCreateUser = {
  user_id: string
  password: string
  name: string
  description?: string
  // birthday
}

type Status = {
  msg: string
  status: 'success' | 'error'
}

export class DBManager {
  db: database.Database

  constructor() {
    this.db = db
  }

  async createUser(props: PropsOfCreateUser): Promise<Status> {
    const { user_id, password, name, description } = props

    if (user_id && password && name) {
      const usersRef = this.db.ref('/users')
      const isUserExisted = (
        await usersRef.orderByChild('user_id').equalTo(user_id).once('value')
      ).val()
      if (isUserExisted) {
        throw { msg: `User ID "${user_id}" already exists!` } as Status
      } else {
        return usersRef
          .push({
            user_id,
            password,
            name,
            description,
          })
          .then(
            (_) =>
              ({
                msg: `User "${user_id}" created.`,
                status: 'success',
              } as Status),
          )
          .catch(
            (_) =>
              ({
                msg: `User "${user_id}" created.`,
                status: 'error',
              } as Status),
          )
      }
    }
  }
}
