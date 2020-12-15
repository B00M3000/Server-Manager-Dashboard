const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  discordID: {
    type: String,
    required: true,
    unique: true
  },
  discordTag: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  guilds: {
    type: Array,
    required: true
  },
  access_token: {
    type: String,
    required: true,
    unique: true
  }
})

module.exports = mongoose.model('Users', UserSchema)