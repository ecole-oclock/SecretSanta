/* eslint-disable prefer-destructuring */
import * as Sentry from '@sentry/node';
import { sessionRepository } from 'src/models/session';
import { sendMerryChristmasMessage } from 'src/scripts';
import dayjs from 'src/utils/dayjs';
import logger from 'src/utils/logger';

export default async ({ ack, respond, payload }) => {
  // Acknowledge command request
  await ack();
  try {
    if (payload?.channel_name === 'directmessage') {
      throw new Error('Ça va être compliqué de faire secret santa dans une conversation privé non ? Recommencence dans un canal pour voir :wink:');
    }
    const session = await sessionRepository.fetchByYear(dayjs().format('YYYY'));

    if (!session) {
      throw new Error('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !');
    }

    if (payload.user_id !== session.creator) {
      throw new Error('Ho Ho Ho :santa: Seul le créateur de cette session peut faire ça petit coquin :wink: Je t\'ajoute à la liste des enfant pas sâges ?:x: :gift:');
    }

    if (!session.mixDone) {
      throw new Error('Ho Ho Ho :santa: Les secret santa n\'ont même pas encoré été trouvé, tu vas un peu vite !');
    }

    if (session.finished) {
      throw new Error('Ho Ho Ho :santa: Cette session de secret santa est déjà terminée, tu ne peux pas renvoyer le message !');
    }


    return await sendMerryChristmasMessage();
  } catch (error) {
    respond(error.message);
    logger.error(error);
    Sentry.captureException(error);
    throw error;
  }
};
