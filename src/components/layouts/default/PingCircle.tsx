const LoadingCircle: React.FC = () => {
  return (
    <span
        className='
          absolute
          inline-block
          left-[50%]
          top-[50%]
          translate-x-[-50%]
          translate-y-[-50%]
        '
      >
        <span
          className='
            animate-ping
            block
            w-[40px]
            h-[40px]
            bg-blue-600/50
            rounded-full
          '
        ></span>
      </span>
  )
}

export default LoadingCircle