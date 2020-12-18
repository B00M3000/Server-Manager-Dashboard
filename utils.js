const fetch = require('node-fetch')

function getHaveManageGuildGuilds(userGuilds) {
  return userGuilds.filter((guild) => (guild.permissions & 0x20) === 0x20)
}

function URLToURI(url){
  return url.replace(':', '%3A').replace('/', '%2F')
}

module.exports = {
  getHaveManageGuildGuilds: getHaveManageGuildGuilds,
  URLtoURI: URLToURI
}