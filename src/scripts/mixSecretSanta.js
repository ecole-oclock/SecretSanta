/* eslint-disable prefer-destructuring */
import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';
import asyncForEach from 'async-await-foreach';

import { messages } from 'src/views';
import app from 'src/utils/boltApp';
import logger from 'src/utils/logger';

const { client } = app;

const getShuffledArr = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

export default async (_session = null) => {
  let session = _session;

  if (!_session) {
    session = await sessionRepository.fetchByYear(dayjs().format('YYYY'));
  }

  if (!session) {
    throw new Error('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !');
  }
  if (session.mixDone) {
    throw new Error('Ho Ho Ho :santa: Cette session a déjà été mélangée ! On recommence pas !');
  }
  const randomizedUsersSlackIDS = getShuffledArr(Array.from(session.participants.keys()));
  await asyncForEach(randomizedUsersSlackIDS, async (userSlackID, index) => {
    const currentParticipant = session.participants.get(userSlackID);
    if (index === 0) {
      // Le premier de la liste recoi un cadeau du dernier de la liste
      currentParticipant.secretSanta = randomizedUsersSlackIDS[randomizedUsersSlackIDS.length - 1];
      currentParticipant.victim = randomizedUsersSlackIDS[index + 1];
    } else if ((randomizedUsersSlackIDS.length - 1) === index) {
      currentParticipant.secretSanta = randomizedUsersSlackIDS[index - 1];
      // Le dernier de la liste offre un cadeau au premier de la liste
      currentParticipant.victim = randomizedUsersSlackIDS[0];
    } else {
      currentParticipant.secretSanta = randomizedUsersSlackIDS[index - 1];
      currentParticipant.victim = randomizedUsersSlackIDS[index + 1];
    }
  });
  session.mixDone = true;
  await session.save();
  client.chat.postMessage({
    channel: session.secretSantaChannel,
    blocks: messages.mixDone().getBlocks(),
  }).catch((error) => {
    logger.error('Une erreur est survenue durant la publication du message de mélange terminé');
    logger.error(error);
  });

  return asyncForEach(Array.from(session.participants.keys()), async (participantKey) => {
    const participant = session.participants.get(participantKey);
    const victim = session.participants.get(participant.victim);

    return client.chat.postMessage({
      channel: participant.id,
      blocks: messages.sendSecretSanta(session, victim).getBlocks(),
    }).catch((error) => {
      logger.error('Une erreur est survenue durant la publication du message de mélange terminé');
      logger.error(error);
    });
  });
};
