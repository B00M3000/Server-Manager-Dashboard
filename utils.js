function getHaveManageGuildGuilds(userGuilds) {
  return userGuilds.filter((guild) => (guild.permissions & 0x20) === 0x20)
}

const CheckCredentials = (req, res, next) => {
  const { access_token, token_type } = req.cookies
  if(access_token && token_type) {
    req.access_token = access_token
    req.token_type = token_type
    return next()
  }
  return res.redirect('/login')
}

module.exports = { CheckCredentials, getHaveManageGuildGuilds }