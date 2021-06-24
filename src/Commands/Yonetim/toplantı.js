const conf = require("../../configs/config.json");
const ayar = require("../../configs/settings.json")
const emoji = require("../../configs/emoji.json")

module.exports = {
    conf: {
      aliases: ["toplantı"],
      name: "toplantı",
      help: "toplantı "
    },
  
    run: async (client, message, args, embed) => {
        if(![conf.UstStaff].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(emoji.CarpiID)
        //return message.lineReply(embed.setDescription(`Bu komutu kullanmak için \`${message.guild.roles.cache.find(x => x.id === conf.UstStaff).name}\` yetkisine sahip olman lazım`))
    
let x = args[0];
if(!x) return message.lineReply(embed.setDescription(`Bir işlem belirtiniz. \`${conf.prefix}toplantı katıldı-ver / katıldı-al / unmuteall / muteall\` `)).catch(e => { })

if(x === "katıldıal"){
    let membr = message.guild.members.cache.filter(member => member.roles.cache.has(conf.Toplantı.Katıldı)  && !member.user.bot);
    membr.array().forEach((member, index) => {
      setTimeout(() => {
        member.roles.remove(conf.Toplantı.Katıldı).catch();
      }, index * 1250)
    });
    return message.lineReplyNoMention(embed.setDescription(`
    Rol Alınmaya Başlandı.
    Katıldı Rolü *Alınacak* Yetkili Sayısı: \`${membr.size}\``)) 
}

if(x === "rol-dağıt"){
    let katıldı = message.member.voice.channel.members.filter(member => !member.roles.cache.has(conf.Toplantı.Katıldı) && !member.user.bot)
    katıldı.array().forEach((member, index) => {
        setTimeout(async() => {
            member.roles.add(conf.Toplantı.Katıldı)
        }, index * 750)
    })
    
    return message.lineReplyNoMention(embed.setDescription(`
    Rol Dağıtılmaya Başlandı.
    Katıldı Rolü *Verilecek* Yetkili Sayısı: \`${katıldı.size}\``))
}

if(x === "unmuteall"){
  let channel = message.member.voice.channel.id
  if(!channel) return message.lineReply(`Bir ses kanalında değilsin.`)
  if(!message.guild.channels.cache.get(channel).members.array().filter(x => x.id !== message.member.id).size <= 0) return message.lineReply(`Ses Kanalında Sadece Sen Varsın nabi10amkqwe?`)
  let channelMembers = message.guild.channels.cache.get(channel).members.array().filter(x => x.id !== message.member.id);
  channelMembers.forEach((x, i) => {
    setTimeout(async () => {
      x.voice.setMute(false)
    }, i*200)
  })
  await message.lineReplyNoMention(embed.setDescription(`**${message.guild.channels.cache.get(channel).name}** Adlı kanaldaki \`${channelMembers.length}\` adet üyenin susturulması kaldırıldı!`))
}

if(x === "muteall"){
  let channel = message.member.voice.channel.id

  if(!channel) return message.lineReply(`Bir ses kanalında değilsin.`)
  if(!message.guild.channels.cache.get(channel).members.array().filter(x => x.id !== message.member.id).size <= 0) return message.lineReply(`Ses Kanalında Sadece Sen Varsın nabi10amkqwe?`)

  let channelMembers = message.guild.channels.cache.get(channel).members.array().filter(x => x.id !== message.member.id);

  channelMembers.forEach((x, i) => {
    setTimeout(async () => {
      x.voice.setMute(true)
    }, i*200)
  })

  await message.lineReplyNoMention(embed.setDescription(`**${message.guild.channels.cache.get(channel).name}** Adlı kanaldaki \`${channelMembers.length}\` adet üye susturuldu!`))
}

}}