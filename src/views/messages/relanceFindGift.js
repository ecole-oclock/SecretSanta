import { Message, Blocks } from 'slack-block-builder';
import dayjs from 'src/utils/dayjs';

export default () => (
  Message().blocks(
    Blocks.Section({ text: `Ho Ho Ho <!here> :santa::skin-tone-2:`, type: 'mrkdwn' }),
    Blocks.Header({ text: `Qui qui a oublié ou n'a pas trouvé son cadeau ?`, type: 'mrkdwn' }),
    Blocks.Section({ text: `Encore *${dayjs(`${dayjs().format('YYYY')}-12-24`, 'YYYY-MM-DD').diff(dayjs(), 'day')} jours* avant Noël ! :christmas_tree:  Si si !\n`,
    }),
    Blocks.Header({
      text: `Le Bot SecretSanta est là pour te rappeler de trouver un cadeau pour ta victime !`,
    }),
    Blocks.Section({
      text: `Le savais-tu ? Tu as la possibilité d'envoyer un message secret à ton père noel secret ? Il te suffit de cliquer sur mon nom et d'aller dans l'onglet Accueil.`,
    }),
    Blocks.Section({
      text: `D'ailleurs tu y retrouvera aussi ce que ta victime t'a indiqué comme information pour lui trouver son cadeau :wink:`,
    }),
    Blocks.Section({
      text: `Et puis si tu es comme moi et que t'oublie tout ... Je te le rapellerais lundi prochain ( sauf si noel est passé d'ici là ):grin:`,
    }),
    Blocks.Section({ text: `Allez ! À bientôt :wave: :sled: ` }),
    Blocks.Image({ imageUrl: 'https://media.giphy.com/media/WG87xM794U1BQz1ofe/giphy.gif', altText: 'Santa is comming !' }),
  )
);
