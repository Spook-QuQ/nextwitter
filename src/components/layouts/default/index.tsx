import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import SignInForm from './SignForm'
import UserContextWindow from './UserContextWindow'

import { checkSign, InitState } from '@/store/slices/defaultLayoutSlice'
import { AppDispatch } from '@/store'

type Props = {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(checkSign())
  }, [])

  return (
    <div className=''>
      <Header />
      <main className='p-4 sm:p-8'>{props.children}</main>
      <Footer />
      <SignInForm />
      <UserContextWindow />
    </div>
  )
}

export default DefaultLayout
