import * as controllers from 'src/controllers';

export default (app) => {
  app.action('join_session', controllers.joinSession);
  app.action('new_message_secret_santa', controllers.newSecretSantaMessage);
  app.action('new_message_victim', controllers.newVictimMessage);

  return app;
};
