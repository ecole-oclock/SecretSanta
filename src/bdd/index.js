import mongoose from 'mongoose';
import logger from 'src/utils/logger';

export default function connectDB() {
  logger.info('🤖  Connecting database...');
  return mongoose.connect(process.env.MONGO_URI).then(() => {
    logger.info('✅  Connecting database done!\n');
  }).catch((error) => {
    logger.error('⚠️ Error while connecting to DB');
    throw error;
  });
}
