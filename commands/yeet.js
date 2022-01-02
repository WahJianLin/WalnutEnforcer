const userDetailUtil = require("../util/userDetailUtil");

module.exports.run = async (bot, message, args) => {
  const callerUserDetail = userDetailUtil.getUserDetails(
    message,
    message.member
  );

  let targetUser = message.guild.member(message.mentions.users.first());
  if (targetUser == null) {
    return message.channel.send("User does not exist");
  }
  let targetUserDetail = userDetailUtil.getUserDetails(message, targetUser);

  //checks if target user is corrupt
  if (targetUserDetail.corruptRole == true) {
    return message.channel.send("No");
  }

  //checks if user is an enforcer
  if (!callerUserDetail.enforcerRole && !callerUserDetail.corruptRole) {
    return message.channel.send("You are not an Enforcer");
  }

  //checks if target is in voice channel
  if (!targetUser.voice.channel) {
    return message.channel.send("Yeeting target does not exist or escaped");
  }

  let pos = 0;
  let chanArr = [];
  const ogChan = targetUserDetail.channel;
  var timer;
  
  chanArr[0] = message.guild.channels.cache.find(
    (channel) => channel.name === "Ping"
  );
  chanArr[1] = message.guild.channels.cache.find(
    (channel) => channel.name === "Pong"
  );

  startYeet();

  function startYeet() {
    message.channel.send("Begin the Yeeeeeeeeeeeeeeet")
    yeet();
    setTimeout(stopYeet, 10 * 1000);
  }

  //starts repeater to move user to ping pong channels
  function yeet() {
    timer = setInterval(function () {
      if(!targetUser.voice.channel){
        message.channel.send("Yeet?")
      }
      else if (pos == 0) {
        targetUser.voice.setChannel(chanArr[1]);
        pos = 1;
      } else {
        targetUser.voice.setChannel(chanArr[0]);
        pos = 0;
      }
    }, 0.5 * 1000);
  }

  //stops the repeater and moves user back to their original channel
  function stopYeet() {
    clearInterval(timer);
    message.channel.send("End the Yeeeeeeeeeeeeeeet");
    targetUser.voice.setChannel(ogChan);
  }
  return;
};

module.exports.help = {
  name: "yeet",
};
