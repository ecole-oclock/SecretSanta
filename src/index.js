import 'dotenv-flow/config';

import connectDB from 'src/bdd';
import mainRouter from 'src/routes';
import { errorMiddleware } from 'src/middlewares';
import app from 'src/utils/boltApp';
import crons from 'src/crons';
import logger from './utils/logger';

app.error(errorMiddleware);
mainRouter(app);

connectDB()
  .then(() => app.start())
  .then(() => crons())
  .then(() => {
    logger.info('🎁 Secret Santa is running! 🎁🎄');
  });

export default app;
