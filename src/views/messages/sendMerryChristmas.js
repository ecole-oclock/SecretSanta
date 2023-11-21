import { Message, Blocks } from 'slack-block-builder';

export default (session) => {
  const blocks = [
    Blocks.Section({ type: 'mrkdwn',
      text: `Ho Ho Ho <!here> :santa:` }),
    Blocks.Header({ type: 'mrkdwn', text: 'Joyeux Noël :gift: :christmas_tree: :santa:  !!' }),
    Blocks.Section({ type: 'mrkdwn',
      text: `C'est le jour J ! Je vous souhaite à tous un très joyeux noel plein de cadeaux :gift: et plein d'amour :love_letter: ` }),
    Blocks.Section({ type: 'mrkdwn',
      text: `Cette année nous étions *${session.participants?.size} participants* au secret santa ! :tada:` }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `J'espère que vous avez tous été gâtés et que vos cadeaux vous plaisent, je vais passer vous voir en MP pour vous révèler l'identité de votre Secret Santa :santa:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `N'oubliez pas les photos de vos cadeaux sur ce canal ! :camera_with_flash: :gift: `,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Des bisoux à tous ! :kissing_heart: Et passez un bon réveillon de noel !`,
    }),
    Blocks.Image({ imageUrl: 'https://media.tenor.com/tF7QYiNQc4sAAAAd/merry-christmas-wrecking-ball.gif', altText: 'Merry christmas' }),
  ];

  return (
    Message().blocks(...blocks)
  );
};
