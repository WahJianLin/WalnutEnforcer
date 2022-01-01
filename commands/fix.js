const path = require("path");
const userDetailUtil = require("../util/userDetailUtil");
const audioUtil = require("../util/audioUtil");

module.exports.run = async (bot, message, args) => {
  const callerUserDetail = userDetailUtil.getUserDetails(
    message,
    message.member
  );

  let targetUser = message.guild.member(message.mentions.users.first());
  let targetUserDetail = userDetailUtil.getUserDetails(message, targetUser);

  //checks if target user is corrupt
  if (targetUserDetail.corruptRole == true) {
    return message.channel.send("No");
  }

  //checks if user is an enforcer
  if (!callerUserDetail.enforcerRole && !callerUserDetail.corruptRole) {
    return message.channel.send("You are not an Enforcer");
  }

  //finds if the target voice channel exist
  let targetChan = message.guild.channels.cache.find(
    (channel) => channel.name === "Reeducation Site"
  );
  if (!targetChan) {
    return message.channel.send(
      "Reeducation Site voice channel does not exist. Must be spelled exactly as Reeducation Site"
    );
  }

  //makes target user and bot join a channel and play audio. Then disconnects and returns users.
  let ogChan = targetUser.voice.channel;
  targetUser.voice.setChannel(targetChan);

  setTimeout(function () {
    audioUtil.playAudio(targetChan, "joker");
  }, 1.1 * 1000);
  setTimeout(returnUser, 4.5 * 1000);
  return;

  function returnUser() {
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
