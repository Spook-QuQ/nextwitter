// import { AxiosStatic } from 'axios'
import { GetServerSideProps } from 'next'
import { useSelector } from 'react-redux'
import { User } from 'server/modules/DBManager'
import { Result } from 'server/routes/server-api'
import UserProfile from '@/components/layouts/default/UserProfile'
import { InitState } from '@/store/slices/defaultLayoutSlice'

// import { useRouter } from 'next/router'

export type DynamicRouteQuery = {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as DynamicRouteQuery

  const axios = (await import('axios')).default
  const { data: props } = await axios.post(
    `${process.env.BASE_URL}/server-api/get-user`,
    { query: context.query },
  )

  return { props }
}

const UserPageWIthId: React.FC<Result<User>> = (props) => {
  const { status, data: pageUserData } = props

  const userData = useSelector<{ defaultLayout: InitState }, User>(
    (state) => state.defaultLayout.userData,
  )

  return (
    <div>
      {status === 'success' && !!pageUserData ? (
        <div>
          <UserProfile
            userData={pageUserData}
            isSignedUser={userData && (userData.user_id === pageUserData.user_id)}
          />
        </div>
      ) : (
        <div>{<h3>{props.msg}</h3>}</div>
      )}
    </div>
  )
}

export default UserPageWIthId
