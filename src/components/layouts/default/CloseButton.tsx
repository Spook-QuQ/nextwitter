import { MouseEvent } from 'react'
import { MdClose } from 'react-icons/md'

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const CloseButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type='button'
      className='
      block
      p-1
      bg-stone-400
      text-white
      hover:bg-stone-500
      rounded-full
    '
      onClick={onClick}
    >
      <MdClose />
    </button>
  )
}

export default CloseButton
