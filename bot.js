/****************************************
 * 
 *   Oswald: A bot made from discord.js and crafted for Mr.Blue's Fanbase and based of AleeBot 1.0.9
 *   Copyright (C) 2018 Alee14
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * *************************************/
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const config = require('./config.json');

var prefix = "oswald:";
var version = "1.0.0";

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
  if (err) console.error(err);
  console.log(`[!] Attempting to load a total of ${files.length} commands into the memory.`);
  files.forEach(file => {
    try {
      const command = require(`./commands/${file}`);
      console.log(`[!] Attempting to load the command "${command.help.name}".`);
      client.commands.set(command.help.name, command);
      command.conf.aliases.forEach(alias => {
        client.aliases.set(alias, command.help.name);
        console.log(`[!] Attempting to load "${alias}" as an alias for "${command.help.name}"`);
      });
    }
    catch (err) {
      console.log('[X] An error has occured trying to load a command. Here is the error.');
      console.log(err.stack);
    }
  });
  console.log('[>] Command Loading complete!');
  console.log('\n');
});

client.on('ready', () => {
       console.log("[SUCCESS] Oswald is now ready! Running version "+ version +"!");
       client.user.setStatus('online')
   });

client.on("guildCreate", guild => {

  // This event triggers when the bot joins a guild.

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

});



client.on("guildDelete", guild => {

  // this event triggers when the bot is removed from a guild.

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);


});


client.on("message", function(message){
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }

  if (cmd) {
    if (cmd.conf.guildOnly == true) {
      if (!message.channel.guild) {
        return message.channel.createMessage('This command can only be ran in a guild.');
      }
    }
    try {
      cmd.run(client, message, args);
    }
    catch (e) {
      console.error(e);
    }
  }
/*

    if(command === 'ping'){
        message.reply("**PONG!** :ping_pong: " + Math.round(client.ping) + " ms");
    }


    if(command === 'uptime'){
      //This command was ported from AstralMod
      var timeString; // What we'll eventually put into the message

      var uptime = parseInt(client.uptime); // Get uptime in ms

      uptime = Math.floor(uptime / 1000); // Convert from ms to s

      var uptimeMinutes = Math.floor(uptime / 60); // Get the uptime in minutes

      var minutes = uptime % 60;

      var hours = 0;

      while (uptimeMinutes >= 60) {

      hours++;

      uptimeMinutes = uptimeMinutes - 60;

     }



    if (uptimeMinutes < 10) {

        timeString = hours + ":0" + uptimeMinutes // We need to add an additional 0 to the minutes

    } else {

        timeString = hours + ":" + uptimeMinutes // We don't need to add an extra 0.

    }

    message.reply(":clock1: Oswald has been up for " + timeString + " hours.");

commandProcessed = true;
    }

      if(command === 'ask'){
        var abaskanswer = [
          "Yes.",
          "Nope. Just kidding :P",
          "Definitely!",
          "No.",
          "Yep. Just kidding :P",
          "I doubt it.",
          "Maybe?",
          "I don't know?",
          "Hmm let me think :thinking:"
        ];
        if (args[1]) {
           message.channel.sendMessage(abaskanswer[Math.floor(Math.random() * abaskanswer.length)]);
        } else {
          message.channel.sendMessage("Sorry, I don't know what your saying.")
        }

      }
// Owner is only allow to do this
    if(command === 'say'){
      if(message.author.id !== config.ownerID) return message.reply('You need Mr. Blue for this.');
      message.channel.sendMessage(args.join(" "));
      message.delete();

    }
    if(command === 'ship'){
      message.channel.send(":ship: "+ message.author.username + " x " + message.guild.members.random().displayName);
    }

    if(command === 'ban'){
        const mreason = args.join(" ").slice(22);
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.reply("It looks like that you don't have the permissions to ban people.")
        if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Uhh... I don\'t have permission to ban members.');
        const member = message.mentions.members.first();
        if (!member) return message.reply("Uhh... Please mention a member first.");
        member.ban(`Banned by ${message.author.tag} Reason: ` + mreason);
        message.reply(`**${member.user.tag}** has been banned for the reason: \n\`\`\`${mreason}.\`\`\`\n`);
    }

    if(command === 'kick'){
      const mreason = args.join(" ").slice(22);
      if (!message.member.permissions.has('KICK_MEMBERS')) return message.reply("It looks like that you don't have the permissions to ban people.");
      if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Uhh... I don\'t have permission to kick members.');
      const member = message.mentions.members.first();
      if (!member) return message.reply("Uhh... Please mention a member first.");
      member.kick(`Kicked by: ${message.author.tag} Reason: ` + mreason);
      message.reply(`**${member.user.tag}** has been kicked for the reason: \n\`\`\`${mreason}.\`\`\`\n`);
    }

*/
 });

 process.on('unhandledRejection', function(err, p) {
   console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

 client.login (config.token).catch(function() {
       console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});