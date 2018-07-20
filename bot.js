const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
  // // If the message is "ping"
  // if (message.content === 'ping') {
  //   // Send "pong" to the same channel
  //   message.channel.send('saya pong');
  //   message.channel.send("username "+message.author.username);
  //   message.channel.send("avatar "+message.author.avatar);
  //   message.channel.send("client "+message.author.client);
  //   message.channel.send("createdAt "+message.author.createdAt);
  //   message.channel.send("createdTimestamp "+message.author.createdTimestamp);
  //   message.channel.send("email "+message.author.email);
  //   message.channel.send("id "+message.author.id);
  //   message.channel.send("verified "+message.author.verified);
  //   message.channel.send("user "+message.author.user);
  //   message.channel.send("users "+message.author.users);
  // }
  switch (message.content) {
    case "ping" :
      message.channel.send('Pong!');
      break;
    case "blah" :
      message.channel.send("username "+message.author.username);
      message.channel.send("avatar "+message.author.avatar);
      message.channel.send("client "+message.author.client);
      message.channel.send("createdAt "+message.author.createdAt);
      message.channel.send("createdTimestamp "+message.author.createdTimestamp);
      message.channel.send("email "+message.author.email);
      message.channel.send("id "+message.author.id);
      message.channel.send("verified "+message.author.verified);
      message.channel.send("user "+message.author.user);
      message.channel.send("users "+message.author.users);
      break;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
