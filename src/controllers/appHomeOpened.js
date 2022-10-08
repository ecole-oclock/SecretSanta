import { sessionRepository } from 'src/models/session';
import app from 'src/utils/boltApp';
import dayjs from 'src/utils/dayjs';
import { homes } from 'src/views';

const { client } = app;

export default async ({ event }) => {
  const userSlackID = event.user;
  const session = await sessionRepository.fetchByYear(dayjs().format('YYYY'));

  let blocks = null;
  if (!session) {
    blocks = homes.noSession();
  } if (!session.participants.get(userSlackID)) {
    blocks = homes.notSubscribed(session);
  } else if (!session.mixDone) {
    blocks = homes.beforeMix(session, session.participants.get(userSlackID));
  } else if (session.mixDone && !session.finished) {
    blocks = homes.afterMix(
      session,
      session.participants.get(userSlackID),
      session.participants.get(session.participants.get(userSlackID).victim),
    );
  } else {
    blocks = homes.finished(session, session.participants.get(userSlackID));
  }
  // Call views.publish with the built-in client
  return client.views.publish({
    // Use the user ID associated with the event
    user_id: userSlackID,
    view: {
    // Home tabs must be enabled in your app configuration page under "App Home"
      type: 'home',
      blocks: blocks.getBlocks(),
    },
  });
};
