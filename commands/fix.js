const Discord = require("discord.js");
const path = require("path");

module.exports.run = async (bot, message, args) => {
  let corruptRole = message.guild.roles.cache.find(
    (role) => role.name === "Corrupt Enforcer"
  );
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
  if (!hasCorruptRole) {
    return message.channel.send("You are not an Enforcer");
  }

  //finds if the target voice channel exist
  let targetChan = message.guild.channels.cache.find(
    (channel) => channel.name === "Reeducation Site"
  );
  if (!targetChan) {
    return message.channel.send(
      "Reeducation Site voice channel does not exist"
    );
  }

  //makes target user and bot join a channel and play audio. Then disconnects and returns users.
  let ogChan = targetUser.voice.channel;
  targetUser.voice.setChannel(targetChan);
  const connection = await targetChan.join();

  setTimeout(play, 1 * 1000);
  setTimeout(chanDisconnect, 6.5 * 1000);
  return;

  function play() {
    const dispatcher = connection.play(
      path.join(__dirname, "..", "audio", "joker.mp3")
    );
  }
  function chanDisconnect() {
    targetChan.leave();
    if (!targetUser.voice.channel) {
      message.channel.send("The voice of will was too powerful");
    } else {
      targetUser.voice.setChannel(ogChan);
    }
  }
};

module.exports.help = {
  name: "fix",
};
