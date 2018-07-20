const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

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
  var command = message.content.split(" ");
  switch (command[0]) {
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
    case "apa" :
      let [cmd, age, sex, location] = command;
      message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
      break;
    case "!check" :
      let [cmd, coin] = command;
      if (coin == null) {
          message.channel.send('Invalid grope command');
      }
      message.channel.send("Scanning..."+coin);
      var url = 'https://api.coinmarketcap.com/v1/ticker/'+coin;
      request.get({
          url: url,
          json: true,
          headers: {
              'User-Agent': 'request'
          }
      }, (err, res, data) => {
          if (err) {
              message.reply("?");
          } else if (res.statusCode !== 200) {
              message.reply("?");
          } else {
              message.channel.send(data[0].symbol);
              message.channel.send(data[0].name);
              message.channel.send(data[0].price_usd);
          }
      });
      break;
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
