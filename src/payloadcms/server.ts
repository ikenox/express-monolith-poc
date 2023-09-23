import { loadSchema } from '@graphql-tools/load'
import { UrlLoader } from '@graphql-tools/url-loader'
import express from 'express'
import payload from 'payload'

export async function createServer() {
  const payloadApp = express()
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: payloadApp,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })
  payloadApp.listen(4000)
  const schema = await loadSchema('http://localhost:4000/api/graphql', {
    loaders: [new UrlLoader()],
  })

  return { app: payloadApp, schema }
}
