import { configureStore } from '@reduxjs/toolkit'
import defaultLayoutReducer from './slices/defaultLayoutSlice'

export const store = configureStore({
  reducer: {
    defaultLayout: defaultLayoutReducer,
  },
})

export type AppDispatch = typeof store.dispatch
