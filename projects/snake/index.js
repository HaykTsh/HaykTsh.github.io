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

  function crSnake(cls, pX, pY) {

    var obj = {
    
      class: cls,
      posX: pX,
      posY: pY,
    }

    return obj
  }

  // Game Item Objects



  var snake = [];

  var speedX = 0;
  var speedY = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keyDown);                           
  startSnake();
  drawSnake();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    genSnake();
    
    reposSnake();
  }
  
  /* 
  Called in response to events.
  */
  function keyDown(event) {
    
    if(event.which === KEY.W|| event.which === KEY.UP) {

      speedX = 0;
      speedY = -40;
    }
    if(event.which === KEY.S|| event.which === KEY.DOWN) {

      speedX = 0;
      speedY = 40;
    }
    if(event.which === KEY.A|| event.which === KEY.LEFT) {

      speedX = -40;
      speedY = 0;
    }
    if(event.which === KEY.D|| event.which === KEY.RIGHT) {

      speedX = 40;
      speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startSnake() {

    snake = [];

    snake.push(crSnake("head", BOARD_WIDTH / 2, BOARD_HEIGHT / 2));
    //snake.push(crSnake("body", BOARD_WIDTH / 2, (BOARD_HEIGHT / 2) + 40));

    console.log(snake);
  }

  function genSnake () {

    for(var i = 0; i < snake.length; i++) {

      var segment = $('<div id="'+ i +'" class=' + section.class + '>');

      segment.appendTo($('#board'));
    }
  }

  function reposSnake() {

    var head = snake[0];

    head.posX += speedX;
    head.posY += speedY;

    snake[0] = head;

    drawSnake();
  }

  function drawSnake() {

    for(var i = 0; i < snake.length; i++) {

      var section = snake[i];
      //var segment = $('<div id="snake" class=' + section.class + '>').appendTo($('#board'));
      var segment = $(section.id);

      segment.css('left', section.posX);
      segment.css('top', section.posY);
    }
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
