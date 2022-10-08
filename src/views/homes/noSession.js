import { HomeTab, Blocks, Divider } from 'slack-block-builder';

export default () => HomeTab()
  .blocks(
    Blocks.Header({
      text: 'Secret Santa',
    }),
    Divider(),
    Blocks.Section({
      text: `Il n'y a pas de secret santa en cours ! C'est dommage hein ?`,
    }),
  );
