import '../styles/globals.sass'
import type { AppProps } from 'next/app'
import DefaultLayout from '@/components/layouts/default'
import { Provider } from 'react-redux'
import { store } from '@/store'

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
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
