import { Message, Blocks, Elements } from 'slack-block-builder';
import dayjs from 'src/utils/dayjs';

export default ({ channel, session }) => (
  Message({ channel }).blocks(
    Blocks.Header({ text: `Ho Ho Ho :santa::skin-tone-2:` }),
    Blocks.Section({ text: `:bell: Il y a des enfants sages <!here> ?` }),
    Blocks.Section({ text: `Vous savez pas quoi ? Dans *${
      dayjs()
        .date(23)
        .month(11)
        .hour(0)
        .minute(0)
        .second(0)
        .diff(dayjs(), 'day')
    } jours* c'est Noël ! :christmas_tree:  Si si !\n`
    + `Et chez nous quand on approche de Noël il se passe quoi ? Et bah on se fait des *cadeaux* ! :gift:\n`
    + `Pantoufles, Pull moche de noel, jeux de société et autre goodies de Noël n'ont qu'à bien se tenir car il est temps de s'inscrire ! ( Ouaa ça rime ! :star-struck:  )`,
    }),
    Blocks.Section({ text: `Le secret santa, c'est quoi ça ? Secret Santa, ou Noël canadien au Québec`
    + ` et dans les pays francophones, est une tradition de Noël, surtout dans les pays anglo-saxons,`
    + ` lors de laquelle les membres d'un groupe ou d'une communauté s'offrent au hasard des cadeaux.`
    + ` Le tirage au sort est anonyme.`,
    }),
    Blocks.Section({ text: `Si toi aussi t'as envie de faire un *cadeau* sans te ruiner et d'en avoir un en retour,`
    + ` il te suffit de cliquer sur le bouton ci-dessous, de remplir le formulaire et je reviendrais vers toi un`
    + ` peu plus tard pour te dire qui est ~ta victime~ celui ou celle qui recevra ton *merveilleux* cadeau :gift:  !`,
    }),
    Blocks.Header({
      text: `Attention ! Tu n'as que jusqu'à ${dayjs(session.mixDate).format('LLLL')} dernier délai pour t'inscrire !`,
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
      text: `Une fois que tu te seras inscrit et que tu auras remplis le formulaire je vais te faire entrer dans le canal #secret-santa-${session.year} pour te tenir informé de la suite, *je s'occupe de tout tu s'occupe de rien !*`,
    }),
    Blocks.Section({ text: `Allez ! À bientôt :wave: :sled: ` }),
    Blocks.Image({ imageUrl: 'https://media.giphy.com/media/3lsNKXm6IUS3K/giphy.gif', altText: 'Santa is comming !' }),
  )
);
