/* eslint-disable prefer-destructuring */
import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';

import { messages } from 'src/views';
import app from 'src/utils/boltApp';
import logger from 'src/utils/logger';
import asyncForEach from 'async-await-foreach';

const { client } = app;
export default async (_session = null) => {
  let session = _session;

  if (!_session) {
    session = await sessionRepository.fetchByYear(dayjs().format('YYYY'));
  }

  if (!session) {
    throw new Error('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !');
  }
  client.chat.postMessage({
    channel: session.secretSantaChannel,
    blocks: messages.sendMerryChristmas(session).getBlocks(),
  }).catch((error) => {
    logger.error('Une erreur est survenue durant la publication du message joyeux nowel');
    logger.error(error);
  });

  session.finished = true;
  await session.save();

  return asyncForEach(Array.from(session.participants.keys()), (participantKey) => {
    const participant = session.participants.get(participantKey);

    return client.chat.postMessage({
      channel: participant.id,
      blocks: messages.sendWhoIsYourSecretSanta(participant).getBlocks(),
    }).catch((error) => {
      logger.error('Une erreur est survenue durant la publication du message joyeux nowel');
      logger.error(error);
    });
  });
};
