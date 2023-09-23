import express from 'express';
import payload from 'payload';

require('dotenv').config();

const start = async () => {
  const defaultApp = express();
  defaultApp.listen(3000);

  const payloadApp = express();
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: payloadApp,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });
  payloadApp.listen(3001);
};

start();
