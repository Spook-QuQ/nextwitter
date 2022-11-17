import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SignInForm from './SignForm'

type Props = {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  return (
    <div className='p-4 sm:p-8'>
      <Header />
      <main>

        {props.children}
        </main>
      <Footer />
      <SignInForm />
    </div>
  )
}

export default DefaultLayout
