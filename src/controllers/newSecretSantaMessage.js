import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';
import { modals } from 'src/views';

export default async ({ ack, payload, body, client, logger }) => {
  await ack();

  const channelID = body?.container?.channel_id;
  const triggerID = body.trigger_id;

  try {
    const { value: participantID } = payload;

    const session = await sessionRepository.fetchByYear(Number(dayjs().format('YYYY')));
    if (!session) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !').buildToJSON(),
      }).catch((error) => logger.error(error));
    }
    if (session.startedAt && !dayjs(session.startedAt).isSame(dayjs(), 'year')) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ce secret santa est passé déjà ! Tu t\'es pas trompé de bouton par hasard ?').buildToJSON(),
      });
    }
    return await client.views.open({
      channel: channelID,
      trigger_id: triggerID,
      view: modals.showSendMessageSecretSanta(session._id.toString(), participantID).buildToJSON(),
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
