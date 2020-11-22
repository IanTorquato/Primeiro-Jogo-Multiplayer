import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import createGame from './public/functions/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()

console.log(game.state)

sockets.on('connection', socket => {
	console.log(`> Player connected on server with id: ${socket.id}`)
	
	socket.emit('setup', game.state)
})

server.listen(3000, () => console.log('--> Server runing on port 3000 <--'))