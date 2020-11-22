import createKeyboardListener from './functions/keyboard-listener.js'
import createGame from './functions/game.js'
import renderScreen from './functions/render-screen.js'

const game = createGame()
const keyboardListener = createKeyboardListener(document)

const socket = io()

socket.on('connect', () => {
	console.log(`Player connected on client with id: ${socket.id}`)
	
	const screen = document.getElementById('screen')
	renderScreen(screen, game, requestAnimationFrame, socket.id)
})

socket.on('setup', state => {
	game.setState(state)
	
	keyboardListener.registerPlayerId(socket.id)
	keyboardListener.subscribe(game.movePlayer)
})

socket.on('add-player', command => {
	console.log(`Receiving ${command.type} -> ${command.playerId}`)
	game.addPlayer(command)
})

socket.on('remove-player', command => {
	console.log(`Receiving ${command.type} -> ${command.playerId}`)
	game.removePlayer(command)
})