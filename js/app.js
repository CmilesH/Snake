/*-------------------------------- Constants --------------------------------*/

const snakeColor = 'white'


/*---------------------------- Variables (state) ----------------------------*/

let snake = []
let apple 
let appleColor 
let snakeHead 
let movement
let direction = ''
let changeDirection = ''
let squares = []
let newHead 
let playing = false
let score = 0
let gameState = 'menu'
/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('play-area')
const currScore = document.getElementById('game-info')
const playBtn = document.getElementById('play-btn')
const resultMenu = document.getElementById('end-menu')
const retryBtn = document.getElementById('retry-btn')
const finalScore = document.getElementById('score')


/*----------------------------- Event Listeners -----------------------------*/

keyPress = document.addEventListener('keydown', (e) => {
  changeDirection = e.code
})

playBtn.addEventListener('click', function() {
  gameField.style.display = 'flex'
  playBtn.style.visibility = 'hidden'
  playing = true
  init()

})

retryBtn.addEventListener('click', function(){
  init()
  initVars()
  updateScore()
  resultMenu.style.visibility = 'hidden'
  resultMenu.style.display = 'none'

})
/*-------------------------------- Functions --------------------------------*/

function initVars() {
  snake = [1255, 1254, 1253, 1252, 1251]
  apple = 1290
  appleColor = 'green'
  snakeHead = snake [0]
  movement = 1
  direction = 'right'
  changeDirection = ''
  playing = true
  score = 0
}

function init(){
  if (gameState === 'menu'){
    generateBoard()
    gameState = 'playing'
  }
  initVars()
  clearBoard()
  drawSnake()
  makeApple()
  render() 
  
}

function render() { 
  if (playing === true){
    play = setTimeout(() => {
      moveSnake()
      clearBoard()
      makeApple()
      drawSnake()
      render()  
    }, 50)
  }
}

function generateBoard() {
  for (i= 1; i < 2501; i++){
    let square = document.createElement('div')
    square.setAttribute('class', 'square')
      square.setAttribute('id', `${i}`)
      gameField.appendChild(square)
      squares.push(document.getElementById(i))
  }
}
  
  function clearBoard() {
    squares.forEach(e => {
      e.style.backgroundColor = 'purple'
    })
  }

function drawSnakePart(snakePart) {  
  squares[snakePart - 1].style.backgroundColor = snakeColor
}

function drawSnake() {  
  snake.forEach(drawSnakePart)
}

async function moveSnake() {
  if (changeDirection == 'ArrowUp' && direction != 'down'){
    direction = 'up'
    movement = -50
  } else if (changeDirection == 'ArrowLeft' && direction != 'right'){
    direction = 'left'
    movement = -1
  } else if (changeDirection == 'ArrowDown' && direction != 'up'){
    direction = 'down'
    movement = 50
  } else if (changeDirection == 'ArrowRight' && direction != 'left'){
    direction = 'right'
    movement = 1
  }

  snakeHead = snake[0]
  newHead = snakeHead + movement

  checkCollision()
  await checkCollision()

  if (playing === true){
  snake.unshift(newHead)
  snake.pop()
  snakeHead = snake[0]
  } else if (playing != true){
    clearTimeout(play)
  }
}

function checkCollision() {
  snakeBody = snake.slice(1).map(e => e)
  const hitLeftWall = ((snakeHead % 50 === 1) && direction === 'left')
  const hitRightWall = ((snakeHead % 50 === 0) && direction === 'right')
  const hitTopWall = newHead < 0
  const hitBottomWall = newHead > 2500
  const hitBody = (snakeBody.some(e => e === newHead))

  hitChecks = [hitLeftWall, hitRightWall, hitTopWall, hitBottomWall, hitBody]
  
  if (hitChecks.some(e => e === true)){
    endGame()
  }

  if (apple === snakeHead){
    snake.push(snake[snake.length - 1])
    score = score + 25
    updateScore()
    genApple()
    makeApple()
  }
}

function genApple(){
  apple = Math.floor(Math.random() * 2500 + 1)
  if (snake.some(e => e === apple)){
    genApple()
  }
}

function makeApple() {
  squares[apple - 1].style.backgroundColor = appleColor
}

function updateScore() {
  currScore.textContent = `Score: ${score}`
}

function endGame() {
  playing = false
  resultMenu.style.visibility = 'visible'
  resultMenu.style.display = 'grid'
  finalScore.textContent = `Final Score: ${score}`
}
