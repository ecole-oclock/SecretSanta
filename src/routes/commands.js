import * as controllers from 'src/controllers';

export default (app) => {
  app.command('/santa-start', controllers.startNewSession);
  app.command('/santa-mix', controllers.mixSessionParticipants);
  app.command('/santa-merry-christmas', controllers.sendMerryChristmas);
  return app;
};
