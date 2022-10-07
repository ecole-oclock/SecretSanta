import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';
import { messages } from 'src/views';

export default async ({ ack, respond, payload, logger, client }) => {
  // Acknowledge command request
  await ack();
  if (payload?.channel_name === 'directmessage') {
    return respond('Ça va être compliqué de faire secret santa dans une conversation privé non ? Recommencence dans un canal pour voir :wink:');
  }

  try {
    const session = sessionRepository.fetchByYear(dayjs().format('YYYY'));
    logger.log(session);
  } catch (error) {
    respond(error.message);
    throw error;
  }
};
