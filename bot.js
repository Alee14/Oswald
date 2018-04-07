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
const client = new Discord.Client();
const config = require('./config.json');

var prefix = "oswald:";
var version = "1.0.0";

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

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

	 if (command === 'help'){
		 var embed = new Discord.RichEmbed()
            .setTitle(`Commands for Oswald ` + version + `.`)
            .setDescription('Every command you put in this bot must start with `'+ prefix + '`')
	        .addField('Fun Stuff:', 'attack\nask\nship',true)
            .addField('Link:', 'git',true)
            .addField('Owner Only:', 'say\neval',true)
            .addField('Monitor:', 'ping\nuptime',true)
            .addField('Etc:', 'avatarurl', true)
			.setFooter("Oswald "+ version +" Copyright 2018. Created by Alee14", "https://cdn.discordapp.com/avatars/282547024547545109/6c147a444ae328c38145ef1f74169e38.png?size=2048")
			.setColor("#7af442")
			message.channel.sendEmbed(embed);

    }
    
    if(command === 'avatarurl'){
        message.reply(message.author.avatarURL);
    }

    if(command === 'git'){
        message.channel.send ("Here's the github repo: https://github.com/Alee14/Oswald/");
    } 

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

    if(command === 'attack'){
      //This command was ported from AstralMod
        if (command.indexOf("@everyone") == -1) {
           if (command.indexOf("@here") == -1) {
                message.channel.send("<@" + message.author.id + "> :right_facing_fist: " + args);
            } else {
            message.reply("Nice try, but I ain't going to interrupt everyone who is online at this time. Kinda nice to not be bothered.");
          }
             } else {
                message.reply("Nice try, but I ain't going to interrupt everyone. Kinda nice to not be bothered.");
              }
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
      if(message.author.id !== config.ownerID) return;
      message.channel.sendMessage(args.join(" "));
      message.delete();

    }
  if(command === 'eval'){
  if(message.author.id !== config.ownerID) return;
  const argseval = message.content.split(" ").slice(1);
		try {
			var code = argseval.join(" ");
			var evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
			message.delete();

			message.channel.send({
				embed: {
					color: 3191350,
					author: {
						name: "Eval is working!",
						icon_url: message.author.displayAvatarURL
					},
					fields: [{
							name: '**:inbox_tray: Input**',
							value: `\`\`\`js\n${code}\n\`\`\``
						},
						{
							name: '**:outbox_tray: Output**',
							value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
						}
					],
				}
			})
		} catch (err) {
			message.delete();

			message.channel.send({
				embed: {
					color: 3191350,
					author: {
						name: "Error",
						icon_url: message.author.displayAvatarURL
					},
					fields: [{
							name: '**Please check your code.**',
							value: `\`\`\`xl\n${clean(err)}\n\`\`\``
						},
						{
							name: '**Output**',
							value: `\`\`\`js\n${clean(evaled)}\n\`\`\``
						}
					],
				}
			})
		}
     }
    if(command === 'ship'){
      message.channel.send(":ship: "+ message.author.username + " x " + message.guild.members.random().displayName);
    }


 });

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

 process.on('unhandledRejection', function(err, p) {
   console.log("[ERROR | UNCAUGHT PROMISE] " + err.stack);
});

 client.login (config.token).catch(function() {
       console.log("[ERROR] Login failed. Please contact Alee14#9928 or email him at alee14498@gmail.com.");
});