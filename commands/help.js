module.exports.run = async (bot, message, args) => {
  let str =
    'Wallnut Enforcer Help:\n\t"!audio {audio clip}" plays an audio clip\n\t"!fix {target user}" moves target user to Reeducation site and plays an audio clip\n\t\"!jail {target user}\" moves target user to afk channel repeatedly for a set duration\n\t\"!yeet {target user}\" moves target user a lot\n';
  return message.channel.send(str);
};

module.exports.help = {
  name: "help",
};
