/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $("#board").width(); //CONSTANT BOARD SIZES
  const BOARD_HEIGHT = $("#board").height();

  const coefM = 40;   // 'MASTER' COEFFICIENT, REPEATING NUMBER COORELATED WITH PROPORTIONS ON THE BOARD

  var KEY = { //KEYS

    W: 87,
    A: 65,
    S: 83,
    D: 68,

    UP: 38,
    LEFT: 37,
    DOWN: 40,
    RIGHT: 39,

    R: 82,
  };

  function crSnake(pX, pY) { //SNAKE SEGMENT FACTORY FUNCTION

    var colorCoef = randomizeColor(30); //RANDOMIZES COLOR OF SNAKE SEGMENT

    var colorNum = (snake.length === 0) ? 'rgb(' + (21) + ', ' + (211) + ', ' + (116) + ')' : 'rgb(' + (125 + colorCoef) + ', ' + (200 + colorCoef) + ', ' + (225 + colorCoef) + ')'; //IF THIS SNAKE SEGMENT IS THE FIRST SNAKE SEGMENT (THE HEAD), THE COLOR IS SET TO A LIGHT GREEN, IF NOT THE COLOR IS SET TO THE RANDOMIZED COLOR

    var obj = {
    
      class: "snake",
      posX: pX,
      posY: pY,
      color: colorNum,
      h: coefM,
      w: coefM,
    }

    return obj
  }

  // Game Item Objects

  var snake;
  var direction = "north"; //FOR PREVENTING THE SNAKE FROM GOING BACKWARDS

  var speedX = 0;
  var speedY = 0;

  var start = false; //STARTS MOVEMENT WHEN A KEY IS PRESSED
  var movement = true; //ALLOWS KEY INPUT IF THE GAME IS NOT LOST

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
    moveSnake();
    keepInBounds();

    bodyCollision();

    drawApple();
    appleFunct();
  }
  
  /* 
  Called in response to events.
  */
  function keyDown(event) {
    
    if(movement) { //MAKES SURE GAME IS NOT LOST
      if((event.which === KEY.W|| event.which === KEY.UP) && direction != "south") { //INPUTS CAN BE WASD OR ARROW KEYS //DETECTS IF THE CURRENT DIRECTION IS NOT AGAINST THE INPUT DIRECTION

        speedX = 0; //RESETS OTHER SPEED TO PREVENT DIAGONAL MOVEMENT
        speedY = -1 * coefM; //UPDATES Y SPEED
        direction = "north"; //SETS DIRECTION

        start = true; //STARTS MOVEMENT
      }
      if((event.which === KEY.S|| event.which === KEY.DOWN) && direction != "north") {

        speedX = 0;
        speedY = coefM;
        direction = "south";

        start = true;
      }
      if((event.which === KEY.A|| event.which === KEY.LEFT) && direction != "east") {

        speedX = -1 * coefM;
        speedY = 0;
        direction = "west";

        start = true;
      }
      if((event.which === KEY.D|| event.which === KEY.RIGHT) && direction != "west") {

        speedX = coefM;
        speedY = 0;
        direction = "east";

        start = true;
      }
    }

    if(event.which === KEY.R) { //RESTARTS GAME // DOES NOT NEED MOVEMENT TO BE TRUE

      restartGame();
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function startSnake() { //START GAME FUNCTION

    $("#board").css('background-color', "black"); //MAKES BACKGROUND BLACK

    snake = []; //EMPTIES SNAKE

    snake.push(crSnake(BOARD_WIDTH / 2, BOARD_HEIGHT / 2)); //PUSHES 3 SEGMENTS TO THE SNAKE
    snake.push(crSnake(BOARD_WIDTH / 2, (BOARD_HEIGHT / 2) + (coefM * 1)));
    snake.push(crSnake(BOARD_WIDTH / 2, (BOARD_HEIGHT / 2) + (coefM * 2)));
    
    drawSnake(0, snake.length); //DRAWS THE THREE ADDED SEGMENTS TO THE BOARD
  }


  function reposSnake() { //UPDATES POSITION VARIABLES

    for(var i = (snake.length - 1); i >= 0; i--) { //RUNS THORUGH THE SNAKE ARRAY BACKWARDS FRO THE NON-HEAD SNAKE SEGMENTS

      if(start) { //IF A KEY IS INPUTED
        
        if(i === 0) { //DETECTS IF THE SPECIFIC SEGMENT OF TEH SNAKE IS THE HEAD OR NOT

          snake[i].posX += speedX; //STANDARD 'WALKER' MOEVEMENT FOR THE HEAD
          snake[i].posY += speedY;
        }
        else { //NON-HEAD SNAKE SEGMENTS

          snake[i].posX = snake[(i-1)].posX; //SETS X AND Y POSITIONS TO THE PSOITIONS OF THE SNAKE SEGMENT BEFORE ITSELF
          snake[i].posY = snake[(i-1)].posY;
        }
      }
    }

  }

  function moveSnake() { //UPDATES THE PSOTITION ON THE HTML

    for(var i = (snake.length - 1); i >= 0; i--) { //RUNS THROUGH THE SNAKE ARRAY BACKWARDS TO ALIGN WITH reposSnake() FUNCTION

      var snakeIDNum = snake[i].id;
      var snakeID = "#" + snakeIDNum.toString(10); //TURNS SNAKE ID NUMBER INTO A STRING TO USE FRO JQUERY


      $(snakeID).css('left', snake[i].posX); //UPDATES HTML POSITION OF SNAKE SEGMENT
      $(snakeID).css('top', snake[i].posY);

      $(snakeID).css('background-color', snake[i].color); //UPDATES BACKGROUND COLOR BECAUSE COLOR IS FIRST SET TO BLACK WHEN DRAWN TO HIDE A VISUAL BUG
    }
  }

  function drawSnake(start, stop) { //ADDS SEGMENTS OF THE SNAKE TO THE HTML 

    for(var i = start; i < stop; i++) { //STARTS AND STOPS AT DEFINED NUMBERS

      snake[i].id = i; //GIVES EACH SEGMENT AN ID
      var section = snake[i];

      $('<div id="' + section.id + '" class=' + section.class + '>').appendTo($('#board')).css('background-color', 'black'); //APPENDS A NEW <div> TO THE GAME BOARD WITH THE ID OF THE SNAKE SEGMENT AND THE CLASS OF SNAKE //SETS BACKGROUND COLOR TO BLACK TO PREVENT A VISUAL BUG
    }
  }

  function growSnake () { //PUSHES A NEW SEGMENT TO THE SNAKE ARRAY AND ADDS THAT SEGMENT TO THE HTML

    snake.push(crSnake(0, 0)); //PUSHES NEW SEGMENT

    drawSnake((snake.length - 1), snake.length); //DRAWS THE NEW SEGMENT
  }

  function moveApple() { //PUTS APPLE IN A RANDMOIZED LOCATION

    apple.posX = ((Math.round(Math.random() * 21)) * coefM) + ((5/40) * coefM); //ROLLS A RANDOM NUMBER FROM 0 - 1 // MULTIPLIES NUMBER BY 21, BECAUSE THER IS 22 TILES (0 - 22) // ROUNDS THE NUMBER TO GET EXACT POSITIONS // ADDS 5 TO X AND Y TO CENTER THE APPLE ON THE TILE BECAUSE THE APPLE IS SMALLER THAN THE TILE
    apple.posY = ((Math.round(Math.random() * 21)) * coefM) + ((5/40) * coefM);

    for(var i = 0; i < snake.length; i++){ //RUNS THROUGH ENTIRE SNAKE ARRAY

      if(apple.posX === (snake[i].posX + ((5/40) * coefM)) && apple.posY === (snake[i].posY + ((5/40) * coefM))) { //IF THE NEW APPLE POSITION IS IN THE SAME POSITION AS A SNAKE SEGMENT

        moveApple(); //MOVES THE APPLLE TO A NEW TILE
      }
    }
  }

  function drawApple() { //UPDATES APPLES PSOITION IN THE HTML

    $(apple.class).css('left', apple.posX);
    $(apple.class).css('top', apple.posY);
  }

  function appleFunct() { //IF THE SNAKE HEAD AND APPLE ARE ON THE SAME TILE, THE APPLE IS MOVED TO A NEW LOCATION AND THE SNAKE GROWS

    if(((snake[0].posX + ((5/40) * coefM)) === apple.posX) && ((snake[0].posY + ((5/40) * coefM)) === apple.posY)) { //5 IS ADDED TO THE SNAKE POSITION BECAUSE THE APPLE POSITION IS 5PX OFF OF THE POSITION OF A SNAKE SEGMENT IN BOTH DIRECTIONS

      moveApple();
      growSnake();
    }
  }

  function randomizeColor(highestVal) { //RANDOMIZES A COLOR TO BE USED ON EACH SNAKE SEGMENT

    var colorRandom = Math.round(Math.random() * highestVal); //CREATES THE COEFFICIENT FOPR THE RANDOM COLOR
    var polarity = Math.random() > 0.5 ? -1 : 1; //MAKES THE COEFFICIENT EITHER A POSITIVE OR NEGATIVE NUMBER

    return (colorRandom * polarity);
  }

  function keepInBounds() { //IF THE SNAKE CROSSES THE BORDER, THE SNAKE LOSES

    if(snake[0].posX > (BOARD_WIDTH - snake[0].w) || snake[0].posX < 0 || snake[0].posY > (BOARD_HEIGHT - snake[0].h) || snake[0].posY < 0) { //DETECTS IF THE SNAKE HEAD IS PAST THE BORDERS
      
      if(snake[0].posX > (BOARD_WIDTH - (1 * snake[0].w))) { //IF SNAKE PASSES THE WESTERN BORDER

        snake[0].posX = (BOARD_WIDTH - snake[0].w); //PUT SNAKE POSITYION BACK IN THE BORDER
        moveSnake(); //REDRAW SNAKE IN THE BORDER SO THE HEAD DOESN'T POKE OUT
      }
      if(snake[0].posX < 0) { //IF SNAKE PASSES THE EASTERN BORDER

        snake[0].posX = 0;
        moveSnake();
      }
      if(snake[0].posY > (BOARD_HEIGHT - snake[0].h)) {//IF SNAKE PASSES THE SOUTHERN BORDER

        snake[0].posY = (BOARD_HEIGHT - snake[0].h);
        moveSnake();
      }
      if(snake[0].posY < 0) {//IF SNAKE PASSES THE NORTHERN BORDER

        snake[0].posY = 0;
        moveSnake();
      }

      lose(); //GAME OVER
    }
  }

  function bodyCollision() { //LOSES THE GAME IF THE HEAD COLLIDES WITH THE BODY

    for(var i = 1; i < snake.length; i++){ //RUNS THROUGH SNAKE ARRAY

      if(snake[0].posX === snake[i].posX && snake[0].posY === snake[i].posY){ //IF THE POSITIONS FOR THE SNKAE HEAD AND ANY BODY PARTY ARE THE SAME...

        lose(); //GAME OVER
      }
    }
  }

  function restartGame() {

    start = false; //PREVENTS MOVEMENT UNTIL A MOVEMENT KEY IS PRESSED

    for(var i = 0; i < snake.length; i++) { //RUNS THROUGH SNAKE ARRAY

      var snakeIDNum = snake[i].id;
      var snakeID = "#" + snakeIDNum.toString(10); //GETS A STRING OUT OF THE SNAKE ID TO USE IN JQUERY

      $(snakeID).remove(); //REMOVES THE SELECTED SNAKE ID //WHEN RUN THROUGH THE WHOLE SNAKE ARRAY, EVERY SNAKE SEGMENT IS REMOVED
    }

    startSnake(); //RESTARTS THE GAME BACK TO THE VERY BEGINNING 

    speedX = 0; //RESETS THE SPEED
    speedY = 0;

    direction = 'north'; //RESETS THE DIRECTION
    movement = true; //ALLOWS KEYPRESSES TO TAKE AFFECT NOW

    apple.posX = (BOARD_WIDTH/2) + 5; //RESTARTS THE APPLE POSITIONS
    apple.posY = (BOARD_HEIGHT / 2) - (coefM * 3) + 5;
  }

  function lose() {

    start = false; //MOVEMENT STOPPED
    movement = false; //MOVEMENT KEYPRESSED DONT REGISTER ANYMORE

    $("#board").css('background-color', "rgb(200, 40, 40)"); //BACKGROUND SET TO RED 
    $("#loseMessage").text('YOU HAVE LOST - Press "R" to restart'); //LOSE MESSAGE DISPLAYED
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}