const socket = io()

socket.emit('type', 'dashboard_menu')

socket.on('message', message => {
  console.log(message)
})

socket.on('guildsUpdate', guilds => {
  console.log(guilds)
})