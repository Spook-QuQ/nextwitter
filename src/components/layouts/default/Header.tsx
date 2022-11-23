import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleSignModal,
  InitState,
  toggleUserContextWindow,
} from '@/store/slices/defaultLayoutSlice'
import { User } from 'server/modules/DBManager'
// import Link from 'next/link'

const DefaultLayoutHeader: React.FC = () => {
  const dispatch = useDispatch()

  const isSignChecked = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isSignChecked,
  )

  const userData = useSelector<{ defaultLayout: InitState }, User>(
    (state) => state.defaultLayout.userData,
  )

  const onClickForOpenSignWindow = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    dispatch(toggleSignModal(true))
  }

  const onClickForOpenUserContextWindow = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault()
    dispatch(toggleUserContextWindow(true))
  }

  return (
    <header className='p-4 sm:p-8 flex justify-between items-center bg-blue-500 text-white'>
      <h1 className='text-3xl font-bold'>
        {process.env.NEXT_PUBLIC_SITE_TITLE}
      </h1>
      <nav>
        <ul>
          {isSignChecked && (
            <li className='outline outline-blue-400'>
              {!userData && (
                <a
                  className='quq_main-button text-sm p-2 block'
                  onClick={onClickForOpenSignWindow}
                >
                  Sign In / Sign Up
                </a>
              )}
              {userData && (
                // <Link
                //   className='quq-main-button p-2 block'
                //   href={`/user/${userData.user_id}`}
                // >
                //   <p>
                //     <span className='font-bold'>{userData.name}</span>
                //     <small className='ml-2'>@{userData.user_id}</small>
                //   </p>
                // </Link>
                <button
                  className='quq_main-button p-2 block'
                  onClick={onClickForOpenUserContextWindow}
                >
                  <p>
                    <span className='font-bold'>{userData.name}</span>
                    <small className='ml-2'>@{userData.user_id}</small>
                  </p>
                </button>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default DefaultLayoutHeader
