const { Client, MessageEmbed, User } = require("discord.js")

const client = new Client();

const fs = require("fs");

const config = require('./config.json')

const moment = require("moment");

const guildInvites = new Map();

const prefix = "%"

client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

client.on("ready", () => {

  console.log(`${client.user.tag} is online by vanna`)

  client.guilds.cache.forEach(guild => {

    guild.fetchInvites()

      .then(invites => guildInvites.set(guild.id, invites))

      .catch(err => console.log(err));

  });

});

client.on('message', message => {

  const args = message.content.slice(prefix.length).split(/ +/);

  let newlog = message.content.split(" ").slice(1).join(" ")

  if (message.content.startsWith(prefix + 'setinvite')) {

    var nick = JSON.parse(fs.readFileSync("server.json", "utf8"))

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Sorry, you don't have permissions to do this!You need role that have permission **Manager Channel** | **Administrator**");

    var inputmessage = message.mentions.channels.first()

    if (args[0]) {

      nick[message.guild.id] = {

        nick: inputmessage.id

      };

      fs.writeFile("server.json", JSON.stringify(nick), (err) => {

        if (err) console.log(err)

      });

      let embed = new MessageEmbed()

        .setColor("#32d732")

        .setDescription(`invite-tracker set to\n\n${inputmessage}`)

        .setTimestamp()

      message.channel.send({ embed });

    }

  } else {

    if (message.content.startsWith(prefix + 'invitation')) {

      message.guild.fetchInvites().then((invites) => {

  const inviteCounter = {}

  invites.forEach((invite => {

      const { uses, inviter } = invite

      const { username, discriminator } = inviter

      const name = `${inviter}`

      inviteCounter[name] = (inviteCounter[name] || 0) + uses

  }))

  let replyText = new MessageEmbed()

      .setTitle(`📩 Invitation Cards ${message.guild.name}`)

      .setDescription(` \n`)

      .setColor("BLUE")

  const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

  if (sortedInvites.length > 10) sortedInvites.length = 10

  else if (sortedInvites.length > 10) sortedInvites.length = sortedInvites.length

  for (const invite of sortedInvites) {

      const count = inviteCounter[invite]

      replyText.description += `\n${invite} has invited ${count} member(s).`

  }

    message.reply(replyText)

    })

    console.log(error => {

      message.channel.send('ERROR COMMAND')

    })

    } else {

      if (message.content.startsWith(prefix + 'checkinvites')) {

        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

         message.guild.fetchInvites()

        .then

        (invites =>

            {

                const userInvites = invites.array().filter(o => o.inviter.id === user.id);

                var userInviteCount = 0;

                for(var i=0; i < userInvites.length; i++)

                {

                    var invite = userInvites[i];

                    userInviteCount += invite['uses'];

                }

                     message.channel.send(

                       embed = new MessageEmbed()

                       .setColor('RANDOM')

                       .setDescription(`**${user.user.username}** has \`${userInviteCount}\` invites.`)

                     )

                     

            }

        )

      }

    }

  }

})

client.on('guildMemberAdd', async member => {

  if (!member || !member.id || !member.guild) return;

  const guild = member.guild;

  var welcome = JSON.parse(fs.readFileSync("server.json", "utf8"));

  if (!welcome) return;

  let channel = member.guild.channels.cache.get(

    `${welcome[member.guild.id].nick}`

  );

  if (!channel) return;

  const cachedInvites = guildInvites.get(member.guild.id);

  const newInvites = await member.guild.fetchInvites();

  guildInvites.set(member.guild.id, newInvites);

  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)

  let createdAt = moment(member.createdAt).format('LLLL');

  let embed = new MessageEmbed()

    // .setTitle(`Welcome to ${member.guild.name}`)

    .setColor("RANDOM")

    .setDescription(`<a:arrow:847502013532471296> 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 ${member} 𝐓𝐨 <a:Sup:846618619524939787> **${member.guild.name}** <a:Sup:846618619524939787> \n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞 𝐁𝐲: <@${usedInvite.inviter.id}>\n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞: ${usedInvite.uses} \n <a:arrow:847502013532471296> 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐂𝐫𝐞𝐚𝐭𝐞 : ${createdAt} \n 

<a:arrow:847502013532471296> 𝐓𝐨𝐭𝐚𝐥 ${member.guild.memberCount} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧 𝐒𝐞𝐫𝐯𝐞𝐫`)

    .setTimestamp()

  if (channel) {

    channel.send(embed).catch(err => console.log(err))

  }

});

  

