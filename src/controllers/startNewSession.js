import { sessionRepository } from 'src/models/session';
import dayjs from 'src/utils/dayjs';
import { messages } from 'src/views';

export default async ({ ack, respond, payload, logger, client }) => {
  // Acknowledge command request
  await ack();
  if (payload?.channel_name === 'directmessage') {
    return respond('Ça va être compliqué de faire secret santa dans une conversation privé non ? Recommencence dans un canal pour voir :wink:');
  }

  try {
    const secretSantaCanalName = `secret-santa-${dayjs().format('YYYY')}`;
    const secretSantaChannel = await client.conversations.create({
      name: secretSantaCanalName,
    }).catch((error) => {
      logger.error(`Impossible de créer le canal #${secretSantaCanalName}`);
      logger.error(error);
    });

    if (secretSantaChannel?.channel?.id) {
      await client.conversations.invite({
        channel: secretSantaChannel?.channel.id,
        users: payload.user_id,
      }).catch((error) => {
        logger.error(`Impossible d'inviter l'utilisateur ${payload.user_name}(${payload.user_id}) dans le canal ${secretSantaChannel?.channel?.id}`);
        logger.error(error);
      });
    }

    // Création du session dans la BDD
    const session = await sessionRepository.create({
      channel: payload?.channel_id,
      secretSantaChannel: secretSantaChannel?.channel?.id,
      startedAt: dayjs().startOf('date'),
      year: Number(dayjs().format('YYYY')),
      creator: payload.user_id,
    });
    return client.chat.postMessage({
      channel: payload.channel_id,
      blocks: messages.sessionStart({ user: payload.user_id, channel: payload.channel_id, session }).getBlocks(),
    });
  } catch (error) {
    respond(error.message);
    throw error;
  }
};
