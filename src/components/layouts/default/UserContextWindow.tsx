import { MouseEvent } from 'react'
import {
  InitState,
  toggleUserContextWindow,
} from '@/store/slices/defaultLayoutSlice'
import { useSelector, useDispatch } from 'react-redux'
import { User } from 'server/modules/DBManager'
import CloseButton from './CloseButton'
import Overlay from './Overlay'
import { AppDispatch } from '@/store'
import UserProfile from './UserProfile'

type Props = {}

const UserContextWindow: React.FC<Props> = () => {
  

  const dispatch: AppDispatch = useDispatch()

  const userData = useSelector<{ defaultLayout: InitState }, User>(
    (state) => state.defaultLayout.userData,
  )

  const isOpen = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.isUserContextWindowOpen,
  )

  const onClicHandlerForCloseWindow = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault()
    dispatch(toggleUserContextWindow(false))
  }

  return (
    <Overlay isOpen={isOpen}>
      {userData && (
        <div className='quq_inner-of-overlay'>
          <span
            className='
            absolute
            right-0
            top-0
            p-6
          '
          >
            <CloseButton onClick={onClicHandlerForCloseWindow} />
          </span>
          <UserProfile userData={userData} isSignedUser />
        </div>
      )}
    </Overlay>
  )
}

export default UserContextWindow
