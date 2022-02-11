/*-------------------------------- Constants --------------------------------*/

const head = snake [0]
const snakeColor = 'black'



/*---------------------------- Variables (state) ----------------------------*/

let snake = [  {x: 200, y: 300},  {x: 190, y: 300},  {x: 180, y: 300},  {x: 170, y: 300},  {x: 160, y: 300},]

/*------------------------ Cached Element References ------------------------*/

const gameField = document.getElementById('field')
const fieldCtx = gameField.getContext('2d')

/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

function drawSnakePart(snakePart) {  
  fieldCtx.fillStyle = snakeColor;  
  fieldCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
}

function drawSnake() {  
  snake.forEach(drawSnakePart);
}

function moveSnake() {
  head.x + dx
  head.y + dy
}



// setTimeout(() => {
  
// }, 100
// drawSnake()