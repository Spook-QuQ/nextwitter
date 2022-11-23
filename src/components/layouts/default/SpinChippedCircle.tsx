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
            animate-spin
            block
            w-[40px]
            h-[40px]
            border-4
            border-blue-600/50 border-l-transparent
            rounded-full
          '
        ></span>
      </span>
  )
}

export default LoadingCircle