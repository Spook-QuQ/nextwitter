// import { useRouter } from 'next/router'

type PageProps = {
  id: string
}

const UserPageWIthId: React.FC<PageProps> = (props) => {
  return <div>{JSON.stringify(props)}</div>
}

export const getServerSideProps = async (context) => {
  const id = context.query.id
  const props: PageProps = { id }
  return { props }
}

export default UserPageWIthId
