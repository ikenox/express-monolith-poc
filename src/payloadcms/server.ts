import { loadSchema } from '@graphql-tools/load';
import { UrlLoader } from '@graphql-tools/url-loader';
import express from 'express';
import payload from 'payload';

export async function createApp() {
  const app = express();
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      payload.logger.info(`Payload API URL: ${payload.getAPIURL()}`);
    },
  });
  app.listen(4000);
  const schema = await loadSchema('http://localhost:4000/payload/api/graphql', {
    loaders: [new UrlLoader()],
  });

  return { app, schema };
}
