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

  if (session.mixDone) {
    throw new Error('Ho Ho Ho :santa: La session a déjà démarrée, on va éviter de relancer pour les inscriptions hein ?');
  }

  return client.chat.postMessage({
    channel: session.channel,
    blocks: messages.relanceSessionInscription(session).getBlocks(),
  }).catch((error) => {
    logger.error('Une erreur est survenue durant la relance d\'inscription au secret santa');
    logger.error(error);
  });
};
