import { MouseEvent, useState } from 'react'

type Props = {
  isFollowing?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const FollowButton: React.FC<Props> = ({ onClick, isFollowing }) => {
  // const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <button
      className={`
        quq_sub_button
        ${isFollowing ? 'bg-blue-500' : ''}
      `}
      onClick={onClick}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowButton
