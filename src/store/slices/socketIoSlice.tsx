import { createSlice } from '@reduxjs/toolkit'
import { io, Socket } from 'socket.io-client'

/* TODO:
  🍄 socket connects to express.session

  🍄 subsclibe
    - ff count
    - timeline
    - notification
      - like
      - reply
      - ff
*/

type InitState = {
  socket?: Socket
}

const initialState: InitState = {
  socket: null
}

const socketIoSlice = createSlice({
  name: 'socketIo',
  initialState,
  reducers: {

  }
})

export const {} = socketIoSlice.actions

export default socketIoSlice.reducer