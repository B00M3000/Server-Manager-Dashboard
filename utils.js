const fetch = require('node-fetch')

function getHaveManageGuildGuilds(userGuilds) {
  return userGuilds.filter((guild) => (guild.permissions & 0x20) === 0x20)
}

async function getBotGuilds() {
  const response = await fetch('http://discord.com/api/v6/users/@me/guilds', {
    method: 'GET',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    }
  })
  return response.json()
}

function URLToURI(url){
  return url.replace(':', '%3A').replace('/', '%2F')
}

module.exports = {
  getBotGuilds: getBotGuilds,
  getHaveManageGuildGuilds: getHaveManageGuildGuilds,
  URLtoURI: URLToURI
}