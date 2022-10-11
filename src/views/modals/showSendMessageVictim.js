import { Modal, Blocks, Elements } from 'slack-block-builder';

export default (sessionID, participantSlackID) => (
  Modal({ title: 'Cher victime ...', submit: 'Envoyer le message' })
    .callbackId('send_message_victim')
    .privateMetaData(sessionID)
    .blocks(
      Blocks.Section({ text: `Et coucou <@${participantSlackID}> :wave:` }),
      Blocks.Header({ text: 'Tu as décidé d\'envoyer un message à ta victime ?' }),
      Blocks.Section({ text: `Je te laisse l'écrire ci-dessous et je lui transmettrais :wink:\n\r`
      + `A toi de jouer !` }),
      Blocks.Input({ label: 'Quel est ton message ?' })
        .blockId('message')
        .element(
          Elements.TextInput({
            placeholder: 'Au fait tu sais pas quoi ? ....',
          })
            .multiline(true)
            .actionId('value'),
        ),
    )
);
