import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import SignInForm from './SignForm'

import { useSelector } from 'react-redux'
import { checkSign, InitState } from '@/store/slices/defaultLayoutSlice'
import { AppDispatch } from '@/store'

type Props = {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch()
  const isOpen = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isFormOpen,
  )

  useEffect(() => {
    dispatch(checkSign())
  }, [])

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
