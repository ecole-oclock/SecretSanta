import * as controllers from 'src/controllers';

export default (app) => {
  app.event('app_home_opened', controllers.appHomeOpened);
  return app;
};
