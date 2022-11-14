import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  return (
    <div>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
