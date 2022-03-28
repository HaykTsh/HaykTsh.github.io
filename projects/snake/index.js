/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  const coefM = 40;

  var KEY = {

    W: 87,
    A: 65,
    S: 83,
    D: 68,

    UP: 38,
    LEFT: 37,
    DOWN: 40,
    RIGHT: 39,
  };

  function crSnake(pX, pY) {

    var obj = {
    
      class: "snake",
      posX: pX,
      posY: pY,
    }

    return obj
  }

  // Game Item Objects

  var snake;
  var direction;

  var speedX = 0;
  var speedY = 0;

  var apple = {

    class: ".apple",
    posX: (BOARD_WIDTH/2) + 5,
    posY: (BOARD_HEIGHT / 2) - (coefM * 3) + 5,
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keyDown);                           
  startSnake();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    reposSnake();

    reposApple();
    appleFunct();
  }
  
  /* 
  Called in response to events.
  */
  function keyDown(event) {
    
    if((event.which === KEY.W|| event.which === KEY.UP) && direction != "south") {

      speedX = 0;
      speedY = -1 * coefM;
      direction = "north";
    }
    if((event.which === KEY.S|| event.which === KEY.DOWN) && direction != "north") {

      speedX = 0;
      speedY = coefM;
      direction = "south";
    }
    if((event.which === KEY.A|| event.which === KEY.LEFT) && direction != "east") {

      speedX = -1 * coefM;
      speedY = 0;
      direction = "west";
    }
    if((event.which === KEY.D|| event.which === KEY.RIGHT) && direction != "west") {

      speedX = coefM;
      speedY = 0;
      direction = "east";
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startSnake() {

    snake = [];

    snake.push(crSnake(BOARD_WIDTH / 2, BOARD_HEIGHT / 2));
    snake.push(crSnake(BOARD_WIDTH / 2, (BOARD_HEIGHT / 2) + (coefM * 1)));
    snake.push(crSnake(BOARD_WIDTH / 2, (BOARD_HEIGHT / 2) + (coefM * 2)));
    
    drawSnake(0, snake.length);
  }


  function reposSnake() {

    for(var i = (snake.length - 1); i >= 0; i--) {

      if(i === 0) {

        snake[i].posX += speedX;
        snake[i].posY += speedY;
      }
      else {

        snake[i].posX = snake[(i-1)].posX;
        snake[i].posY = snake[(i-1)].posY;
      }

      var snakeIDNum = snake[i].id;
      var snakeID = "#" + snakeIDNum.toString(10);

      $(snakeID).css('left', snake[i].posX);
      $(snakeID).css('top', snake[i].posY);
    }


  }

  function reposApple() {

    $(apple.class).css('left', apple.posX);
    $(apple.class).css('top', apple.posY);
  }

  function drawSnake(start, stop) {

    for(var i = start; i < stop; i++) {

      snake[i].id = i;
      var section = snake[i];

      $('<div id="' + section.id + '" class=' + section.class + '>').appendTo($('#board'));
    }
  }



  function growSnake () {

    var endSegment = snake[snake.length - 1];

    snake.push(crSnake(endSegment.posX, endSegment.posY));
    drawSnake((snake.length - 1), snake.length);
  }

  function appleFunct() {


  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
