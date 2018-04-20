module.exports.run = async (client, message) => {
    message.reply(message.author.avatarURL);
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'avatarurl',
  description: 'Displays your avatar.',
  usage: 'avatarurl',
  category: '- General Commands',
};
