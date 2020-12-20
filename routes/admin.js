const express = require('express')
var router = express.Router()

const { get_tokens, get_guilds, get_user } = require('../discord_api.js')

router.get('/', (req, res) => {
  res.render('admin_panel', {
      
    subtitle: 'Admin Panel'
  })
})

module.exports = router