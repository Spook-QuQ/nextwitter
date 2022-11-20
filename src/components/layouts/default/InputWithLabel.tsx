import { useState, ChangeEvent } from 'react'

type Props = {
  label?: string
  name?: string
  type: 'text' | 'password'
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputWithLabel: React.FC<Props> = ({
  label,
  name,
  value,
  type,
  onChange,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const onFocusHandler = () => setIsFocus(true)
  const onBlurHandler = () => setIsFocus(false)

  return (
    <label className={`relative`}>
      <span
        className={`absolute transition-all duration-200 cursor-text ${
          isFocus || value
            ? 'p-0 -translate-y-[100%] opacity-1 cursor-text text-blue-500'
            : 'p-2 opacity-30'
        }`}
      >
        {label}
      </span>
      <input
        className='w-full p-2 bg-slate-100 focus:outline-none focus:ring-1 ring-blue-500'
        type={type}
        // placeholder={
        //   isFocus[content.dataName] || !!formData[content.dataName]
        //     ? ''
        //     : content.placeholder
        // }
        value={value}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        onChange={onChange}
      />
    </label>
  )
}

export default InputWithLabel
