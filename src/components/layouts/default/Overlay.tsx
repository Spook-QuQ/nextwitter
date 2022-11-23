type Props = {
  isOpen: boolean
  children: React.ReactElement
}

const Overlay: React.FC<Props> = ({ isOpen, children }) => {
  return (
    <div // Overlay
      className={`
        absolute
        left-0
        transition-all
        duration-300
        ${isOpen ? 'top-0' : 'top-[-100%]'}
        w-full
        h-full
        bg-blue-500/60
      `}
    >
      {children}
    </div>
  )
}

export default Overlay
