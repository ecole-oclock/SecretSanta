import { Modal, Blocks, Elements } from 'slack-block-builder';

export default (sessionID, participantSlackID, participant) => (
  Modal({ title: 'Saisie tes informations', submit: 'C\'est parti !' })
    .callbackId('new_participation')
    .privateMetaData(sessionID)
    .blocks(
      Blocks.Section({ text: `Et coucou <@${participantSlackID}> :wave:` }),
      Blocks.Header({ text: 'Tu veux participer au secret Santa ? :gift: En voilà une chose qu\'elle est bien !' }),
      Blocks.Section({ text: `Du coup j'ai besoin de quelques informations sur toi pour ton secret santa :smirk:\nAllez commençons ! :rocket:\n`
      + `T'as des zones de texte juste en dessous rempli le tout et je me charge du reste :wink:\n\r`
      + `A toi de jouer !` }),
      Blocks.Input({ label: ':gift: Alors dis moi, t\'aimerais quoi pour Nowel ?' })
        .blockId('wouldLikeToReceive')
        .element(
          Elements.TextInput({
            placeholder: 'Un appareil à raclette, un aspirateur, des mouffles, un cache nez ...',
            initialValue: participant?.wouldLikeToReceive || '',
          })
            .multiline(true)
            .actionId('value'),
        ),
      Blocks.Input({ label: ':socks: Tu chausse du combien ? ( Au cas ou hein )' })
        .blockId('shoesSize')
        .element(
          Elements.TextInput({
            placeholder: '58 ( oué j\'ai des grands pieds )',
            initialValue: participant?.shoesSize || '',
          })
            .actionId('value'),
        ),
      Blocks.Input({ label: ':shirt: Et ta taille d\'habits ? ( Toujours au cas ou )' })
        .blockId('clothesSize')
        .element(
          Elements.TextInput({
            placeholder: 'No comment ...',
            initialValue: participant?.clothesSize || '',
          })
            .actionId('value'),
        ),
      Blocks.Input({ label: ':mailbox: Et bien-sure pour livrer tout ça il me faut une addresse postale complète' })
        .blockId('postalAddress')
        .element(
          Elements.TextInput({
            placeholder: '16 Rue de la fabrique à jouets 00000 Pôle Nord',
            initialValue: participant?.postalAddress || '',
          })
            .actionId('value'),
        ),
    )
);
