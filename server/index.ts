import http from 'http'
import dotenv from 'dotenv'
import express, { RequestHandler } from 'express'
import session from 'express-session'
import next from 'next'
import socket_io from 'socket.io'

dotenv.config()

const port = parseInt(process.env.PORT as any, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const expressServer = express()
  expressServer.use(express.json())
  expressServer.use(
    session({
      secret: 'This is a test secret! QuQ',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 30 }, // 30分
    }),
  )

  const httpServer = http.createServer(expressServer)

  const io = new socket_io.Server(httpServer)

  expressServer.all('*', handle as unknown as RequestHandler)

  httpServer.listen(port)
  httpServer.on('error', (error) => {
    throw error
  })
  httpServer.on('listening', () => {
    const addr = httpServer.address()
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    console.log(`Listening on ${bind}`)
  })

}) // ROOT
