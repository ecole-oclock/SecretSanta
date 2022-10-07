import actions from './actions';
import commands from './commands';
import events from './events';
import messages from './messages';
import views from './views';

export default (app) => {
  messages(app);
  events(app);
  commands(app);
  actions(app);
  views(app);
  return app;
};
