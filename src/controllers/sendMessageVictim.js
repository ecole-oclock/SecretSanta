import { sessionRepository } from 'src/models/session';
import { modals } from 'src/views';
import extractModalFormValues from 'src/utils/extractFormValues';

export default async ({ ack, view, body, client, logger }) => {
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
    const { message } = extractModalFormValues(view);

    const participant = session.participants?.get?.(participantSlackId);

    await client.chat.postMessage({
      channel: participant.victim,
      text: `Hello <@${participant.secretSanta}> ta Secret Santa <@${participant.id}> a un message à te transmettre, le voici :\n*${message}*`,
    });
    return client.chat.postMessage({
      channel: participant.id,
      text: `C'est bon j'ai bien envoyé le message suivant à ta victime :\n*${message}*`,
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
