const express = require('express')
const fetch = require('node-fetch');
const FormData = require('form-data');
const axios = require("axios")

const User = require('../schemas/User.js')

const utils = require('../utils.js')

var router = express.Router()

router.get('/', async (req, res) => {
  const access_token = req.cookies['access_token']
  if(!access_token) return res.redirect('/login')

  const user = await User.findOne({ access_token })
  if(!user) return res.redirect('/login')

  const userGuilds = user.guilds
  const botGuilds = await utils.getBotGuilds()
  const haveManageGuildGuilds = utils.getHaveManageGuildGuilds(userGuilds)

  for(guild of haveManageGuildGuilds){
    if(botGuilds.find(g => g.id === guild.id)) guild.hasBot = true
    else guild.hasBot = false
  }

  // <button onclick="window.location.href='https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&redirect_uri=${utils.URLtoURI(process.env.URL)}/dashboard&response_type=code&scope=bot%20identify&guild_id=${guild.id}'" class="button invite_bot">Invite Bot</button>

  // <button onclick="window.location.href='/dashboard/${guild.id}'" class="button open_dashboard">Open Dashboard</button>

  console.log(haveManageGuildGuilds)

  res.render('dashboard_menu', { 
    guilds: haveManageGuildGuilds,
    URI: utils.URLtoURI(process.env.URL),
    CLIENT_ID: process.env.CLIENT_ID
  })
})

router.get('/:id', async (req, res) => {
  const access_token = req.cookies['access_token']
  if(!access_token) res.redirect('/login')

  const guildID = req.params.id

  const user = await User.findOne({ access_token })
  if(!user) res.redirect('/login')

  var guild = user.guilds.find(guild => guild.id === guildID)
  if(!guild) req.redirect('/dashboard')

  res.render('server_dashboard', {
    
  })
})

module.exports = router