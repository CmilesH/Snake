/*-------------------------------- Constants --------------------------------*/

const snakeColor = 'white'


/*---------------------------- Variables (state) ----------------------------*/

let snake = [204, 203, 202, 201, 200]
let snakeHead = snake [0]
let movement = 1
let direction = 'right'
let changeDirection = ''
let squares = []
let newHead 
let endGame = false

/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('play-area')


/*----------------------------- Event Listeners -----------------------------*/

keyPress = document.addEventListener('keydown', (e) => {
  changeDirection = e.code
  console.log(direction)
})

/*-------------------------------- Functions --------------------------------*/

function init(){
  generateBoard()
  drawSnake()
  // clearBoard()
  render()
  
}

function render() { 
    play = setInterval(() => {
      checkDirection()
      moveSnake();
      checkEnd()
      clearBoard()
      drawSnake()
    
    console.log(endGame)
    console.log(newHead)
  }, 100)
  
  
}

function checkDirection() {
  if (changeDirection == 'ArrowUp' && direction != 'down'){
    direction = 'up'
    movement = -20
  } else if (changeDirection == 'ArrowLeft' && direction != 'right'){
    direction = 'left'
    movement = -1
  } else if (changeDirection == 'ArrowDown' && direction != 'up'){
    direction = 'down'
    movement = 20
  } else if (changeDirection == 'ArrowRight' && direction != 'left'){
    direction = 'right'
    movement = 1
  }
}

function clearBoard() {
  squares.forEach(e => {
    e.style.backgroundColor = 'purple'
  })
}

function generateBoard() {
  for (i= 1; i < 401; i++){
    let square = document.createElement('div')
    square.setAttribute('class', 'square')
    square.setAttribute('id', `${i}`)
    gameField.appendChild(square)
    squares.push(document.getElementById(i))
  }
}

function drawSnakePart(snakePart) {  
  squares[snakePart].style.backgroundColor = snakeColor
}

function drawSnake() {  
  snake.forEach(drawSnakePart)
}

function moveSnake() {
  snakeHead = snake[0]
  newHead = snakeHead + movement
  checkCollision()
  if (endGame!= true){
  snake.unshift(newHead)
  snake.pop()
  } else if (endGame === true){
    console.log(checkCollision())
    clearInterval()
  }
}

function checkCollision() {
  const hitLeftWall = ((newHead % 20 === 1) && direction === 'left')
  const hitRightWall = ((newHead % 20 === 0) && direction === 'right')
  const hitTopWall = newHead < 0
  const hitBottomWall = newHead > 400

  hitChecks = [hitLeftWall, hitRightWall, hitTopWall, hitBottomWall]
  
  if (hitChecks.some(e => e === true)){
    endGame = true
  }

  for (i = 1; i < snake.length; i++) {
    if (snake[i] === newHead){
      endGame = true
    }
  }
}

function checkEnd(){
  if (endGame === true) {
    clearInterval(play)
  }
}
init()
