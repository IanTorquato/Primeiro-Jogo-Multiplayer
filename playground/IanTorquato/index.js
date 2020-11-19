import express from 'express'
// import http from 'http'
import createGame from './public/functions/game.js'

const app = express()
// const server = http.createServer(app)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({ playerId: 'Ian', playerX: 0, playerY: 0 })
game.addPlayer({ playerId: 'Ana', playerX: 4, playerY: 0 })
game.addFruit({ fruitId: 'Pera', fruitX: 4, fruitY: 2 })
game.addFruit({ fruitId: 'Banana', fruitX: 8, fruitY: 4 })
game.movePlayer({ playerId: 'Ana', keyPressed: 'ArrowRight' })

console.log(game.state)

app.listen(3000, () => console.log('--> Server runing on port 3333 <--'))