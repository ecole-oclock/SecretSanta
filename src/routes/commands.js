import * as controllers from 'src/controllers';

export default (app) => {
  app.command('/santa-start', controllers.startNewSession);
  app.command('/santa-mix', controllers.mixSessionParticipants);
  app.command('/santa-merry-christmas', controllers.sendMerryChristmas);
  app.command('/santa-relance-inscription', controllers.sendRelanceSessionInscription);
  app.command('/santa-relance-find-gift', controllers.sendRelanceFindGift);
  return app;
};
