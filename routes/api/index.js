const express = require('express')
var router = express.Router()

const users = require('./users.js')
const embeds = require('./embeds.js')

router.use('/users', users)
router.use('/embeds', embeds)

router.get('/', (req, res) => {
  res.send({
    message: "Invalid Request"
  })
})

module.exports = router