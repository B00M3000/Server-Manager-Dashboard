var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const FormData = require('form-data');
const path = require('path')

const axios = require("axios")
const process = require("process")
app.use(bodyParser.text());


app.get('/', (req, res) => {
  res.sendFile(path.join( __dirname, "index.html" ));
})
app.post('/', (req, res) => {
  const data = new FormData()
  data.append('client_id', process.env.CLIENT_ID)
  data.append('client_secret', process.env.CLIENT_SECRET)
  data.append('grant_type', 'authorization_code')
  data.append('redirect_uri', "https://discord-oauth-tutorial.thomaszhou2.repl.co")
  data.append('scope', 'identify')
  data.append('code', req.body)

  fetch('https://discordapp.com/api/oauth2/token', {
    method: 'POST',
    body: data
  })
    .then(response => response.json())
    .then(async data => {
      const config = {
        headers:{
          authorization:`${data.token_type} ${data.access_token}`
        }
      }

      try {
        const userData = (await axios.get("https://discordapp.com/api/users/@me", config)).data
        const guildData = (await axios.get("https://discordapp.com/api/users/@me/guilds", config)).data
        res.send(`Your discord tag is ${userData.username}#${userData.discriminator} \nYou are in ${guildData.length} guilds!`)
      } catch(error) {
        res.send(`An error occured when trying to fetch your stats, please login again`)
      }
    })
})

app.listen(8081)
