import createKeyboardListener from './functions/keyboard-listener.js'
import createGame from './functions/game.js'
import renderScreen from './functions/render-screen.js'

const game = createGame()
const keyboardListener = createKeyboardListener(document)
keyboardListener.subscribe(game.movePlayer)

const screen = document.getElementById('screen')
renderScreen(screen, game, requestAnimationFrame)