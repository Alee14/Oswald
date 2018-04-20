module.exports.run = async (client, message) => {
    message.reply('**PONG!** :ping_pong: ' + Math.round(client.ping) + ' ms');
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'ping',
  description: 'Displays the ping of the bot.',
  usage: 'ping',
  category: '- General Commands',
};
