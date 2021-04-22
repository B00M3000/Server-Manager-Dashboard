const express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send({
    message: "Invalid Request"
  })
})

router.get('/:id', (req, res) => {
  res.send({
    message: "This section of the api is still in development",
    request: {
      id: req.params.id
    }
  })
})

module.exports = router