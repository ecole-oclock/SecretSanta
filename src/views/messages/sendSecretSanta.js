import { Message, Blocks } from 'slack-block-builder';

export default ({ session, secretSantaVictim }) => {
  const blocks = [
    Blocks.Section({ text: `Bonjour à toi cher Père Noël Secret de la péda :père_noël: !` }),
    Blocks.Header({ text: `Le grand tirage au sort t'a trouvé un secret Santa !` }),
    Blocks.Section({ text: `En effet, le grand tirage au sort t'a désigné pour être le joyeux généreux Secret Santa de <@${secretSantaVictim.id}> :tada: !` }),
    Blocks.Section({
      text: `Petit rappel des règles du jeu en tant que Père Noël Secret :bonhomme_de_neige2: :`,
    }),
    Blocks.Section({
      text: `Tu te mets en quête du cadeau de <@${secretSantaVictim.id}> dans un budget maximum de ${process.env.BUDGET_MAX}€ frais de port inclus (libre à toi de dépenser plus ou moins) :cadeau:`
        + `Bien évidement, tu ne vends pas la mèche, <@${secretSantaVictim.id}> ne doit surtout pas savoir que tu es son Père Noël Secret :pas_un_mot: Tu envoies le cadeau`
        + `début décembre histoire que la poste (ou tout autre transporteur de ton choix) puisse livrer le cadeau avant Noël :colis:`,
    }),
    Blocks.Section({
      text: `Tu peux me donner en MP le numéro de suivi ainsi que le nom du transporteur, j'en informerais <@${secretSantaVictim.id}> pour qu'iel puisse suivre son colis :oreille:`,
    }),
    Blocks.Section({
      text: `Mais tu n'es pas que le Père Noël Secret de <@${secretSantaVictim.id}> ! Toi aussi tu va recevoir un joli cadeau (j'espère... je ne peux rien te promettre :sourire_narquois: )`
        + `! Donc il te faudra respecter les consignes suivantes :`,
    }),
    Blocks.Section({
      text: `:espace: NE PAS OUVRIR LE CADEAU AVANT LE 25/12 :sapin_noël: (je t'ai à l'oeil :yeux: !)`
        + `:deux: Faire une photo lors du déballage :appareil_photo_avec_flash:`
        + `:trois: Et poster la photo sur le canal <#${session.canal}> pour remercier, bien évidement, ton Père Noël Secret :câlin:`,
    }),
    Blocks.Section({
      text: `<@${secretSantaVictim.id}> ne sera ni repris.e ni échangé.e, tu dois faire la débrouille avec cellui que le sort t'as accordé :cœur_avec_ruban: !`
        + `Cependant, les petits lutins du Père Noël ${process.env.REFERENTS} seront dispo pour te donner des idées si jamais tu en as besoin !`,
    }),
    Blocks.Section({
      text: `Voici maintenant les quelques informations que j'ai réussi à glaner sur <@${secretSantaVictim.id}> !`,
    }),
    Blocks.Section({
      text: `Voici un indice de ce qu'iel aimerait recevoir : ${secretSantaVictim.wouldLikeToReceive} (c'est juste une indication, libre à toi de choisir`
        + `tout autre chose) ...`,
    }),
    Blocks.Section({
      text: `iel porte ses vêtements en taille ${secretSantaVictim.clothesSize} et chausse du ${secretSantaVictim.shoesSize} :chaussettes: !`,
    }),
    Blocks.Section({
      text: `Et enfin, quand même, voici son adresse postale complète :boîte_aux_lettres_sans_courrier: :`,
    }),
    Blocks.Section({
      text: secretSantaVictim.postalAddress,
    }),
    Blocks.Section({
      text: `J'ai hâte de voir ce que le Père Noël de la péda va t'apporter :cœur_décoratif: ! Toi aussi ?`,
    }),
    Blocks.Section({
      text: 'Bisous :envoie_un_bisou:',
    }),
  ];

  return (
    Message({ channel }).blocks(...blocks)
  );
};
