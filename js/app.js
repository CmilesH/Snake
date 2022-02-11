/*-------------------------------- Constants --------------------------------*/

const snakeColor = 'white'


/*---------------------------- Variables (state) ----------------------------*/

let snake = [{x: 200, y: 300},  {x: 190, y: 300},  {x: 180, y: 300},  {x: 170, y: 300},  {x: 160, y: 300}]
let snakeHead = snake [0]
let dx = 10
let dy = 0
let direction = 'right'
let changeDirection = ''

/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('field')
const fieldCtx = gameField.getContext('2d')


/*----------------------------- Event Listeners -----------------------------*/

keyPress = document.addEventListener('keydown', (e) => {
  changeDirection = e.code
  console.log(direction)
})

/*-------------------------------- Functions --------------------------------*/

function init(){
  clearBoard()
  render()
}

function render() {
  setInterval(() => {
    checkDirection()
    moveSnake()
    checkCollision()
    clearBoard()
    drawSnake()
    console.log(checkCollision())
  }, 150)
}

function checkDirection() {
  if (changeDirection == 'ArrowUp' && direction != 'down'){
    direction = 'up'
    dy = -10
    dx = 0
  } else if (changeDirection == 'ArrowLeft' && direction != 'right'){
    direction = 'left'
    dy = 0
    dx = -10
  } else if (changeDirection == 'ArrowDown' && direction != 'up'){
    direction = 'down'
    dy = 10
    dx = 0
  } else if (changeDirection == 'ArrowRight' && direction != 'left'){
    direction = 'right'
    dy = 0
    dx = 10
  }
}

function clearBoard() {
  fieldCtx.fillStyle = 'purple'
  fieldCtx.fillRect(0, 0, gameField.width, gameField.height)
}

function drawSnakePart(snakePart) {  
  fieldCtx.fillStyle = snakeColor  
  fieldCtx.fillRect(snakePart.x, snakePart.y, 10, 10)
}

function drawSnake() {  
  snake.forEach(drawSnakePart)
}

function moveSnake() {
  snakeHead = snake[0]
  const newHead = {x: snakeHead.x + dx , y: snakeHead.y + dy}
  snake.unshift(newHead)
  snake.pop()
}

function checkCollision() {
  const hitLeftWall = snakeHead.x < 0
  const hitRightWall = snakeHead.x > 600
  const hitTopWall = snakeHead.y < 0
  const hitBottomWall = snakeHead > 600

  hitChecks = [hitLeftWall, hitRightWall, hitTopWall, hitBottomWall]
  
  if (hitChecks.some((e) => e == true)){
    return true
  }

  for (i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true
    }
  }
}

init()