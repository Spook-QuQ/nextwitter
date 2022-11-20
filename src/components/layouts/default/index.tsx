import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import SignInForm from './SignForm'

import { useSelector } from 'react-redux'
import { InitState } from '@/store/slices/defaultLayoutSlice'

type Props = {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  const isOpen = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isFormOpen,
  )

  return (
    <div className=''>
      <Header />
      <main className='p-4 sm:p-8'>{props.children}</main>
      <Footer />
      <SignInForm isOpen={isOpen} />
    </div>
  )
}

export default DefaultLayout
