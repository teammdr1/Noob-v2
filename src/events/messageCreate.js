module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message, client) {
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      message.reply('❌ Erreur pendant l’exécution de la commande.');
    }
  }
};
