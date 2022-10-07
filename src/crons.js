import cron from 'node-cron';
import { sessionRepository } from 'src/models/session';
import { mixSecretSanta, sendMerryChristmasMessage } from 'src/scripts';
import logger from 'src/utils/logger';

export default async () => {
  cron.schedule(process.env.MIX_SECRET_SANTA_CRON_SCHEDULE, () => {
    logger.debug('🌟 Execution du cron pour lancer le mix des secret santa');
    sessionRepository.fetchSessionToMix().then((session) => {
      if (session) {
        logger.debug('🤶 Une session trouvée, lançage du mixage');
        return mixSecretSanta(session);
      }
      logger.debug('🎄 Aucune session trouvée, on fait rien');
      return Promise.resolve();
    });
  });

  /**
   * C'est noel, on envoies quand même un petit message
   */
  cron.schedule('0 0 25 12 *', () => {
    logger.debug('🌟 Execution du cron pour lancer la finalisation de la session');
    sessionRepository.fetchSessionToFinish().then((session) => {
      if (session) {
        logger.debug('🤶 Une session trouvée, lançage du message de fin !');
        return sendMerryChristmasMessage(session);
      }
      logger.debug('🎄 Aucune session trouvée, on fait rien');
      return Promise.resolve();
    });
  });
};
