import express from 'express'
import { createServer as payloadServer } from './payloadcms/server'
import { createServer as apolloServer, schema as apolloSchema } from './apollo-server/server'
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway'
import cors from 'cors'
import { json } from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import http from 'http'

require('dotenv').config()

const start = async () => {
  const app = express()

  const { app: payloadApp, schema } = await payloadServer()
  const apollo = await apolloServer()
  http.createServer()
  const server = new ApolloServer({
    schema: mergeSchemas({ schemas: [schema, apolloSchema] }),
  })
  await server.start()
  app.use('/api/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server))
  app.use('/payload', payloadApp)
  app.use('/apollo', apollo)
  app.listen(3000)
}

start()
