import { Database } from 'firebase-admin/lib/database/database'
import getUser from './getUser'

const userExistenceChecker = async (
  db: Database,
  { user_id }: { user_id: string },
) => {
  return getUser(db, { user_id })
    .then((userData) => true)
    .catch((result) => false)
}

export default userExistenceChecker
