import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { SignFormData } from '@/components/layouts/default/SignForm'
import { Result } from 'server/routes/server-api'

export type InitState = {
  sign: {
    isFormOpen: boolean
    isRequesting: boolean
    isSignedIn: boolean
    statusIfError: string
  }
}

export const requestSign = createAsyncThunk<
  Result | undefined, // 🍄 Status
  SignFormData,
  { state: { defaultLayout: InitState } }
>('defaultLayout/requestSign', async (formData, ThunkAPI) => {
  const state = ThunkAPI.getState()

  if (!formData.user_id || !formData.password || !formData.signType) return
  if (formData.signType === 'up' && !formData.name) return

  const { data } = await axios.post('/server-api/sign', { formData })
  return data as Result
})

const initialState: InitState = {
  sign: {
    isFormOpen: false,
    isRequesting: false,
    isSignedIn: false,
    statusIfError: '',
  },
}

export const defaultLayoutSlice = createSlice({
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
    toggleIsSignedIn(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === 'boolean') {
        state.sign.isSignedIn = action.payload
      } else {
        state.sign.isSignedIn = !state.sign.isSignedIn
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestSign.pending, (state) => {
        state.sign.isRequesting = true
        // state.status = 'Requesting'
      })
      .addCase(requestSign.fulfilled, (state, action) => {
        state.sign.isRequesting = false
        const { payload } = action
        if (payload) {
        }

        // state.sign.isSignedIn = true
      })
      .addCase(requestSign.rejected, (state) => {
        state.sign.isRequesting = false
        state.sign.statusIfError = 'Error'
      })
  },
})

export const { toggleSignModal } = defaultLayoutSlice.actions
export default defaultLayoutSlice.reducer
