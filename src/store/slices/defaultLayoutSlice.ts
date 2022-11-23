import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Result } from 'server/routes/server-api'
import { User } from 'server/modules/DBManager'
import { UserMetadata } from 'firebase-admin/lib/auth/user-record'

export type InitState = {
  sign: {
    isFormOpen: boolean
    isRequesting: boolean
    errorMessage: string
    isSignChecked: boolean
  }
  userData?: User
  isUserContextWindowOpen: boolean
}

export const requestSign = createAsyncThunk<
  Result | Result<User>, // 🍄 Status
  SignFormData,
  { state: { defaultLayout: InitState } }
>('defaultLayout/requestSign', async (formData, ThunkAPI) => {
  const state = ThunkAPI.getState()

  if (!formData.user_id || !formData.password || !formData.signType) {
    return ThunkAPI.rejectWithValue({
      msg: 'Something went wrong. / User id & password are empty in the form.',
      status: 'error',
    } as Result)
  }
  if (formData.signType === 'up' && !formData.name) {
    return ThunkAPI.rejectWithValue({
      msg: 'Something went wrong. / name is empty in the form.',
      status: 'error',
    } as Result)
  }

  const { data: result } = await axios.post<Result<User | undefined>>(
    '/server-api/sign',
    { formData },
  )

  if (typeof result === 'object') {
    if (result.status === 'error') return ThunkAPI.rejectWithValue(result)
    else if (!result.data.user_id && !result.data.name) {
      return ThunkAPI.rejectWithValue({
        msg: 'Something went wrong. / User id & User name are empty in the response.',
        status: 'error',
      } as Result)
    } else return result
  } else {
    return ThunkAPI.rejectWithValue({
      msg: 'Response is invalid. / "data" is empty.',
      status: 'error',
    } as Result)
  }
})

export const checkSign = createAsyncThunk<Result | Result<User>>(
  'defaultLayout/check-sign',
  async () => {
    const { data: result } = await axios.get('/server-api/check-sign')

    return result as Result
  },
)

const initialState: InitState = {
  sign: {
    isFormOpen: false,
    isRequesting: false,
    errorMessage: '',
    isSignChecked: false,
  },
  userData: null,
  isUserContextWindowOpen: false,
}

const defaultLayoutSlice = createSlice({
  name: 'defaultLayout',
  initialState,
  reducers: {
    toggleSignModal(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === 'boolean') {
        state.sign.isFormOpen = action.payload
      } else {
        state.sign.isFormOpen = !state.sign.isFormOpen
      }
    },
    toggleUserContextWindow(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === 'boolean') {
        state.isUserContextWindowOpen = action.payload
      } else {
        state.isUserContextWindowOpen = !state.isUserContextWindowOpen
      }
    },
    addToFFCount(
      state,
      action: PayloadAction<{
        type: 'followings' | 'followers'
        value: number
      }>,
    ) {
      if (
        typeof action.payload === 'object' &&
        action.payload.type &&
        Number.isInteger(action.payload.value) &&
        state.userData
      ) {
        state.userData.ffCount[action.payload.type] += action.payload.value
      }
    },
  },
  extraReducers(builder) {
    builder
      // 🍎
      .addCase(requestSign.pending, (state) => {
        state.sign.isRequesting = true
        state.sign.errorMessage = ''
        // state.status = 'Requesting'
      })
      .addCase(requestSign.fulfilled, (state, action) => {
        state.sign.isRequesting = false
        state.sign.errorMessage = ''

        const result: Result<User> = action.payload

        state.userData = result.data
        state.sign.isFormOpen = false
      })
      .addCase(requestSign.rejected, (state, action) => {
        const result = action.payload as Result

        state.sign.isRequesting = false
        state.sign.errorMessage =
          (result && result.msg) || 'Something went wrong.'
      })
      // 🍎
      .addCase(checkSign.fulfilled, (state, action) => {
        const result = action.payload as Result | undefined
        if (result) {
          state.sign.isSignChecked = true
          state.userData = result.data

          state.sign.errorMessage = ''
          state.sign.isRequesting = false
          state.sign.isFormOpen = false
        }
      })
  },
})

export const { toggleSignModal, toggleUserContextWindow, addToFFCount } =
  defaultLayoutSlice.actions
export default defaultLayoutSlice.reducer
