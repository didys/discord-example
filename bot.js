const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('saya pong');
    message.reply(message.author.username);
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
