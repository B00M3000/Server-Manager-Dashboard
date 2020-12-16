const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cookieParser = require('cookie-parser');
const http = require('http')
const socketio = require('socket.io')

const mongo = require('./mongo.js')
const login = require('./routes/login.js')
const dashboard = require('./routes/dashboard')

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const app = express();
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000

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

io.on('connection', async socket => {
  new Promise((resolve, reject) => {
    socket.on('type', _type => {
      resolve(_type)
    })
    sleep(2500).then(() => {
      reject(`Socket ${socket.id} took too long to send socket type!`)
    })
  })
    .then(type => {
      console.log(`New Socket Connection! ID: ${socket.id} TYPE: ${type}|`)
      socket.on('disconnect', () => {
        console.log(`Socket Disconnected! ID: ${socket.id}`)
      })
      socket.emit('message', `Socket ID: ${socket.id}`)
    })
    .catch(error => {
      console.log(error)
      socket.emit('message', `Socket took too long to send socket type, please refresh the page to try again!`)
    })
})

server.listen(PORT, async () => {
  console.log(`Server is online and listening to port ${PORT}`)
})

mongo().then(connection => {
  console.log('MongoDB connection established!')
})