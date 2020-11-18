const screen = document.getElementById('screen')
const context = screen.getContext('2d')
const currentPlayerId = 'Ian'

const game = createGame()
const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.movePlayer)

game.addPlayer({ playerId: 'Ian', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'Ana', playerX: 4, playerY: 0 })
game.addFruit({ fruitId: 'Pera', fruitX: 4, fruitY: 2 })
game.addFruit({ fruitId: 'Banana', fruitX: 8, fruitY: 4 })

function createGame() {
	const state = {
		players: {},
		fruits: {}
	}
	
	function addPlayer({ playerId, playerX, playerY }) { state.players[playerId] = { x: playerX, y: playerY } }
	
	function removePlayer({ playerId }) { delete state.players[playerId] }
	
	function addFruit({ fruitId, fruitX, fruitY }) { state.fruits[fruitId] = { x: fruitX, y: fruitY } }
	
	function removeFruit({ fruitId }) { delete state.fruits[fruitId] }
	
	function movePlayer(command) {
		const acceptedMoves = {
			// Mover para cima
			ArrowUp(player) {
				player.y = Math.max(player.y - 1, 0)
			},
			
			w(player) {
				player.y = Math.max(player.y - 1, 0)
			},
			
			// Mover para baixo
			ArrowDown(player) {
				player.y = Math.min(player.y + 1, screen.height - 1)
			},
			
			s(player) {
				player.y = Math.min(player.y + 1, screen.height - 1)
			},
			
			// Mover para a direita
			ArrowRight(player) {
				player.x = Math.min(player.x + 1, screen.width - 1)
			},
			
			d(player) {
				player.x = Math.min(player.x + 1, screen.width - 1)
			},
			
			// Mover para a esquerda
			ArrowLeft(player) {
				player.x = Math.max(player.x - 1, 0)
			},
			
			a(player) {
				player.x = Math.max(player.x - 1, 0)
			}
		}
		
		const keyPressed = command.keyPressed
		const playerId = command.playerId
		const player = state.players[playerId]
		const moveFunction = acceptedMoves[keyPressed]
		
		player && moveFunction && moveFunction(player) & checkForFruitCollision(playerId)
	}
	
	function checkForFruitCollision(playerId) {
		const player = state.players[playerId]
		
		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId]
			console.log(`Checking ${playerId} and ${fruitId}`)
			
			if (player.x === fruit.x && player.y === fruit.y) {
				removeFruit({ fruitId })
			}
		}
	}
	
	return { addPlayer, removePlayer, movePlayer, addFruit, removeFruit, state }
}

function createKeyboardListener() {
	const state = { observers: [] }
	
	function subscribe(observerFunction) {
		state.observers.push(observerFunction)
	}
	
	function notifyAll(command) {
		for (const observerFunction of state.observers) { observerFunction(command) }
	}
	
	document.addEventListener('keydown', handleKeydown)
	
	function handleKeydown(event) {
		const keyPressed = event.key
		const command = { playerId: currentPlayerId, keyPressed }
		
		notifyAll(command)
	}
	
	return { subscribe }
}

renderScreen()

function renderScreen() {
	// context.fillStyle = '#fff'
	context.clearRect(0, 0, 16, 16)
	
	for (const playerId in game.state.players) {
		const player = game.state.players[playerId]
		
		context.fillStyle = '#00000066'
		context.fillRect(player.x, player.y, 1, 1)
	}
	
	for (const fruitId in game.state.fruits) {
		const fruit = game.state.fruits[fruitId]
		
		context.fillStyle = 'green'
		context.fillRect(fruit.x, fruit.y, 1, 1)
	}
	
	requestAnimationFrame(renderScreen)
}