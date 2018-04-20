const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (client, message) => {
  const categories = [];
  const commands = Array.from(client.commands.keys());

  commands.forEach(function(x) {
    if (!categories.includes(client.commands.get(x).help.category)) {
      categories.push(client.commands.get(x).help.category);
    }
  });

  const embed = new Discord.RichEmbed()
    .setAuthor(`Oswald Help and on ${client.guilds.size} servers`, client.avatarURL)
    .setDescription('Every command you input into AleeBot is `oswald:`')
    .setColor('#1fd619')
    .setFooter('Alee14 Copyright 2018, Licensed with GPL-3.0');

  categories.forEach(function(x) {
    let cat = '';
    commands.forEach(function(command) {
      if (client.commands.get(command).help.category == x) {
        cat = cat + command + '\n';
      }
    });
    embed.addField(x, cat, true);
  });

  await message.channel.send({ embed });
};

exports.conf = {
  aliases: ['h'],
  guildOnly: false,
};
exports.help = {
  name: 'help',
  description: 'Displays all the commands or a page with information for 1 command.',
  usage: 'help (command:command-name)',
  category: '- General Commands',
};
