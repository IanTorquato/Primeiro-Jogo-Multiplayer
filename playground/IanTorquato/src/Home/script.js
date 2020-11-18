import createKeyboardListener from './functions/keyboard-listener.js'
import createGame from './functions/game.js'
import renderScreen from './functions/render-screen.js'

const game = createGame()
const keyboardListener = createKeyboardListener(document)
keyboardListener.subscribe(game.movePlayer)

const screen = document.getElementById('screen')
renderScreen(screen, game, requestAnimationFrame)

game.addPlayer({ playerId: 'Ian', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'Ana', playerX: 4, playerY: 0 })
game.addFruit({ fruitId: 'Pera', fruitX: 4, fruitY: 2 })
game.addFruit({ fruitId: 'Banana', fruitX: 8, fruitY: 4 })