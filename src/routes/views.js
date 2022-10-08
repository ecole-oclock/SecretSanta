import * as controllers from 'src/controllers';

export default (app) => {
  app.view('new_participation', controllers.newParticipation);
  app.view('send_message_secret_santa', controllers.sendMessageSecretSanta);

  return app;
};
