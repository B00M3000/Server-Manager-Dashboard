const express = require('express')
var router = express.Router()

const { getHaveManageGuildGuilds, CheckCredentials} = require('../../utils.js')
const discord_api = require('../../discord_api.js')

router.use(CheckCredentials)

router.get('/', async (req, res) => {
  const { access_token, token_type } = req.cookies

  const guildID = req.params.id

  const userGuilds = await discord_api.get_guilds({token_type, access_token})
  const haveManageGuildGuilds = getHaveManageGuildGuilds(userGuilds)

  var guild = haveManageGuildGuilds.find(guild => guild.id === guildID)
  if(!guild) return res.redirect('/dashboard')

  res.render('server_dashboard', {
    guild,
    subtitle: guild.name
  })
})

router.get('/embeds', (req, res) => {
  res.render('embed_generator')
})

module.exports = router