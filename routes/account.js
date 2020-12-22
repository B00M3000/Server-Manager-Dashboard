const express = require('express')
var router = express.Router()

const { CheckCredentials } = require('../utils.js')
const discord_api = require('../discord_api.js')

router.use(CheckCredentials)

router.get('/', async (req, res) => {
  const { access_token, token_type } = req

  
  
  res.render('account_dashboard', { 
    guilds: haveManageGuildGuilds,
    subtitle: 'Account'
  })
})

module.exports = router