import { Message, Blocks } from 'slack-block-builder';

export default (session, secretSantaVictim) => {
  const blocks = [
    Blocks.Section({ type: 'mrkdwn',
      text: `Bonjour à toi cher Père Noël Secret de la péda :santa: !` }),
    Blocks.Header({ type: 'mrkdwn',
      text: `Le grand tirage au sort t'a trouvé un secret Santa !` }),
    Blocks.Section({ type: 'mrkdwn',
      text: `En effet, le grand tirage au sort t'a désigné pour être le joyeux généreux Secret Santa de <@${secretSantaVictim.id}> :tada: !` }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Petit rappel des règles du jeu en tant que Père Noël Secret :snowman_without_snow: :`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Tu te mets en quête du cadeau de <@${secretSantaVictim.id}> dans un budget maximum de ${process.env.BUDGET_MAX}€ frais de port inclus (libre à toi de dépenser plus ou moins) :gift:`
        + ` Bien évidement, tu ne vends pas la mèche, <@${secretSantaVictim.id}> ne doit surtout pas savoir que tu es son Père Noël Secret :zipper_mouth_face: Tu envoies le cadeau`
        + ` début décembre histoire que la poste (ou tout autre transporteur de ton choix) puisse livrer le cadeau avant Noël :package:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Tu peux me donner en MP le numéro de suivi ainsi que le nom du transporteur, j'en informerais <@${secretSantaVictim.id}> pour qu'iel puisse suivre son colis :ear:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Mais tu n'es pas que le Père Noël Secret de <@${secretSantaVictim.id}> ! Toi aussi tu va recevoir un joli cadeau (j'espère... je ne peux rien te promettre :smirk:  )`
        + ` ! Donc il te faudra respecter les consignes suivantes :`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `:one: *NE PAS OUVRIR LE CADEAU AVANT LE 25/12* :christmas_tree: (je t'ai à l'oeil :eyes: !)\n`
        + `:two: Faire une photo lors du déballage :camera_with_flash:\n`
        + `:three: Et poster la photo sur le canal #secret-santa-${session.year} pour remercier, bien évidement, ton Père Noël Secret :hugging_face:`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `<@${secretSantaVictim.id}> ne sera ni repris.e ni échangé.e, tu dois faire la débrouille avec celui que le sort t'as accordé :gift_heart: !`
        + ` Cependant, les petits lutins du Père Noël seront dispo pour te donner des idées si jamais tu en as besoin sur le canal #secret-santa-${session.year} !`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Voici maintenant les quelques informations que j'ai réussi à glaner sur <@${secretSantaVictim.id}> !`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Voici un indice de ce qu'iel aimerait recevoir : \n*${secretSantaVictim.wouldLikeToReceive}* \n(c'est juste une indication, libre à toi de choisir`
        + ` tout autre chose) ...`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Iel porte ses vêtements en taille *${secretSantaVictim.clothesSize}* et chausse du *${secretSantaVictim.shoesSize}* :socks: !`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Et enfin, quand même, voici son adresse postale complète :mailbox_with_no_mail: :`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `*${secretSantaVictim.postalAddress}*`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `J'ai hâte de voir ce que le Père Noël de la péda va t'apporter :heart_decoration: ! Toi aussi ?`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: `Si jamais tu as des soucis technique hésite pas à contacter le petit lutin du père noel <@${process.env.REFERENT}>`,
    }),
    Blocks.Section({
      type: 'mrkdwn',
      text: 'Bisous :kissing_heart:',
    }),
  ];

  return (
    Message().blocks(...blocks)
  );
};
