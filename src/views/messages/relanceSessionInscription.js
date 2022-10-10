import { Message, Blocks, Elements } from 'slack-block-builder';
import dayjs from 'src/utils/dayjs';

export default (session) => (
  Message().blocks(
    Blocks.Section({ text: `Ho Ho Ho <!here>:santa::skin-tone-2:`, type: 'mrkdwn' }),
    Blocks.Header({ text: `Qui qui a oublié de s'inscrire au secret santa ?` }),
    Blocks.Section({ text: `Encore *${
      dayjs()
        .day(23)
        .month(11)
        .hour(0)
        .minute(0)
        .second(0)
        .diff(dayjs(), 'day')
    } jours* avant Noël ! :christmas_tree:  Si si !\n`,
    }),
    Blocks.Header({
      text: `Et surtout plus que ${dayjs(session.mixDate).diff(dayjs(), 'day')} jours avant la fermeture de l'inscription au secret santa !`,
    }),
    Blocks.Section({
      text: `Sinon *tu ne pourras plus participer* ! Et comme je suis un bot, tu pourras râler tout ce que tu veux, ça ne changera rien :grin:`,
    }),
    Blocks.Actions()
      .elements(
        Elements.Button({
          text: `Participer au secret santa`,
          actionId: 'join_session',
          value: session._id.toString(),
        }).primary(true),
      ),
    Blocks.Section({
      text: `Une fois que tu te sera inscrit et que tu aura remplis le formulaire je vais te faire entrer dans le canal #secret-santa-${session.year} pour te tenir informer de la suite, *je s'occupe de tout tu s'occupe de rien !*`,
    }),
    Blocks.Section({
      text: `Je suis un bot n'oublie pas, donc moi je relance tous les lundi jusqu'à *${dayjs(session.mixDate).format('LLLL')}* ... :face_with_rolling_eyes: `,
    }),
    Blocks.Section({ text: `Allez ! À bientôt :wave: :sled: ` }),
    Blocks.Image({ imageUrl: 'https://media.giphy.com/media/JnkucpCZMvr8Y/giphy.gif', altText: 'Santa is comming !' }),
  )
);
