import express from 'express'
import { createServer as payloadServer } from './payloadcms/server'
import { createServer as apolloServer, schema as apolloSchema } from './apollo-server/server'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import cors from 'cors'
import { json } from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'

require('dotenv').config()

const start = async () => {
  const app = express()

  const { app: payload, schema } = await payloadServer()
  payload.listen(3001)
  const apollo = await apolloServer()
  apollo.listen(3002)

  const server = new ApolloServer({
    schema: mergeSchemas({ schemas: [schema, apolloSchema] }),
  })
  await server.start()
  app.use('/api/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server))
  app.listen(3000)
}

start()
