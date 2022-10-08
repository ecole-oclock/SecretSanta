import { HomeTab, Blocks, Divider, Elements } from 'slack-block-builder';
import dayjs from 'src/utils/dayjs';

export default (session, participant) => HomeTab()
  .blocks(
    Blocks.Header({
      text: 'Ho Ho Ho :santa:',
    }),
    Divider(),
    Blocks.Section({
      text: `Salut <@${participant.id}>, l'attribution de ta victime ne sera faite que le *${dayjs(session.mixDate).format('LLLL')}*, reviens ici après cette date :wink:`,
    }),
    Divider(),
    Blocks.Section({
      text: `Pour rappel voici ce que tu as indiqué pour ton Secret Santa :santa:`,
    }),
    Blocks.Section({
      text: `:shirt: Ta taille de vêtements est *${participant.clothesSize}* `,
    }),
    Blocks.Section({
      text: `:socks: Ta taille de chaussures est *${participant.shoesSize}*`,
    }),
    Blocks.Section({
      text: `:gift: Ta wishlist est *${participant.wouldLikeToReceive}* `,
    }),
    Blocks.Section({
      text: `:mailbox: Et ton adresse complète est *${participant.postalAddress}*`,
    }),
    Blocks.Section({
      text: `Si jamais tu veux changer ces informations, tu peux toujours resaisir ton formulaire avant la date finale avec ce bouton`,
    }),
    Blocks.Actions()
      .elements(
        Elements.Button({
          text: `Modifier mes informations`,
          actionId: 'join_session',
          value: session._id.toString(),
        }).primary(true),
      ),
  );
