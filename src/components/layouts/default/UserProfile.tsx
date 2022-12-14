import { MouseEvent, useState, useEffect } from 'react'
import { User } from 'server/modules/DBManager'
import FollowButton from './FollowButton'
import aixos from 'axios'
import SpinChippedCircle from './SpinChippedCircle'
import { InitState, addToFFCount } from '@/store/slices/defaultLayoutSlice'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { AppDispatch } from '@/store'

type Props = {
  userData: User
  isSignedUser?: boolean
}
const UserProfile: React.FC<Props> = ({ userData, isSignedUser }) => {
  const dispatch: AppDispatch = useDispatch()

  const isCurrentUserSigned = useSelector<
    { defaultLayout: InitState },
    boolean
  >((state) => !!state.defaultLayout.userData)

  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  const [isFFChecked, setIsFFchecked] = useState<boolean>(true)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [isFollowsYou, setIsFollowsYou] = useState<boolean>(false)

  const [followDiff, setFollowDiff] = useState<number>(0)

  const requestCheckFF = async (user_id = userData.user_id) => {
    aixos
      .get('/server-api/check-ff/' + user_id)
      .then(({ data: result }) => {
        setIsFFchecked(true)
        setIsFollowing(result.data.isFollowing)
        setIsFollowsYou(result.data.isFollowsYou)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (!isSignedUser && isCurrentUserSigned) {
      setIsFFchecked(false)
      requestCheckFF()
      // TODO:
      // ð ãµã¼ãã¼å´ã§ã»ãã·ã§ã³ã«UIDããããç¢ºèª
      // - UIDãç¡ãå ´åã¯ããµã¤ã³ã¤ã³ããã¦ããªãããã¨è¿å´ã
      // ã¯ã©ã¤ã¢ã³ãå´ã§ã¯ãµã¤ã³ã¤ã³ã»ãµã¤ã³ã¢ããã®ã¦ã£ã³ãã¦ãéããã
      // - UIDãããå ´åã¯ffç¶æ³ãåå¾ãã¦è¿å´
      // ãã©ã­ã¼ããã¦ããã°ã¯ã©ã¤ã¢ã³ãå´ã§ããã©ã­ã¼ããã¦ãã¾ããã¡ãã»ã¼ã¸
      // ï¼ FollowButton ã® isFollowing ã true
    }
  }, [isCurrentUserSigned])

  const onClickForGetInEditMode = (
    // ð
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault()
    setIsEditMode(true)
  }

  const onClickHandlerForFollowButton = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault()
    const requestFollow = isFollowing ? axios.delete : axios.get
    const { data: result } = await requestFollow(
      `/server-api/follow/${userData.user_id}`,
    )
    const followDiffSize = isFollowing ? -1 : 1
    setFollowDiff((v) => v + followDiffSize)
    dispatch(addToFFCount({ value: followDiffSize, type: 'followings' }))
    setIsFollowing((v) => !v)
  }

  return (
    <div>
      <h2 className='text-2xl font-bold'>{userData.name}</h2>
      <p className='flex justify-between gap-2'>
        <small className='flex items-center'>
          <span>@{userData.user_id}</span>
          {!isSignedUser && isFollowsYou && (
            <span
              className='
                ml-2 px-1 bg-stone-200 text-stone-500
              '
            >
              Follows you
            </span>
          )}
        </small>
        {isSignedUser ? (
          <button className='quq_sub_button' onClick={onClickForGetInEditMode}>
            Edit profile
          </button>
        ) : isFFChecked ? (
          <FollowButton
            onClick={onClickHandlerForFollowButton}
            isFollowing={isFollowing}
          />
        ) : (
          <span className='relative'>
            <SpinChippedCircle />
          </span>
        )}
      </p>
      <p>{userData.description}</p>
      <hr className='my-4' />
      <span className='flex gap-4'>
        <button className='flex gap-1 hover:bg-black/10'>
          <span>Followings</span>
          <span className='font-bold'>{userData.ffCount.followings}</span>
        </button>
        <button className='flex gap-1 hover:bg-black/10'>
          <span>Followers</span>
          <span className='font-bold'>
            {userData.ffCount.followers + followDiff}
          </span>
        </button>
      </span>
    </div>
  )
}
export default UserProfile
