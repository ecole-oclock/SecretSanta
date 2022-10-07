import { Message, Blocks, Elements } from 'slack-block-builder';
import dayjs from 'src/utils/dayjs';

export default ({ channel, session }) => (
  Message({ channel }).blocks(
    Blocks.Section({ text: `Ho Ho Ho :santa::skin-tone-2: :bell: Il y a des enfants sages <!here> ?` }),
    Blocks.Section({ text: `Vous savez pas quoi ? On approche de Noël ! :christmas_tree:  Si si !\n`
    + `Et chez O'clock quand on approche de Noël il se passe quoi ? Et bah on se fait des cadeaux ! :gift:\n`
    + `Pantoufles, Pull moche de noel, jeux de société et autre goodies de Noël n'ont qu'à bien se tenir car il est temps de s'inscrire ! ( Ouaa ça rime ! :star-struck:  )`,
    }),
    Blocks.Section({ text: `Si toi aussi t'a envie de faire un cadeau sans te ruiner et d'en avoir un en retour,`
    + ` il te suffit de cliquer sur le bouton ci-dessous, de remplir le formulaire et je reviendrais vers toi un`
    + ` peu plus tard pour te dire qui est ~ta victime~ celui ou celle qui recevra ton *merveilleux* cadeau :gift:  !`,
    }),
    Blocks.Actions()
      .elements(
        Elements.Button({
          text: `Participer au secret santa`,
          actionId: 'join_session',
          value: session._id.toString(),
        }).primary(true),
      ),
    Blocks.Section({ text: `Allez ! À bientôt :wave: :sled: ` }),
  )
);
