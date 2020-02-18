const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // Check if the user has the correct role
  let saulrole = message.guild.roles.find(role => role.name === "Saul");
  if(!message.member.roles.has(saulrole.id)){
    return message.channel.send("You can't do that.");
  }

  // Check if user is tagged
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.channel.send("Who you tryna jail?");

  // Jail em
  const afkChan = message.guild.afkChannel;


  function jail(){
    if(rMember.voiceChannel.id != afkChan){
      rMember.setVoiceChannel(afkChan);
      // message.channel.send('👌');
    }
  };

  function stopJail(){
    clearInterval(myTimer);
    return message.channel.send("They've done their time.");
  };

  var myTimer = setInterval(jail, 10*1000);
  setTimeout(stopJail, 1*60*1000);

  // message.channel.send(afkChan.name);
  // setTimeout(setInterval(jail(), 10*1000), 1*60*1000);

  // try{
  //   await member.setVoiceChannel(afkChan);
  //   message.react('👌');
  // }
  // catch(e){
  //   return;
  // }




}

module.exports.help = {
  name: "timeout"
}
