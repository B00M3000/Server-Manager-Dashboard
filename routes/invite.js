const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  const guildID = req.query.guild_id
  var inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&redirect_uri=${process.env.URL}/invite/callback&response_type=code&scope=bot%20applications.commands`
  if(guildID) inviteLink += `&guild_id=${guildID}`
  res.redirect(inviteLink)
})

router.get('/callback', (req, res) => {
  const guildID = req.query.guild_id
  if(!guildID) res.redirect('/dashboard')
  res.redirect(`/dashboard/${guildID}`)
})

module.exports = router