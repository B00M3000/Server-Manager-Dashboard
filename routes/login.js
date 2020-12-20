const express = require('express')
var router = express.Router()

const { get_tokens, get_guilds, get_user } = require('../discord_api.js')

router.get('/', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.URL}/login/callback&response_type=code&scope=identify%20guilds&prompt=none`)
})

router.get('/callback', async (req, res) => {
  const code = req.query.code

  const data = await get_tokens(code)

  res.cookie('access_token', data.access_token, {maxAge: data.expires_in * 1000})
  res.cookie('token_type', data.token_type, {maxAge: data.expires_in * 1000})

  res.redirect(`/dashboard`)
})

module.exports = router