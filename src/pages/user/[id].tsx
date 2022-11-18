// import { AxiosStatic } from 'axios'
import { GetServerSideProps } from 'next'
import { User } from 'server/modules/DBManager'
import { Result } from 'server/routes/server-api'

// import { useRouter } from 'next/router'

export type DynamicRouteQuery = {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query as DynamicRouteQuery
  // const props: PageProps = { id }
  // return { props }

  // const res = await fetch('/server-api/getUser', {
  //   method: 'POST',
  //   body: JSON.stringify(context.query)
  // })

  const axios = (await import('axios')).default
  const { data: props } = await axios.post(
    `${process.env.BASE_URL}/server-api/getUser`,
    { query: context.query },
  )

  return { props }

}

const UserPageWIthId: React.FC<Result<User>> = (props) => {
  const { status, data } = props

  return (
    <div>
      {status === 'success' ? (
        <div>
          <h3>{data.name}</h3>
          <p>@{data.user_id}</p>
          <p>Followings {data.ffCount.followings}</p>
          <p>Followers {data.ffCount.followers}</p>
          {data.description ? <p>{data.description}</p> : null}
        </div>
      ) : (
        <div>{<h3>{props.msg}</h3>}</div>
      )}
    </div>
  )
}

export default UserPageWIthId
