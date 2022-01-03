function getUserDetails(message, user) {
  //get enforcer roles
  let enforcerRole = message.guild.roles.cache.find(
    (role) => role.name === "Enforcer"
  );
  let corruptRole = message.guild.roles.cache.find(
    (role) => role.name === "Corrupt Enforcer"
  );
  //sets user details
  var userObj = {
    channel: user.voice.channel,
    enforcerRole: user.roles.cache.has(enforcerRole.id),
    corruptRole: user.roles.cache.has(corruptRole.id),
  };

  return userObj;
}

module.exports = { getUserDetails };
