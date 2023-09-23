import express from 'express'
import { createServer as payloadServer } from './payloadcms/server'
import { createServer as apolloServer } from './apollo-server/server'

require('dotenv').config()

const start = async () => {
  const app = express()

  const payload = await payloadServer()
  payload.listen(3001)
  const apollo = await apolloServer()
  apollo.listen(3002)

  app.listen(3000)
}

start()
