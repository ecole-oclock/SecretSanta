/* eslint-disable prefer-destructuring */
import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';

import { messages } from 'src/views';
import app from 'src/utils/boltApp';
import logger from 'src/utils/logger';

const { client } = app;
export default async (_session = null) => {
  let session = _session;

  if (!_session) {
    session = await sessionRepository.fetchByYear(dayjs().format('YYYY'));
  }

  if (!session) {
    throw new Error('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !');
  }

  if (session.finished) {
    throw new Error('Ho Ho Ho :santa: Cette session de secret santa est déjà terminée, tu ne peux pas les relancer du coup !');
  }

  if (!session.mixDone) {
    throw new Error('Ho Ho Ho :santa: La session n\'a pas démarrée on va éviter de relancer pour la recherche de cadeaux hein ?');
  }

  return client.chat.postMessage({
    channel: session.secretSantaChannel,
    blocks: messages.relanceFindGift(session).getBlocks(),
  }).catch((error) => {
    logger.error('Une erreur est survenue durant la publication de la relance de recherche de cadeaux');
    logger.error(error);
  });
};
