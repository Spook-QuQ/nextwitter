import http from 'http'
import dotenv from 'dotenv'
import express, { RequestHandler } from 'express'
import session from 'express-session'
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

// dbManager.createUser({
//   user_id: 'test-user-' + Math.floor(Math.random() * 10000),
//   // user_id: 'test-user-2789',
//   name: 'Test Man!',
//   password: 'super!testPassword',
//   description: 'This is a description'
// }).then(console.log)

// dbManager
//   .getUser({
//     user_id: 'test-user-1701',
//   })
//   .then(console.log)
//   .catch(console.log)

dbManager.createUser({
  user_id: 'test-user-1',
  // user_id: 'test-user-2789',
  name: 'Test Man!',
  password: 'super!testPassword',
  description: 'This is a description'
}).then(console.log).catch(console.log)
dbManager.createUser({
  user_id: 'test-user-2',
  // user_id: 'test-user-2789',
  name: 'Test Man!',
  password: 'super!testPassword',
  description: 'This is a description'
}).then(console.log).catch(console.log)

dbManager
  .getUser({
    user_id: 'test-user-1701',
  })
  .then(({ data: user }) => {
    const { followings, followers } = user as User

    const ffCount = {
      followings: Object.keys(followings || {}).length,
      followers: Object.keys(followers || {}).length
    }

    console.log(ffCount);
    
    
  })
  .catch(console.log)

nextApp.prepare().then(async () => {
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
