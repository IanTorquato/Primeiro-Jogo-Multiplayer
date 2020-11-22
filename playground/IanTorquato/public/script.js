import createKeyboardListener from './functions/keyboard-listener.js'
import createGame from './functions/game.js'
import renderScreen from './functions/render-screen.js'

const game = createGame()
const keyboardListener = createKeyboardListener(document)
keyboardListener.subscribe(game.movePlayer)

const screen = document.getElementById('screen')
renderScreen(screen, game, requestAnimationFrame)

const socket = io()

socket.on('connect', () => {
	const playerId = socket.id
	console.log(`Player connected on client with id: ${playerId}`)
})

socket.on('setup', state => {
	console.log('> Receiving "setup" event from server.')
	console.log(state)
	
	game.state = state
})