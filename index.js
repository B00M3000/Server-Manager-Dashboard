var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path')
var cookieParser = require('cookie-parser');

var mongo = require('./mongo.js')
var login = require('./routes/login.js')
var dashboard = require('./routes/dashboard')

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

app.listen(3000, async () => {
  console.log('Application is online!')
  await mongo()
  console.log('MongoDB connection established!')
})
