const express = require('express')
const fetch = require('node-fetch');
const FormData = require('form-data');
const axios = require("axios")

const User = require('../schemas/User.js')

var router = express.Router()

router.get('/', (req, res) => {
  res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.URL}/login/callback&response_type=code&scope=identify&prompt=none`)
})

router.get('/callback', (req, res) => {
  const code = req.query.code

  const data = new FormData()
  data.append('client_id', process.env.CLIENT_ID)
  data.append('client_secret', process.env.CLIENT_SECRET)
  data.append('grant_type', 'authorization_code')
  data.append('redirect_uri', process.env.URL + '/login/callback')
  data.append('scope', 'identify')
  data.append('code', code)

  fetch('https://discordapp.com/api/oauth2/token', {
    method: 'POST',
    body: data
  }).then(response => response.json())
    .then(async data => {
      try {
        const config = {
          headers:{
            authorization: `${data.token_type} ${data.access_token}`
          }
        }

        const userData = (await axios.get("https://discordapp.com/api/users/@me", config)).data
        const guildData = (await axios.get("https://discordapp.com/api/users/@me/guilds", config)).data

        const { id, username, discriminator, avatar } = userData
        const guilds = guildData

        const access_token = generateToken(32)

        const findUser = await User.findOneAndUpdate({discordID: id}, {
          discordID: id,
          discordTag: `${username}#${discriminator}`,
          avatar,
          guilds,
          access_token
        }, { 
          new: true, 
          upsert: true
        })

        res.cookie('access_token', access_token)

        res.redirect(`/dashboard`)
      } catch(error) {
        console.log(error)
      }
    })
})

function generateToken(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < length; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

module.exports = router