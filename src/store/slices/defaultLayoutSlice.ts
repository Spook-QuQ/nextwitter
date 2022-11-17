import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InitState = {
  isSignFormOpen: boolean
}

const initialState: InitState = {
  isSignFormOpen: false,
}

export const defaultLayoutSlice = createSlice({
  name: 'defaultLayout',
  initialState,
  reducers: {
    toggleSignModal(state, action: PayloadAction<boolean | undefined>) {
      if (typeof action.payload === 'boolean') {
        state.isSignFormOpen = action.payload
      } else {
        state.isSignFormOpen = !state.isSignFormOpen
      }
    },
  },
})

export const { toggleSignModal } = defaultLayoutSlice.actions
export default defaultLayoutSlice.reducer
