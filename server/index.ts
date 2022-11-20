import http from 'http'
import dotenv from 'dotenv'
import express, { RequestHandler } from 'express'
import session, { SessionOptions } from 'express-session'

declare module 'express-session' {
  interface SessionData {
    user_uid: string
  }
}

import next from 'next'
import socket_io from 'socket.io'

import serverApiRouter from './routes/server-api'
import { DBManager, User } from './modules/DBManager'

dotenv.config()

const port = parseInt(process.env.PORT as any, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

const dbManager = new DBManager()

nextApp.prepare().then(async () => {
  const expressServer = express()
  expressServer.use(express.json())

  const SessionOptions: SessionOptions = {
    secret: 'This is a test secret! QuQ',
    resave: true,
    saveUninitialized: false,
    cookie: {
      // httpOnly: false,
      // secure: false,
      maxAge: 1000 * 60 * 30,
    }, // 30分
  }
  expressServer.use(session(SessionOptions))

  expressServer.set('dbManager', dbManager)

  const httpServer = http.createServer(expressServer)

  const io = new socket_io.Server(httpServer)

  expressServer.use('/server-api', serverApiRouter)
  expressServer.all('*', handle as unknown as RequestHandler)

  httpServer.listen(port)
  httpServer.on('error', (error) => {
    throw error
  })
  httpServer.on('listening', () => {
    const addr = httpServer.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log(`Listening on ${bind}`)
    if (dev) console.log('http://localhost:' + port)
  })
}) // ROOT
