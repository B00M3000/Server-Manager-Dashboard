const express = require('express')
var router = express.Router()

const { CheckCredentials } = require('../utils.js')
const discord_api = require('../discord_api.js')

router.use(CheckCredentials)

router.get('/', async (req, res) => {
  const { access_token, token_type } = req

  const user = await discord_api.get_user({access_token, token_type})
  
  user.roblox = {
    id: "54645645",
    username: "Tacos",
  }
  
  res.render('account_dashboard', { 
    user,
    subtitle: 'Account'
  })
})

module.exports = router