import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSignModal, InitState } from '@/store/slices/defaultLayoutSlice'
import { User } from 'server/modules/DBManager'
import Link from 'next/link'

const DefaultLayoutHeader: React.FC = () => {
  const dispatch = useDispatch()

  const isSignedIn = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isSignedIn,
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

  return (
    <header className='p-4 sm:p-8 flex justify-between items-center bg-blue-500 text-white'>
      <h1 className='text-3xl'>{process.env.NEXT_PUBLIC_SITE_TITLE}</h1>
      <nav>
        <ul>
          <li className='outline outline-blue-400'>
            {!isSignedIn && (
              <a
                className='quq-main-button text-sm p-2 block'
                onClick={onClickForOpenSignWindow}
              >
                Sign In / Sign Up
              </a>
            )}
            {userData && (
              <Link className='quq-main-button p-2 block' href={`/user/${userData.user_id}`}>
                <p>
                  <span>{userData.name}</span>
                </p>
                <p>
                  <small>@{userData.user_id}</small>
                </p>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default DefaultLayoutHeader
