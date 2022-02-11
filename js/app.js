/*-------------------------------- Constants --------------------------------*/
const gameField = document.getElementById('field')
const fieldCtx = gameField.getContext('2d')


/*---------------------------- Variables (state) ----------------------------*/

let snake = [  {x: 200, y: 300},  {x: 190, y: 300},  {x: 180, y: 300},  {x: 170, y: 300},  {x: 160, y: 300},]

/*------------------------ Cached Element References ------------------------*/



/*----------------------------- Event Listeners -----------------------------*/



/*-------------------------------- Functions --------------------------------*/

function drawSnakePart(snakePart) {  
  fieldCtx.fillStyle = 'black';  
  fieldCtx.fillRect(snakePart.x, snakePart.y, 10, 10);  
}
 
function drawSnake() {  
  snake.forEach(drawSnakePart);
}

drawSnake()