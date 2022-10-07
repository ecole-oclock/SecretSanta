import * as controllers from 'src/controllers';

export default (app) => {
  app.view('new_participation', controllers.newParticipation);

  return app;
};
