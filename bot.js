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
  let [cmd, coinname] = command;
  switch (cmd.toLowerCase()) {
    case "!ping" :
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
    case "!check" :
      if (coinname == null) {
          message.channel.send('Invalid grope command');
      }else {
        message.channel.send("Scanning..."+coinname);
        var url = 'https://api.coinmarketcap.com/v1/ticker/'+coinname;
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
      }
      break;
    default :
      var embed = new Discord.RichEmbed()
      .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      .setAuthor('CryptoBot', 'https://files.coinmarketcap.com/static/img/coins/32x32/bitcoin.png')
      .addField(':information_source: INFORMATIONS', 'Some informations about the bot')
      .addField('Add the bot to your server', 'https://cryptobot.lucasalt.fr/', true)
      .addField('Version:', 5, true)
      .addField('Discord.js version:', '11.2.1', true)
      .addField('Made by:', '<@176759285366128641>', true)
      .addField('Join me here:', 'https://discord.gg/UAtTstS', true)
      .addField('Now available on GitHub:', 'https://github.com/MrDragonXM15/CryptoBot')
      .addField(':level_slider: COMMANDS', 'All commands for the bot')
      .addField('$help', 'See all commands in DM')
      .addField('$hhelp', 'See all commands in global channel')
      .addField('$money <coin>', 'See the value of a currency in USD. \nSupport name and symbol \n__Example :__ `$money bitcoin` or `$money BTC`')
      .addField('$sats <coin>', 'See the value of a currency in sats. \nSupport name and symbol \n__Example :__ `$sats Ethereum` or `$sats ETH`')
      .addField('$marketcap', 'See all informations about the martket cap')
      .addField('$stats', 'Some stats about the bot')
      .addField(':dollar: SUPPORT ME', 'You can send me some cryptocurrencies to help me in the development of the bot')
      .addField('Dogecoin', '`DNbD8 Dnts staV JxeC 54gT wdGL LdLW XuTgX`')
      .addField('Litecoin', '`LPTu 5JMw BVAw RLni5 Jv6R 9xK9 Y9QX vXo1f`')
      .addField('Dash', '`XTxxG FTdY f2sv rAi2 Ym3S GUbG XnBL 12gor`')
      .addField('Ethereum', '`0x58 94e3 2413 34df 48f5b 1992 1444 2bfd b0bf f4b5b`');
      message.channel.send(embed);
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
