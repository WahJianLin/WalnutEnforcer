const path = require("path");
const userDetailUtil = require("../util/userDetailUtil");
const audioUtil = require("../util/audioUtil");

module.exports.run = async (bot, message, args) => {
  //get caller user details
  const callerUserDetail = userDetailUtil.getUserDetails(
    message,
    message.member
  );
  //list of audio files
  let audioArr = [
    "random",
    "beast",
    "crazy",
    "dcrazy",
    "pikachu",
    "roll",
    "waaa",
    "yorker",
  ];
  //gets caller user's channel and checks if user is in channel
  if (!callerUserDetail.channel) {
    return message.channel.send("User is not in a voice channel");
  }
  //checks if caller user has a valid audio request
  let msg = message.toString();
  msg = msg.split(" ");
  if (
    msg[1] == undefined ||
    msg[1] == null ||
    audioArr.indexOf(msg[1].toLowerCase()) == -1
  ) {
    help();
    return;
  }
  //checks if caller user puts in the random audio command
  else if (audioArr.indexOf(msg[1]) == 0) {
    let r = Math.floor(Math.random() * (audioArr.length - 1) + 1);
    msg[1] = audioArr[r];
  }

  //makes bot join caller user's channel and play audio. Disconnects bot when complete
  message.channel.send("Playing " + msg[1]);
  audioUtil.playAudio(callerUserDetail.channel, msg[1].toLowerCase());
  return;

  //tells caller user the correct audio files
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
