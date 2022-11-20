import { configureStore } from '@reduxjs/toolkit'
import defaultLayoutReducer from './slices/defaultLayoutSlice'
import socketIoSlice from './slices/socketIoSlice'

export const store = configureStore({
  reducer: {
    defaultLayout: defaultLayoutReducer,
    socketIo: socketIoSlice
  },
})

export type AppDispatch = typeof store.dispatch
