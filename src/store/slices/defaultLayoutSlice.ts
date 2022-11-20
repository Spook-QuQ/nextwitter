import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Result } from 'server/routes/server-api'
import { User } from 'server/modules/DBManager'

export type InitState = {
  sign: {
    isFormOpen: boolean
    isRequesting: boolean
    isSignedIn: boolean
    errorMessage: string
  }
  userData?: User
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

const initialState: InitState = {
  sign: {
    isFormOpen: false,
    isRequesting: false,
    isSignedIn: false,
    errorMessage: '',
  },
  userData: null,
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
  },
  extraReducers(builder) {
    builder
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
        state.sign.isSignedIn = true
        state.sign.isFormOpen = false
      })
      .addCase(requestSign.rejected, (state, action) => {
        const result = action.payload as Result

        state.sign.isRequesting = false
        state.sign.errorMessage =
          (result && result.msg) || 'Something went wrong.'
      })
  },
})

export const { toggleSignModal } = defaultLayoutSlice.actions
export default defaultLayoutSlice.reducer
