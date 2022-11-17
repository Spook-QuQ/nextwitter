import { MouseEvent, ChangeEvent, FormEvent, useState } from 'react'

type Form = {
  signType: 'in' | 'up'
  user_id: string
  name: string
  password: string
}

type FromContent = {
  dataName: string
  type: string
  placeholder: string
}

const formContents: FromContent[] = [
  {
    dataName: 'user_id',
    type: 'text',
    placeholder: 'User ID',
  },
  {
    dataName: 'name',
    type: 'text',
    placeholder: 'User Name',
  },
  {
    dataName: 'password',
    type: 'password',
    placeholder: 'Password',
  },
]

const formInitValues: Form = {
  signType: 'in',
  user_id: '',
  name: '',
  password: '',
}

const SignInForm: React.FC = () => {

  const [formData, setFormData] = useState<Form>(formInitValues)

  const [isFocus, setIsFocus] = useState({})

  const onFocusHandler = (dataName) => {
    setIsFocus({ [dataName]: true })
  }
  const onBlurHandler = (dataName) => {
    setIsFocus({ [dataName]: false })
  }

  const onChangeLander = (
    e: ChangeEvent<HTMLInputElement>,
    dataName: string,
  ) => {
    setFormData((formData) => {
      return { ...formData, [dataName]: e.target.value }
    })
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('ok')
  }

  const onClickHandlerForChangeFormType = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const defaultInitValues: Form = {
      ...formInitValues,
      signType: formData.signType === 'in' ? 'up' : 'in'
    }
    setFormData(defaultInitValues)
  }

  return (
    <div>
      <form action='' className='max-w-sm' onSubmit={onSubmitHandler}>
        <h3 className='text-2xl font-bold text-blue-500 text-center'>
          Sign {formData.signType === 'in' ? 'In' : 'Up'}
        </h3>
        {formContents
          .filter((content) => {
            return !(formData.signType === 'in' && content.dataName === 'name')
          })
          .map((content) => {
            return (
              <p key={content.dataName} className='pt-8'>
                <label className={`relative`} htmlFor={`\$${content.dataName}`}>
                  <span
                    className={`absolute transition-all duration-200 cursor-text ${
                      isFocus[content.dataName] || !!formData[content.dataName]
                        ? 'p-0 -translate-y-[100%] opacity-1 cursor-pointer text-blue-500'
                        : 'p-2 opacity-30'
                    }`}
                  >
                    {content.placeholder}
                  </span>
                  <input
                    id={`\$${content.dataName}`}
                    className='w-full p-2 bg-slate-100 focus:outline-none focus:ring-1 ring-blue-500'
                    type={content.type}
                    // placeholder={
                    //   isFocus[content.dataName] || !!formData[content.dataName]
                    //     ? ''
                    //     : content.placeholder
                    // }
                    onFocus={() => onFocusHandler(content.dataName)}
                    onBlur={() => onBlurHandler(content.dataName)}
                    onChange={(e) => onChangeLander(e, content.dataName)}
                  />
                </label>
              </p>
            )
          })}
        <p className='mt-8 flex gap-4 justify-center align-center'>
          <button
            type='submit'
            className='
              px-2
              py-1
              rounded-sm
              bg-blue-500
              text-blue-100
            '
          >
            Sign {formData.signType === 'in' ? 'In' : 'Up'}
          </button>
          <button
            onClick={onClickHandlerForChangeFormType}
            className='
              text-sm
              font-bold
              text-blue-500
              underline
              underline-offset-4
            '
          >
            {`>> Sign ${formData.signType !== 'in' ? 'In' : 'Up'}`}
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignInForm