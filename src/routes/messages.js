export default (app) => {
// Listens to incoming messages that contain "hello"
  app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`Hey there <@${message.user}>!`);
  });// Listens to incoming messages that contain "hello"
  return app;
};
