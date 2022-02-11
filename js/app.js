/*-------------------------------- Constants --------------------------------*/

const snakeColor = 'black'

/*---------------------------- Variables (state) ----------------------------*/

let snake = [{x: 200, y: 300},  {x: 190, y: 300},  {x: 180, y: 300},  {x: 170, y: 300},  {x: 160, y: 300}]
let snakeHead = snake [0]
let dx = 10
let dy = 0
/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('field')
const fieldCtx = gameField.getContext('2d')


/*----------------------------- Event Listeners -----------------------------*/

keyPress = document.addEventListener('keydown', (e) => {
  e.code
  console.log(e.code)
})

/*-------------------------------- Functions --------------------------------*/

function render() {
  setInterval(() => {
    clearBoard()
    drawSnake()
    moveSnake()
    
  }, 100)
}


function clearBoard() {
  fieldCtx.fillStyle = 'white'
  fieldCtx.fillRect(0, 0, gameField.width, gameField.height)
}

function drawSnakePart(snakePart) {  
  fieldCtx.fillStyle = snakeColor;  
  fieldCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
}

function drawSnake() {  
  snake.forEach(drawSnakePart);
}

function moveSnake() {
  snakeHead = snake[0]
  newHead = {x: snakeHead.x + dx , y: snakeHead.y + dy}
  snake.unshift(newHead)
  snake.pop()
}

render()
