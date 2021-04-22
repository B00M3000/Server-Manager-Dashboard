const express = require('express')
var router = express.Router()

const discord_api = require('../../discord_api.js')
const { getHaveManageGuildGuilds } = require('../../utils.js')

router.get('/', (req, res) => {
  res.send({
    message: "Invalid Request"
  })
})

router.post('/create', async (req, res) => {
  const { access_token, token_type, guildID, embed } = req.body

  if(!access_token || !token_type || !guildID || !embed) return res.sendStatus(422)

  const guilds = await discord_api.get_guilds({access_token, token_type})
  const haveManageGuildGuilds = getHaveManageGuildGuilds(guilds)

  var guild = haveManageGuildGuilds.find(guild => guild.id === guildID)
  if(!guild) return res.send(401)

  console.log(JSON.stringify(embed))

  res.send(200)
})

module.exports = router