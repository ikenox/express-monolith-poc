import express from 'express';
import util from 'util';
import { createApp as payloadServer } from './payloadcms/server';
import { createApp as server1, schema as apolloSchema } from './server1/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema';
import { stitchSchemas } from '@graphql-tools/stitch';
import http from 'http';

require('dotenv').config();

const start = async () => {
  const app = express();

  const { app: payloadApp, schema: payloadSchema } = await payloadServer();
  const server1App = await server1();
  const schema = stitchSchemas({ subschemas: [payloadSchema, apolloSchema] });
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginCacheControl({ defaultMaxAge: 3 })],
  });
  await server.start();
  app.use('/api/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server));
  app.use(payloadApp);
  app.use(server1App);
  app.listen(3000);
  console.log('start listening port 3000');
};

start();
