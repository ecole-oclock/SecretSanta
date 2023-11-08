import { HomeTab, Blocks, Divider, Elements } from 'slack-block-builder';


export default (session, participant, victim) => HomeTab()
  .blocks(
    Blocks.Header({
      text: 'Ho Ho Ho :santa:',
    }),
    Divider(),
    Blocks.Section({
      text: `:wave: Hello <@${participant.id}>, ça y est c'est fait, tu es la victime de ton Secret Santa et surtout tu as ta propre victime qui n'est autre que <@${participant.victim}> :wink:`,
    }),
    Divider(),
    Blocks.Header({
      text: 'Les informations de ta victime',
    }),
    Blocks.Section({
      text: `Pour rappel voici ce que <@${participant.victim}> as indiqué pour toi :santa:`,
    }),
    Blocks.Section({
      text: `:shirt: Sa taille de vêtements est *${victim.clothesSize}* `,
    }),
    Blocks.Section({
      text: `:socks: Sa taille de chaussures est *${victim.shoesSize}*`,
    }),
    Blocks.Section({
      text: `:gift: Sa wishlist est *${victim.wouldLikeToReceive}* `,
    }),
    Blocks.Section({
      text: `:mailbox: Et son adresse complète est *${victim.postalAddress}*`,
    }),
    Divider(),
    Blocks.Header({
      text: 'Les informations que tu as fournis à ton secret santa',
    }),
    Blocks.Section({
      text: `Pour rappel voici ce que *tu* as indiqué pour ton Secret Santa :santa:`,
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
    Divider(),
    Blocks.Section({
      text: `Si jamais tu veux changer ces informations, c'est trop tard fallait se bouger les fesses avant :grin:\nBon quand même je suis gentil tu peux envoyer un message à ton Secret Santa avec ce bouton mais tu sauras pas à qui je l'envoi :smirk:`,
    }),
    Blocks.Actions()
      .elements(
        Elements.Button({
          text: `Message à mon Secret Santa`,
          actionId: 'new_message_secret_santa',
          value: participant.id,
        }).primary(true),
      ),
    Blocks.Actions()
      .elements(
        Elements.Button({
          text: `Message à ma victime`,
          actionId: 'new_message_victim',
          value: participant.id,
        }).primary(true),
      ),
    Blocks.Section({
      text: `:warning: *Attention ne transmet pas d'information qui pourrait faire comprendre qui tu es :wink:*`,
    }),
  );
