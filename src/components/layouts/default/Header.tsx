import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSignModal, InitState } from '@/store/slices/defaultLayoutSlice'

const DefaultLayoutHeader: React.FC = () => {
  const dispatch = useDispatch()

  const isSignedIn = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isSignedIn,
  )

  const onClickForOpenSignWindow = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    dispatch(toggleSignModal(true))
  }

  return (
    <header>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            {!isSignedIn && (
              <a className='quq-main-button' onClick={onClickForOpenSignWindow}>
                Sign In / Sign Up
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default DefaultLayoutHeader
