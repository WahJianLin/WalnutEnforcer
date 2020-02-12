const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //Check if the user has the correct role
  if(!message.author.hasRole("Saul Only")){
    message.channel.send("You do can't do that.")
    return;
  }
}

module.exports.help = {
  name: "timeout"
}
