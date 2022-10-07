import { Modal, Blocks } from 'slack-block-builder';

export default (error) => (
  Modal({ title: error instanceof Error ? error.name : 'Erreur' })
    .blocks(
      Blocks.Header({ text: 'Oops ! Une erreur est survenue' }),
      Blocks.Section({ text: error instanceof Error ? error.stack : error }),
    )
);
