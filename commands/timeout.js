const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //Check if the user has the correct role
  let saulrole = message.guild.roles.find(role => role.name === "Saul Only");
  if(!message.member.roles.has(saulrole)){
    message.channel.send("You can't do that.")
    return;
  }


}

module.exports.help = {
  name: "timeout"
}
