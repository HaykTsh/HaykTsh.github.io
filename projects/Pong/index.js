/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  var KEY = {

    upL: 87,
    downL: 83,
    upR: 38,
    downR: 40,
  };

  var speed = 10;
  
  // Game Item Objects

  function createItem(cx, cy, csX, csY, cid) {

    var inst = {

      id: cid,
      x: cx,
      y: cy,
      sX: csX,
      sY: csY,
      h: parseFloat($("#" + cid).css("height")),
      w: parseFloat($("#" + cid).css("width")),
    };

    return inst;
  }

  var paddleL = createItem(10, 200, 0, 0, "paddleL");
  var paddleR = createItem(BOARD_WIDTH - $("#paddleR").width - 10, 200, 0, 0, "paddleR");

  var ball = createItem(BOARD_HEIGHT/2, BOARD_HEIGHT/2, 0, 0, "ball");

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', hKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', hKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    reposPaddle();
    restrictPaddle();
  }
  
  /* 
  Called in response to events.
  */

  function hKeyDown(event) {

    var keyD = event.which;

    if (keyD === KEY.upL) {

      paddleL.sY = -1 * speed;
    }
    if (keyD === KEY.downL) {

      paddleL.sY = speed;
    }

    if (keyD === KEY.upR) {

      paddleR.sY = -1 * speed;
    }
    if (keyD === KEY.downR) {

      paddleR.sY = speed;
    }

    console.log("PaddleL: " + paddleL.sY);
    console.log("paddleR: " + paddleR.sY);
  }

  function hKeyUp(event) {

    var keyU = event.which;

    if (keyU === KEY.upL) {

      paddleL.sY = 0;
    }
    if (keyU === KEY.downL) {

      paddleL.sY = 0;
    }

    if (keyU === KEY.upR) {

      paddleR.sY = 0;
    }
    if (keyU === KEY.downR) {

      paddleR.sY = 0;
    }

    console.log("PaddleL: " + paddleL.sY);
    console.log("paddleR: " + paddleR.sY);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function reposPaddle() {

    paddleL.y += paddleL.sY;
    paddleR.y += paddleR.sY;

    $("#" + paddleL.id).css("top", paddleL.y);
    $("#" + paddleR.id).css("top", paddleR.y);
  }

  function restrictPaddle() {

    if(paddleL.y + paddleL.h > BOARD_HEIGHT) {

      paddleL.y = BOARD_HEIGHT - paddleL.h;
    }
    if(paddleL.y < 1) {

      paddleL.y = 1;
    }

    if(paddleR.y + paddleR.h > BOARD_HEIGHT) {

      paddleR.y = BOARD_HEIGHT - paddleR.h;
    }
    if(paddleR.y < 1) {

      paddleR.y = 1;
    }
  }

  function startBall() {

    
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}