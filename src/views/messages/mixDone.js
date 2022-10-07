import { Message, Blocks } from 'slack-block-builder';

export default () => (
  Message().blocks(
    Blocks.Section({ type: 'mrkdwn', text: `Ho Ho Ho :santa::skin-tone-2: :bell: Il y a quelqu'un <!here> ?` }),
    Blocks.Header({ type: 'mrkdwn', text: `Les inscriptions au secret santa sont terminées ! \n` }),
    Blocks.Section({ type: 'mrkdwn', text: `Ça y est, c'est fait, l'attribution des secret santa est maintenant terminée ! :tada: ` }),
    Blocks.Section({ type: 'mrkdwn', text: `Je suis déjà en train de revenir vers toi pour te dire de qui tu es le secret santa, et je vais en profiter aussi pour te dire ce que ton/ta victime aimerait :grin:` }),
    Blocks.Section({ type: 'mrkdwn', text: `Bonne chance ! Et que la magie de Noël te sois favorable :muscle: :christmas_tree: :gift: ` }),
    Blocks.Section({ type: 'mrkdwn', text: `Allez ! À bientôt :wave: :sled: ` }),
  )
);
