const path = require("path");
const userDetailUtil = require("../util/userDetailUtil");
const audioUtil = require("../util/audioUtil");

module.exports.run = async (bot, message, args) => {
  const callerUserDetail = userDetailUtil.getUserDetails(
    message,
    message.member
  );
  //list of audio files
  let audioArr = ["random", "beast", "crazy", "dcrazy", "pikachu", "yorker"];
  //gets caller's channel and checks if user is in channel
  if (!callerUserDetail.channel) {
    return message.channel.send("User is not in a voice channel");
  }
  //checks if user has a valid audio request
  let msg = message.toString();
  msg = msg.split(" ");
  if (audioArr.indexOf(msg[1]) == -1) {
    help();
    return;
  }
  //checks if user puts in the random audio command
  else if (audioArr.indexOf(msg[1]) == 0) {
    let r = Math.floor(Math.random() * (audioArr.length - 1) + 1);
    msg[1] = audioArr[r];
  }

  //makes bot join caller's channel and play audio. Disconnects after 6.5 seconds
  message.channel.send("Playing " + msg[1]);
  audioUtil.playAudio(callerUserDetail.channel, msg[1].toLowerCase());
  return;

  //audio help function
  function help() {
    let str =
      "To play audio please type in '!audio {target clip}'\n\nTarget Clips:";
    for (let i = 0; i < audioArr.length; i++) {
      str = str + "\n    '" + audioArr[i] + "'";
    }
    message.channel.send("" + str);
  }
};

module.exports.help = {
  name: "audio",
};
