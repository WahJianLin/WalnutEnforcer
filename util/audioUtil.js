const path = require("path");

async function playAudio(channel, audioName) {
  const connection = await channel.join();
  connection
    .play(path.join(__dirname, "..", "audio", audioName + ".mp3"))
    .on("finish", () => channel.leave());
}

module.exports = { playAudio };
