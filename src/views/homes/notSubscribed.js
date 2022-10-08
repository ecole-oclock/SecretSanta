import { HomeTab, Blocks, Divider, Elements } from 'slack-block-builder';

export default (session) => {
  const blocks = [
    Blocks.Header({
      text: 'Ho Ho Ho :santa:',
    }),
    Divider(),
    Blocks.Section({
      text: `Tu n'es pas encore inscrit au secret santa cette année`,
    }),
  ];

  if (!session.mixDone) {
    blocks.push(
      Blocks.Section({
        text: `Cela dit, il est encore temps pour toi de s'inscrire clique sur le bouton ci dessous pour le faire !`,
      }),
      Blocks.Actions()
        .elements(
          Elements.Button({
            text: `Participer au secret santa`,
            actionId: 'join_session',
            value: session._id.toString(),
          }).primary(true),
        ),
    );
  } else {
    blocks.push(
      Blocks.Section({
        text: `Mais maintenant c'est un peu tard, les attributions de Secret Santa ont déjà été faites ... On en reparlera l'année prochaine ! :man-shrugging: `,
      }),
    );
  }

  return HomeTab().blocks(blocks);
};
