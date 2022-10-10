import * as asyncForEach from 'async-await-foreach';
import cron from 'node-cron';
import { sessionRepository } from 'src/models/session';
import { mixSecretSanta, sendMerryChristmasMessage, relanceSessionInscription, relanceFindGift } from 'src/scripts';
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

  /**
   * Tous les lundi on relance les gens :D
   */
  cron.schedule(process.env.RELANCE_SECRET_SANTA_CRON_SCHEDULE, () => {
    logger.debug('🌟 Execution du cron de relance');
    sessionRepository.fetchAllByYear().then((sessions) => {
      if (!sessions) {
        logger.debug('🎄 Aucune session trouvée, on fait rien');
        return Promise.resolve();
      }
      logger.debug(`🤶 ${sessions.length} session(s) trouvée(s), on regarde ce qu'on peut relancer !`);
      asyncForEach(sessions, async (session) => {
        if (session.finished) {
          logger.debug('🤶 Cette session est terminée, on laisse passer');
          return;
        }
        if (!session.mixDone) {
          logger.debug('🤶 Relance d\'inscription à une session');
          relanceSessionInscription(session);
        } else {
          logger.debug('🤶 Relance de recherche du cadeau');
          relanceFindGift(session);
        }
      });

      return Promise.resolve();
    });
  });
};
