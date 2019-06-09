const Discord = require('discord.js')
const client = new Discord.Client()
let prefix = "*"
 
client.login('NTg2OTYzMTAxNjQ4MTU4NzMz.XPvqGA.fgl4oCA8KpqQ_r7pO643nrkpuR8')
 
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
})
/*Kick*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
    }
})
 
/*Ban*/
client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member, {days: 7})
       message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
    }
})
client.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    //unmute
    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }
 
    //unwarn
    if (args[0].toLowerCase() === prefix + "unwarn") {
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
        if(member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne pas unwarn ce membre.")
        if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
        warns[member.id].shift()
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
    }
})
client.on('ready', function () {
    console.log('Bot en ligne')
    client.user.setActivity('BambouVX#4543', {type: "PLAYING"})
})
client.on('message', function (message) {
    if (message.content === "chien") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586970106446217232/chien0.jpeg')
        console.log('chien0')
    }
})

client.on('message', function (message) {
    if (message.content === "chien1") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586970468733681725/chien1.jpeg')
        console.log('chien1')
    }
})
client.on('message', function (message) {
    if (message.content === "licorne") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586971606497099787/licorne1.jpeg')
        console.log('licorne')
    }
})
client.on('message', function (message) {
    if (message.content === "licorne1") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586972097184530434/licorne0.jpeg')
        console.log('licorne1')
    }
})
client.on('message', function (message) {
    if (message.content === "caca") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586973001753296896/caca.jpeg')
        console.log('caca')
    }
})
client.on('message', function (message) {
    if (message.content === "invite") {
        message.channel.sendMessage('https://discordapp.com/api/oauth2/authorize?client_id=586963101648158733&permissions=8&scope=bot')
        console.log('invite')
    }
})
client.on('message', function (message) {
    if (message.content === "caca licorne") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586980349645553801/caca_licorne.jpeg')
        console.log('caca licorne')
    }
})
client.on('message', function (message) {
    if (message.content === "sites") {
        message.channel.sendMessage('https://sites.google.com/view/bambouvx/accueil')
        console.log('sites')
    }
})
client.on('message', function (message) {
    if (message.content === "proute") {
        message.channel.sendMessage('https://cdn.discordapp.com/attachments/584490222356660224/586973001753296896/caca.jpeg')
        console.log('caca')
    }
})
