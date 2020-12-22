const express = require('express')
var router = express.Router()

const { getHaveManageGuildGuilds, CheckCredentials} = require('../utils.js')
const discord_api = require('../discord_api.js')

router.use(CheckCredentials)

router.get('/', async (req, res) => {
  const { access_token, token_type } = req

  const userGuilds = await discord_api.get_guilds({token_type, access_token})
  const botGuilds = await discord_api.get_bot_guilds()
  const haveManageGuildGuilds = getHaveManageGuildGuilds(userGuilds)

  for(guild of haveManageGuildGuilds){
    if(botGuilds.find(g => g.id === guild.id)) guild.hasBot = true
    else guild.hasBot = false
  }
  res.render('dashboard_menu', { 
    guilds: haveManageGuildGuilds,
    subtitle: 'Dashboard Menu'
  })
})

router.get('/:id', async (req, res) => {
  const { access_token, token_type } = req.cookies

  const guildID = req.params.id

  const userGuilds = await discord_api.get_guilds({token_type, access_token})

  var guild = userGuilds.find(guild => guild.id === guildID)
  if(!guild) return res.redirect('/dashboard')

  res.render('server_dashboard', {
    guild,
    subtitle: guild.name
  })
})

module.exports = router