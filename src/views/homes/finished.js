import { HomeTab, Blocks, Divider } from 'slack-block-builder';

export default (session, participant) => HomeTab()
  .blocks(
    Blocks.Header({
      text: 'Secret Santa',
    }),
    Divider(),
    Blocks.Section({ type: 'mrkdwn',
      text: `Ho Ho Ho Coucou toi ! :santa:` }),
    Blocks.Header({ type: 'mrkdwn', text: 'Mais qui t\'a offert ton cadeau de noel cette année ? :gift: :christmas_tree: :santa:' }),
    Blocks.Section({ type: 'mrkdwn',
      text: `Il ne sagit ni plus ni moins que de <@${participant.secretSanta}> !! :gift:` }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Je pense que tu peux aller le/la remercier pour ce super cadeau qu'il ou elle t'a fait :wink:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `J'espère que ce secret santa s'est bien passé pour toi, à l'année prochaine ! :wave:`,
    }),
  );
