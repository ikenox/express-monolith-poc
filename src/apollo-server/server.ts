import { ApolloServer } from '@apollo/server'

import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import gql from 'graphql-tag'

import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { json } from 'body-parser'
import express from 'express'
import { buildSubgraphSchema } from '@apollo/subgraph'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export async function createServer() {
  const app = express()

  const server = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers,
      },
    ]),
  })
  await server.start()

  app.use('/api/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server))
  return app
}
