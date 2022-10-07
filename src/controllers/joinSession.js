import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';
import { modals } from 'src/views';

export default async ({ ack, payload, body, client, logger }) => {
  await ack();

  const channelID = body?.container?.channel_id;
  const triggerID = body.trigger_id;

  try {
    const { value: sessionID } = payload;

    const session = await sessionRepository.fetchById(sessionID);
    if (!session) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ho Ho Ho :santa: Cette session de secret santa n\'existe pas !').buildToJSON(),
      }).catch((error) => logger.error(error));
    }
    if (session.mixDone) {
      return client.views.open({
        channel: channelID,
        trigger_id: triggerID,
        view: modals.showError('Ho Ho Ho :santa: Les secret santa ont déjà été attribués tu arrives trop tard ! C\'est balot hein ?').buildToJSON(),
      }).catch((error) => logger.error(error));
    }
    const participant = await session.participants?.get?.(body.user?.id);

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
      view: modals.showParticipationForm(session._id.toString(), body.user?.id, participant).buildToJSON(),
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
