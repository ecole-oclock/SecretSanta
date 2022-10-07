import { Message, Blocks } from 'slack-block-builder';

export default (participant) => {
  const blocks = [
    Blocks.Section({ type: 'mrkdwn',
      text: `Ho Ho Ho Coucou toi ! :santa:` }),
    Blocks.Header({ type: 'mrkdwn', text: 'Mais qui t\'a offert ton cadeau de noel cette année ? :gift: :christmas_tree: :santa:' }),
    Blocks.Section({ type: 'mrkdwn',
      text: `Je vais te révéler l'identité secret de ton père noel :santa: ` }),
    Blocks.Section({ type: 'mrkdwn',
      text: `Il ne sagit ni plus ni moins que de <@${participant.secretSanta}> !! :gift:` }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Je pense que tu peux aller le/la remercier pour ce super cadeau qu'il ou elle t'a fait :wink:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Des bisoux ! :kissing_heart: Et passe une bonne fin de réveillon de noel !`,
    }),
  ];

  return (
    Message().blocks(...blocks)
  );
};
