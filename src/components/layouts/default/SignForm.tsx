import { MouseEvent, ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleSignModal,
  requestSign,
  InitState,
} from '@/store/slices/defaultLayoutSlice'
import { AppDispatch } from '@/store'
import CloseButton from './CloseButton'
import InputWithLabel from './InputWithLabel'
import PingCircle from './PingCircle'
import Overlay from './Overlay'

export type SignFormData = {
  signType: 'in' | 'up'
  user_id: string
  name: string
  password: string
}

type FromContent = {
  dataName: string
  type: 'text' | 'password'
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

const formInitValues: SignFormData = {
  signType: 'in',
  user_id: '',
  name: '',
  password: '',
}

type Props = {
  // isOpen?: boolean
}

const SignInForm: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch()

  const [formData, setFormData] = useState<SignFormData>({ ...formInitValues })

  const [isFocus, setIsFocus] = useState({})

  const isOpen = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isFormOpen,
  )

  const errorMessage = useSelector<{ defaultLayout: InitState }, string>(
    (state) => state.defaultLayout.sign.errorMessage,
  )

  const isRequesting = useSelector<{ defaultLayout: InitState }, boolean>(
    (state) => state.defaultLayout.sign.isRequesting,
  )

  const onFocusHandler = (dataName) => {
    setIsFocus({ [dataName]: true })
  }
  const onBlurHandler = (dataName) => {
    setIsFocus({ [dataName]: false })
  }

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    dataName: string,
  ) => {
    setFormData((formData) => {
      return { ...formData, [dataName]: e.target.value }
    })
  }

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(requestSign(formData))
  }

  const onClicForCloseWindow = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.preventDefault()
    dispatch(toggleSignModal(false))
  }

  const onClickHandlerForChangeFormType = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const defaultInitValues: SignFormData = {
      ...formInitValues,
      signType: formData.signType === 'in' ? 'up' : 'in',
    }
    setFormData(defaultInitValues)
  }
  return (
    <Overlay isOpen={isOpen}>
      <>
        <form
          action=''
          className='quq_inner-of-overlay'
          onSubmit={onSubmitHandler}
        >
          <span
            className='
            absolute
            right-0
            top-0
            p-6
          '
          >
            <CloseButton onClick={onClicForCloseWindow} />
          </span>
          <h3 className='text-2xl font-bold text-blue-500 text-center'>
            Sign {formData.signType === 'in' ? 'In' : 'Up'}
          </h3>
          {formContents
            .filter((content) => {
              return !(
                formData.signType === 'in' && content.dataName === 'name'
              )
            })
            .map((content) => {
              return (
                <p key={content.dataName} className='pt-8'>
                  <InputWithLabel
                    value={formData[content.dataName]}
                    label={content.placeholder}
                    type={content.type}
                    onChange={(e) => onChangeHandler(e, content.dataName)}
                  />
                </p>
              )
            })}
          <p className='mt-8 flex gap-4 justify-center align-center'>
            <button type='submit' className='quq_main-button'>
              Sign {formData.signType === 'in' ? 'In' : 'Up'}
            </button>
            <button
              onClick={onClickHandlerForChangeFormType}
              className='
              text-sm
              text-blue-500
              underline
              underline-offset-4
            '
            >
              {`> Sign ${formData.signType !== 'in' ? 'In' : 'Up'}`}
            </button>
          </p>
        </form>
        {isRequesting && <PingCircle />}
        <div
          className={`
          absolute
          bottom-0
          left-[50%]
          translate-x-[-50%]
          bg-white
          text-center overflow-hidden
          transition-all duration-300
          text-red-600
          font-bold
          shadow-md
          rounded-md
          ${errorMessage ? 'mb-8 p-4 max-h-[80px]' : 'm-0 p-0 max-h-0'}
        `}
        >
          <span className='block'>{errorMessage}</span>
        </div>
      </>
    </Overlay>
  )
}

export default SignInForm
