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
    let mixDate = dayjs()
      .date(15)
      .month(10)
      .hour(12)
      .minute(30); // le 15/11 à 12h30 par défaut

    if (payload.text.trim()) {
      mixDate = dayjs(payload.text.trim())
        .hour(12)
        .minute(30);
    }

    if (!mixDate.isValid()) {
      throw new Error('Ho Ho Ho ! :santa: La date prévue pour l\'attribution des secret santa est incorrecte');
    }
    const hasSession = await sessionRepository.fetchByYear(Number(dayjs().format('YYYY')));
    if (hasSession) {
      throw new Error('Ho Ho Ho ! La session est déjà démarrée mon petit :wink:');
    }
    const secretSantaCanalName = `secret-santa-${dayjs().format('YYYY')}`;
    const secretSantaChannelID = await client.conversations.create({
      name: secretSantaCanalName,
    })
      .then(({ channel }) => channel?.id)
      .catch((error) => {
        if (error.data.error === 'name_taken') {
          // Alors on cherche le canal
          return client.conversations.list()
            .then((result) => result?.channels?.find((channel) => channel.name === secretSantaCanalName)?.id);
        }
        logger.error(`Impossible de créer le canal #${secretSantaCanalName}`);
        logger.error(error);
        return null;
      });

    if (!secretSantaChannelID) {
      throw new Error(`Impossible de retracer l'id du channel ${secretSantaCanalName}`);
    }
    await client.conversations.invite({
      channel: secretSantaChannelID,
      users: payload.user_id,
    }).catch((error) => {
      logger.error(`Impossible d'inviter l'utilisateur ${payload.user_name}(${payload.user_id}) dans le canal ${secretSantaChannelID}`);
      logger.error(error);
    });

    // Création du session dans la BDD
    const session = await sessionRepository.create({
      channel: payload?.channel_id,
      mixDate: mixDate.toDate(),
      secretSantaChannel: secretSantaChannelID,
      startedAt: dayjs().startOf('date'),
      year: Number(mixDate.format('YYYY')),
      creator: payload.user_id,
    });

    // Si il n'est pas dans le channel, on le fait joindre le channel du coup !
    await client.conversations.join({ channel: payload.channel_id }).catch((error) => {
      logger.error(`Impossible de rejoindre le channel ${payload.channel_id}`);
      logger.error(error);
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
