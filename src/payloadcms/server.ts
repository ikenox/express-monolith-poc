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
  return payloadApp
}
