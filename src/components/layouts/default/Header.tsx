import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleSignModal } from '@/store/slices/defaultLayoutSlice'

const DefaultLayoutHeader: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <header>
      <h1>Header</h1>
      <nav>
        <ul>
          <li>
            <a onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
              e.preventDefault()
              dispatch(toggleSignModal(true))
            }}>Sign In / Sign Up</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default DefaultLayoutHeader
