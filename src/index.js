import 'dotenv-flow/config';
import { App } from '@slack/bolt';

import connectDB from 'src/bdd';
import mainRouter from 'src/routes';
import { errorMiddleware } from 'src/middlewares';
import logger from './utils/logger';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // Socket Mode doesn't listen on a port, but in case you want your app to respond to OAuth,
  // you still need to listen on some port!
  port: process.env.PORT || 3000,
  extendedErrorHandler: true,
  logger,
});

app.error(errorMiddleware);
mainRouter(app);


connectDB()
  .then(() => app.start()).then(() => {
    logger.info('🎁 Secret Santa is running! 🎁🎄');
  });

export default app;
