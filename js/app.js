/*-------------------------------- Constants --------------------------------*/

const snakeColor = 'white'


/*---------------------------- Variables (state) ----------------------------*/

let snake = [1255, 1254, 1253, 1252, 1251]
let apple = 1290
let appleColor = 'green'
let snakeHead = snake [0]
let movement = 1
let direction = 'right'
let changeDirection = ''
let squares = []
let newHead 
let endGame = false
let score = 0

/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('play-area')
const currScore = document.getElementById('game-info')


/*----------------------------- Event Listeners -----------------------------*/

keyPress = document.addEventListener('keydown', (e) => {
  changeDirection = e.code
})

/*-------------------------------- Functions --------------------------------*/

function init(){
  generateBoard()
  drawSnake()
  makeApple()
  render() 
}

function render() { 
  if (endGame != true){
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

  if (endGame != true){
  snake.unshift(newHead)
  snake.pop()
  snakeHead = snake[0]
  } else if (endGame === true){
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
    endGame = true
  }

  if (apple === snakeHead){
    snake.push(snake[snake.length - 1])
    score = score + 25
    currScore.textContent = `Score: ${score}`
    genApple()
    makeApple()
  }
}

function genApple(){
  apple = Math.floor(Math.random() * 2500 + 1)
}

function makeApple() {
  squares[apple - 1].style.backgroundColor = appleColor
}

init()
