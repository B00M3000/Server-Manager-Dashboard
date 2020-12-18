const express = require('express')
const fetch = require('node-fetch');
const FormData = require('form-data');
const axios = require("axios")

const User = require('../schemas/User.js')

const utils = require('../utils.js')
const discord_api = require('../discord_api.js')

var router = express.Router()

router.get('/', async (req, res) => {
  const { access_token, token_type } = req.cookies
  if(!access_token || !token_type) return res.redirect('/login')

  const userGuilds = await discord_api.get_guilds({token_type, access_token})
  const botGuilds = await discord_api.get_bot_guilds()
  const haveManageGuildGuilds = utils.getHaveManageGuildGuilds(userGuilds)

  for(guild of haveManageGuildGuilds){
    if(botGuilds.find(g => g.id === guild.id)) guild.hasBot = true
    else guild.hasBot = false
  }

  res.render('dashboard_menu', { 
    guilds: haveManageGuildGuilds,
    URI: utils.URLtoURI(process.env.URL),
    CLIENT_ID: process.env.CLIENT_ID,
    subtitle: 'Dashboard Menu'
  })
})

router.get('/:id', async (req, res) => {
  const { access_token, token_type } = req.cookies
  if(!access_token || !token_type) return res.redirect('/login')

  const guildID = req.params.id.id.id

  const userGuilds = await discord_api.get_guilds({token_type, access_token})

  var guild = userGuilds.find(guild => guild.id === guildID)
  if(!guild) return res.sendStatus(404)//res.redirect('/dashboard')

  res.render('server_dashboard', {
    guild,
    subtitle: guild.name
  })
})

module.exports = router