client.login("")const { Client, MessageEmbed, User } = require("discord.js")

const client = new Client();

const fs = require("fs");
const config = require('./config.json')
const moment = require("moment");
const guildInvites = new Map();
const prefix = "R."

client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));

client.on("ready", () => {
  console.log(`${client.user.tag} is online by vanna`)

  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));


  });
});


client.on('message', message => {

  const args = message.content.slice(prefix.length).split(/ +/);

  let newlog = message.content.split(" ").slice(1).join(" ")

  if (message.content.startsWith(prefix + 'setinvite')) {
    var nick = JSON.parse(fs.readFileSync("server.json", "utf8"))
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Sorry, you don't have permissions to do this!You need role that have permission **Manager Channel** | **Administrator**");
    var inputmessage = message.mentions.channels.first()
    if (args[0]) {
      nick[message.guild.id] = {
        nick: inputmessage.id
      };
      fs.writeFile("server.json", JSON.stringify(nick), (err) => {
        if (err) console.log(err)
      });

      let embed = new MessageEmbed()
        .setColor("#32d732")
        .setDescription(`invite-tracker set to\n\n${inputmessage}`)
        .setTimestamp()
      message.channel.send({ embed });
    }
  } else {
    if (message.content.startsWith(prefix + 'invitation')) {
      message.guild.fetchInvites().then((invites) => {
  const inviteCounter = {}

  invites.forEach((invite => {
      const { uses, inviter } = invite
      const { username, discriminator } = inviter

      const name = `${inviter}`

      inviteCounter[name] = (inviteCounter[name] || 0) + uses
  }))

  let replyText = new MessageEmbed()
      .setTitle(`📩 Invitation Cards ${message.guild.name}`)
      .setDescription(` \n`)
      .setColor("BLUE")
  const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

  if (sortedInvites.length > 10) sortedInvites.length = 10
  else if (sortedInvites.length > 10) sortedInvites.length = sortedInvites.length


  for (const invite of sortedInvites) {
      const count = inviteCounter[invite]
      replyText.description += `\n${invite} has invited ${count} member(s).`
  }
    message.reply(replyText)
    })
    console.log(error => {
      message.channel.send('ERROR COMMAND')
    })
    } else {
      if (message.content.startsWith(prefix + 'checkinvites')) {
        var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(' ') || x.user.username === args[0]) || message.member;

         message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses'];
                }
                     message.channel.send(
                       embed = new MessageEmbed()
                       .setColor('RANDOM')
                       .setDescription(`**${user.user.username}** has \`${userInviteCount}\` invites.`)
                     )
                     
            }
        )
      }
    }
  }

})

client.on('guildMemberAdd', async member => {
  if (!member || !member.id || !member.guild) return;
  const guild = member.guild;

  var welcome = JSON.parse(fs.readFileSync("server.json", "utf8"));
  if (!welcome) return;
  let channel = member.guild.channels.cache.get(
    `${welcome[member.guild.id].nick}`
  );
  if (!channel) return;

  const cachedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses)

  let createdAt = moment(member.createdAt).format('LLLL');

  let embed = new MessageEmbed()
    // .setTitle(`Welcome to ${member.guild.name}`)
    .setColor("RANDOM")
    .setDescription(`<a:arrow:847502013532471296> 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 ${member} 𝐓𝐨 <a:Sup:846618619524939787> **${member.guild.name}** <a:Sup:846618619524939787> \n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞 𝐁𝐲: <@${usedInvite.inviter.id}>\n <a:arrow:847502013532471296> 𝐈𝐧𝐯𝐢𝐭𝐞: ${usedInvite.uses} \n <a:arrow:847502013532471296> 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐂𝐫𝐞𝐚𝐭𝐞 : ${createdAt} \n 
<a:arrow:847502013532471296> 𝐓𝐨𝐭𝐚𝐥 ${member.guild.memberCount} 𝐌𝐞𝐦𝐛𝐞𝐫 𝐈𝐧 𝐒𝐞𝐫𝐯𝐞𝐫`)
    .setTimestamp()

  if (channel) {
    channel.send(embed).catch(err => console.log(err))
  }
});

  
client.login("Token")
