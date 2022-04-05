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

    var colorCoef = randomizeColor(30);

    var colorNum = (snake.length === 0) ? 'rgb(' + (21) + ', ' + (211) + ', ' + (116) + ')' : 'rgb(' + (125 + colorCoef) + ', ' + (200 + colorCoef) + ', ' + (225 + colorCoef) + ')';

    var obj = {
    
      class: "snake",
      posX: pX,
      posY: pY,
      color: colorNum, //rgb(135, 206, 250) "lightskyblue"
      h: coefM,
      w: coefM,
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
    keepInBounds();
    moveSnake();

    drawApple();
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

    if(event.which === 75) {

      apple.posX = ((Math.round(Math.random() * 22)) * coefM) + 5;
      apple.posY = ((Math.round(Math.random() * 22)) * coefM) + 5;
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

      //var snakeIDNum = snake[i].id;
      //var snakeID = "#" + snakeIDNum.toString(10);
      
      /*
      $(snakeID).css('left', snake[i].posX);
      $(snakeID).css('top', snake[i].posY);

      $(snakeID).css('background-color', snake[i].color);
      */
    }

  }

  function moveSnake() {

    for(var i = (snake.length - 1); i >= 0; i--) {

      var snakeIDNum = snake[i].id;
      var snakeID = "#" + snakeIDNum.toString(10);

      $(snakeID).css('left', snake[i].posX);
      $(snakeID).css('top', snake[i].posY);

      $(snakeID).css('background-color', snake[i].color);
    }
  }

  function drawSnake(start, stop) {

    for(var i = start; i < stop; i++) {

      snake[i].id = i;
      var section = snake[i];

      $('<div id="' + section.id + '" class=' + section.class + '>').appendTo($('#board')).css('background-color', 'black');
    }
  }

  function growSnake () {

    snake.push(crSnake(0, 0));

    
    drawSnake((snake.length - 1), snake.length);
  }

  function moveApple() {

    apple.posX = ((Math.round(Math.random() * 21)) * coefM) + 5;
    apple.posY = ((Math.round(Math.random() * 21)) * coefM) + 5;

    for(var i = 0; i < snake.length; i++){

      if(apple.posX === (snake[i].posX + 5) && apple.posY === (snake[i].posY + 5)) {

        moveApple();
      }
    }
  }

  function drawApple() {

    $(apple.class).css('left', apple.posX);
    $(apple.class).css('top', apple.posY);
  }

  function appleFunct() {

    if(((snake[0].posX + 5) === apple.posX) && ((snake[0].posY + 5) === apple.posY)) {

      moveApple();
      growSnake();
    }
  }

  function randomizeColor(highestVal) {

    var colorRandom = Math.round(Math.random() * highestVal);
    var polarity = Math.random() > 0.5 ? -1 : 1;

    return (colorRandom * polarity);
  }

  function keepInBounds() {

    console.log(snake[0].w);

    if(snake[0].posX > (BOARD_WIDTH - (2 * snake[0].w)) || snake[0].posX < snake[0].w || snake[0].posY > (BOARD_HEIGHT - (2 * snake[0].h)) || snake[0].posY < snake[0].h) {

      endGame();
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
