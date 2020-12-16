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

  res.render('dashboard_menu', { 
    guilds: haveManageGuildGuilds,
    URI: utils.URLtoURI(process.env.URL),
    CLIENT_ID: process.env.CLIENT_ID
  })
})

router.get('/:id', async (req, res) => {
  const access_token = req.cookies['access_token']
  if(!access_token) return res.redirect('/login')

  const guildID = req.params.id

  const user = await User.findOne({ access_token })
  if(!user) return res.redirect('/login')

  var guild = user.guilds.find(guild => guild.id === guildID)
  if(!guild) return res.redirect('/dashboard')

  res.render('server_dashboard', {
    guild
  })
})

module.exports = router