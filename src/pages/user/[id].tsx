// import { AxiosStatic } from 'axios'
import { Status } from 'server/modules/DBManager'

// import { useRouter } from 'next/router'

type PageProps = {
  id: string
  data: Status
}

const UserPageWIthId: React.FC<PageProps> = (props) => {
  const { id, data } = props
  return <div>{JSON.stringify(props)}</div>
}

export type ServerSideContext = {
  query: {
    id: string
  }
}

export const getServerSideProps = async (context: ServerSideContext) => {
  const { id } = context.query
  // const props: PageProps = { id }
  // return { props }

  // const res = await fetch('/server-api/getUser', {
  //   method: 'POST',
  //   body: JSON.stringify(context.query)
  // })

  const axios = (await import('axios')).default
  const { data } = await axios.post(
    `${process.env.BASE_URL}/server-api/getUser`,
    { query: context.query },
  )

  return { props: { id, data } }
}

export default UserPageWIthId
