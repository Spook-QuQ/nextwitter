import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import DefaultLayout from '@/components/layouts/default'

type PropsOfLayout = {
  children: React.ReactElement
}

type PageComponentCustomProps = {
  Component: {
    _layout?: React.FC<PropsOfLayout>
  }
}

export default function App({
  Component,
  pageProps,
}: AppProps & PageComponentCustomProps) {
  const Layout = Component._layout || DefaultLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
