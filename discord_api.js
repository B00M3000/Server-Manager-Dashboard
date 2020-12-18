const fetch = require('node-fetch');
const FormData = require('form-data');

module.exports = {
  get_tokens: async (code) => {
    const data = new FormData()
    data.append('client_id', process.env.CLIENT_ID)
    data.append('client_secret', process.env.CLIENT_SECRET)
    data.append('grant_type', 'authorization_code')
    data.append('redirect_uri', process.env.URL + '/login/callback')
    data.append('scope', 'identify')
    data.append('scope', 'guilds')
    data.append('code', code)

    const response = await fetch('https://discordapp.com/api/oauth2/token', {
      method: 'POST',
      body: data
    })
    return response.json()
  },
  get_user: async (data) => {
    const response = await fetch('https://discordapp.com/api/users/@me', {
      headers:{
        authorization: `${data.token_type} ${data.access_token}`
      }
    })
    return response.json()
  },
  get_guilds: async (data) => {
    const response = await fetch('https://discordapp.com/api/users/@me/guilds', {
      headers:{
        authorization: `${data.token_type} ${data.access_token}`
      }
    })
    return response.json()
  },
  get_bot_guilds: async () =>  {
    const response = await fetch('http://discord.com/api/v6/users/@me/guilds', {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`
      }
    })
    return response.json()
  }
}

