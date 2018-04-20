module.exports.run = async (client, message) => {
    message.channel.send ("Here's the github repo: https://github.com/Alee14/Oswald/");
};

exports.conf = {
  aliases: [],
  guildOnly: false,
};
exports.help = {
  name: 'git',
  description: 'Shows the repo of Oswald.',
  usage: 'git',
  category: '- General Commands',
};