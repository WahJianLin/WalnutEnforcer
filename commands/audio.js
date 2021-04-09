const Discord = require("discord.js");
const path = require("path");

module.exports.run = async (bot, message, args) => {
  //list of audio files
  let audioArr = ["beast", "crazy", "depressedcrazy", "pikachu", "test"];

  //gets caller's channel and checks if user is in channel
  let callerChan = message.member.voice.channel;
  if (!callerChan) {
    return message.channel.send("User is not in a voice channel");
  }

  //checks if user hasa valid audio request
  let msg = message.toString();
  msg = msg.split(" ");
  if (audioArr.indexOf(msg[1]) == -1) {
    help();
    return;
  }

  //makes bot join caller's channel and play audio. Disconnects after 10 seconds
  message.channel.send("Playing " + msg[1]);
  const connection = await callerChan.join();
  const dispatcher = connection.play(
    path.join(__dirname, "..", "audio", msg[1].toLowerCase() + ".mp3")
  );
  setTimeout(chanDisconnect, 5 * 1000);

  return;

  function chanDisconnect() {
    callerChan.leave();
  }

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
