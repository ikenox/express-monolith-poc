import express from 'express'
import { createServer as payloadServer } from './payloadcms/server'
import { createServer as apolloServer } from './apollo-server/server'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import cors from 'cors'
import { json } from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

require('dotenv').config()

const start = async () => {
  const app = express()

  const payload = await payloadServer()
  payload.listen(3001)
  const apollo = await apolloServer()
  apollo.listen(3002)

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'apollo', url: 'http://localhost:3002/api/graphql' },
        // { name: 'payload', url: 'http://localhost:3001/api/graphql' },
      ],
    }),
  })
  const server = new ApolloServer({
    gateway,
  })
  await server.start()
  app.use('/api/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server))
  app.listen(3000)
}

start()
