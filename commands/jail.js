const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  //get role ids and checks if typer has roles
  let enforcerRole = message.guild.roles.cache.find(
    (role) => role.name === "Enforcer"
  );
  let corruptRole = message.guild.roles.cache.find(
    (role) => role.name === "Corrupt Enforcer"
  );
  let hasEnforcerRole = message.member.roles.cache.has(enforcerRole.id);
  let hasCorruptRole = message.member.roles.cache.has(corruptRole.id);

  //finds target user and if they are corrupt
  let targetUser = message.guild.member(message.mentions.users.first());
  let corruptTargetRole = targetUser.roles.cache.find(
    (role) => role.name === "Corrupt Enforcer"
  );

  //checks if target user is corrupt
  if (corruptTargetRole == corruptRole.id) {
    return message.channel.send("No");
  }

  //checks if user is an enforcer
  if (!hasEnforcerRole && !hasCorruptRole) {
    return message.channel.send("You are not an Enforcer");
  }

  //checks if target is in voice channel
  if (!targetUser.voice.channel) {
    return message.channel.send("Convict does not exist or escaped");
  }

  //gets channels and timers
  const afkChan = message.guild.afkChannel;
  let ogChan = targetUser.voice.channel;
  var timer;

  startJail();

  //puts user in afk, starts the repeater to put users in afk, and setstimer to stop the repeater
  function startJail() {
    targetUser.voice.setChannel(afkChan);
    message.channel.send("Go to jail you criminal fiend");
    jail();
    setTimeout(stopJail, 24 * 1000);
  }

  //starts repeater to put user in afk if they are not in afk channel
  function jail() {
    timer = setInterval(function () {
      if (targetUser.voice.channel != afkChan) {
        targetUser.voice.setChannel(afkChan);
        if (!targetUser.voice.channel) {
          message.channel.send("The Criminal is on the run");
        } else {
          message.channel.send("Get back to jail you SCUM of the Earth");
        }
      }
    }, 2 * 1000);
  }

  //stops the repeater and moves user back to their original channel
  function stopJail() {
    clearInterval(timer);
    targetUser.voice.setChannel(ogChan);
    if (!targetUser.voice.channel) {
      message.channel.send("The dirty outlaw has escaped");
    } else {
      message.channel.send(
        "Your time has been served. You are free, but you better behave yourself"
      );
    }
  }
};

module.exports.help = {
  name: "jail",
};
