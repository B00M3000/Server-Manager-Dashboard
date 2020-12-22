const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser');
const http = require('http')

const mongo = require('./mongo.js')
const login = require('./routes/login.js')
const dashboard = require('./routes/dashboard')
const admin = require('./routes/admin.js')
const invite = require('./routes/invite.js')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const app = express();

const PORT = process.env.PORT || 8080

app.use(bodyParser.text());
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.redirect('/dashboard')
})

app.use('/login', login)
app.use('/dashboard', dashboard)
app.use('/admin', admin)
app.use('/invite', invite)

// Handle 404
app.use((req, res) => {
  res.status(404)
  res.render('errors/404')
})

// Handle 500
app.use((error, req, res, next) => {
  res.status(505)
  res.render('errors/500')
  console.log(error)
});

app.listen(PORT, async () => {
  console.log(`Application is online and listening to port ${PORT}`)
})

mongo().then(connection => {
  console.log('MongoDB connection established!')
})