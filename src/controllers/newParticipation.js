import { sessionRepository } from 'src/models/session';
import { modals } from 'src/views';
import extractModalFormValues from 'src/utils/extractFormValues';
import * as Sentry from '@sentry/node';

export default async ({ ack, payload, view, body, client, logger }) => {
  await ack();

  const participantSlackId = body?.user?.id;
  const channelID = body?.container?.channel_id;
  const triggerID = body.trigger_id;
  const sessionID = view.private_metadata;

  try {
    const session = await sessionRepository.fetchById(sessionID);
    if (!session) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas ! Mais comment t\'a fais ça ?').buildToJSON(),
      }).catch((error) => logger.error(error));
    }
    if (session.mixDone) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ho Ho Ho :santa: Les secret santa on déjà été attribués tu arrives trop tard ! C\'est balot hein ?').buildToJSON(),
      }).catch((error) => logger.error(error));
    }
    await session.addParticipant(body.user);

    if (session.secretSantaChannel) {
      await client.conversations.invite({
        channel: session.secretSantaChannel,
        users: participantSlackId,
      }).catch((error) => {
        logger.error(`Impossible d'inviter l'utilisateur ${body.user.username}(${body.user.id}) dans le canal ${session.secretSantaChannel}`);
        logger.error(error);
      });
    }
    const participation = extractModalFormValues(view);
    await session.setParticipation(body.user, participation);

    return client.chat.postMessage({
      channel: participantSlackId,
      text: `Hello <@${participantSlackId}> :wave: J'ai bien enregistré ta participation ! Je reviens vers toi dès que j'ai trouvé ton secret santa :grin:`,
    });
  } catch (error) {
    client.views.open({
      channel: channelID,
      trigger_id: triggerID,
      view: modals.showError(error).buildToJSON(),
    }).catch((error) => logger.error(error));
    throw error;
  }
};
