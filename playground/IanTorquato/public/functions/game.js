export default function createGame() {
	const state = {
		players: {},
		fruits: {},
		screen: { height: 15, width: 15 }
	}
	
	const observers = []
	
	function subscribe(observerFunction) { observers.push(observerFunction) }
	
	function notifyAll(command) { for (const observerFunction of observers) { observerFunction(command) } }
	
	function setState(newState) { Object.assign(state, newState) }
	
	function addPlayer({ playerId, playerX, playerY }) {
		const x = playerX || Math.floor(Math.random() * state.screen.width)
		const y = playerY || Math.floor(Math.random() * state.screen.height)
		
		state.players[playerId] = { x, y }
		
		notifyAll({ type: 'add-player', playerId, playerX: x, playerY: y })
	}
	
	function removePlayer({ playerId }) {
		delete state.players[playerId]
		
		notifyAll({ type: 'remove-player', playerId })
	}
	
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
				player.y = Math.min(player.y + 1, state.screen.height)
				
			},
			
			s(player) {
				player.y = Math.min(player.y + 1, state.screen.height)
				
			},
			
			// Mover para a direita
			ArrowRight(player) {
				player.x = Math.min(player.x + 1, state.screen.width)
				
			},
			
			d(player) {
				player.x = Math.min(player.x + 1, state.screen.width)
				
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
	
	return { addPlayer, removePlayer, movePlayer, addFruit, removeFruit, state, setState, subscribe }
}