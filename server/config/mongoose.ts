

import mongoose from 'mongoose'
import config from './config'

// connect to mongo db
const mongoUri = config.mongo.host as string;
mongoose.connect(mongoUri, { keepAlive: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

