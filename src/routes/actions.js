import * as controllers from 'src/controllers';

export default (app) => {
  app.action('join_session', controllers.joinSession);

  return app;
};
