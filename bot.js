const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const moment = require('moment');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
  var command = message.content.split(" ");
  let [cmd, coinname] = command;
  switch (cmd.toLowerCase()) {
    case "!ping" :
      message.channel.send('Pong!');
      break;
    case "!help" :
      message.delete()
      message.channel.send({
      embed: {
          color: 16750848,
          title: 'Please wait ...'
        }
      }).then((message) => {
          request('https://api.coinmarketcap.com/v1/global/', function (err, response, body) {
            if (err) {
              message.channel.sendMessage('```Error! ' + err + '```')
              return false
            }

            const data = JSON.parse(body)
            const embed = new Discord.RichEmbed()
              .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
              .setTitle('Market Capitalization Stats')
              .setDescription('[More info here](https://coinmarketcap.com/)')
              .setThumbnail('https://s2.coinmarketcap.com/static/cloud/img/CoinMarketCap.png')
              .addField('Total Market Cap (in USD)', '$' + data.total_market_cap_usd)
              .addField('Last 24 hour (in USD)', '$' + data.total_24h_volume_usd)
              .addField('Total Bitcoin percentage', data.bitcoin_percentage_of_market_cap + '%')
            message.edit({embed})
          })
      })
      break;
    case "!status" :
      const embed = new Discord.RichEmbed()
        .setColor('#ffc107') // Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        // .setAuthor('Dividend.Cash Airdrop')
        .setTitle('Dividend.Cash Airdrop')
        .setURL('https://dividend.cash/')
        .setThumbnail('https://dividend.cash/theme/image/logo.png')
        .addField('Total server', client.guilds.size, true)
        .addField('Total users', client.guilds.reduce((mem, g) => mem += g.memberCount, 0), true)
        .addField('Version:', 12, true)
        .addField('Discord.js version:', '11.2.1', true)
        .addField('Uptime:', (Math.round(client.uptime / (1000 * 60 * 60))) + ' hour(s), ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minute(s), and ' + (Math.round(client.uptime / 1000) % 60) + ' second(s)', true)
        .setTimestamp()
      message.channel.send({embed});
      break;
    case "!setaddress" :
      // message.channel.send('saya pong');
      // message.channel.send("username "+message.author.username);
      // message.channel.send("avatar "+message.author.avatar);
      // message.channel.send("createdAt "+message.author.createdAt);
      // message.channel.send("createdTimestamp "+message.author.createdTimestamp);
      // message.channel.send("id "+message.author.id);
      if (message.author.createdTimestamp <= "1518329862025") { //1530403200000 July 2017
        const embed = new Discord.RichEmbed()
          .setColor('#ffc107')
          .setTitle('Dividend.Cash Airdrop')
          .setURL('https://dividend.cash/')
          .setThumbnail('https://dividend.cash/theme/image/logo.png')
          .addField('Url Request', "https://dividend.cash/?get"+message.author.username+message.author.id)
          .addField('Uptime:', (Math.round(client.uptime / (1000 * 60 * 60))) + ' hour(s), ' + (Math.round(client.uptime / (1000 * 60)) % 60) + ' minute(s), and ' + (Math.round(client.uptime / 1000) % 60) + ' second(s)', true)
          .setTimestamp()
        message.channel.send({embed});
      }else{
        const embed = new Discord.RichEmbed()
          .setColor('#ffc107')
          .setTitle('Dividend.Cash Airdrop')
          .setURL('https://dividend.cash/')
          .setThumbnail('https://dividend.cash/theme/image/logo.png')
          .addField('Status', "REJECTED : You are not eligible to join this airdrop")
          .addField('Message', "Your discord account must be registered before July 1 2018")
          // .addField('Thank you', moment(message.author.createdTimestamp).format('LLLL'))
          .setTimestamp()
        message.channel.send({embed});
      }
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
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);//where BOT_TOKEN is the token of our bot
