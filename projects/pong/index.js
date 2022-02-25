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

  const WIN_CONDITION = 9;

  var KEY = {

    upL: 87,
    downL: 83,
    upR: 38,
    downR: 40,
  };

  var speed = 15;
  
  // Game Item Objects

  var scoreL = {val: 0, id: "#score2", name: "Player 2"};
  var scoreR = {val: 0, id: "#score1", name: "Player 1"};

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

  function rgbIfy(obj, r, g, b) {

    obj.r = r;
    obj.g = g;
    obj.b = b;
    obj.og = [r, g, b];
  }

  var paddleL = createItem(10, 200, 0, 0, "paddleL");
  var paddleR = createItem(BOARD_WIDTH - parseFloat($("#paddleR").css("width")) - 10, 200, 0, 0, "paddleR");

  var ball = createItem(BOARD_WIDTH/2, BOARD_HEIGHT/2, 0, 0, "ball1");
      ball.p = 1;
      ball.speedCoef = 4;
      ball.colorCoef = 1;
  var ball2 = createItem(BOARD_WIDTH/2, BOARD_HEIGHT/2, 0, 0, "ball2");
      ball2.p = 1;
      ball2.speedCoef = 4;
      ball2.colorCoef = 1;
  var ball3 = createItem(BOARD_WIDTH/2, BOARD_HEIGHT/2, 0, 0, "ball3");
      ball3.p = -1;
      ball3.speedCoef = 0;
      ball3.colorCoef = 0;

  rgbIfy(ball, 255, 255, 255);
  rgbIfy(ball2, 150, 150, 150);
  rgbIfy(ball3, 164, 250, 178);

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', hKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', hKeyUp);
  
  startBall(ball);
  startBall(ball2);
  startBall(ball3);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////


  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    
    win();

    reposPaddle();
    restrictPaddle();

    moveScore(scoreL, paddleR);
    moveScore(scoreR, paddleL);

    reposBall();

    restrictBall(ball);
    restrictBall(ball2);
    restrictBall(ball3);

    doCollide(paddleR, ball);
    doCollide(paddleL, ball);

    doCollide(paddleR, ball2);
    doCollide(paddleL, ball2);

    doCollide(paddleR, ball3);
    doCollide(paddleL, ball3);
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

    //console.log("PaddleL: " + paddleL.sY);
    //console.log("PaddleR: " + paddleR.sY);
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

    //console.log("PaddleL: " + paddleL.sY);
    //console.log("PaddleR: " + paddleR.sY);
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

  function reposBall() {

    ball.x += ball.sX;
    ball.y += ball.sY;

    $("#" + ball.id).css("top", ball.y);
    $("#" + ball.id).css("left", ball.x);

    ball2.x += ball2.sX;
    ball2.y += ball2.sY;

    $("#" + ball2.id).css("top", ball2.y);
    $("#" + ball2.id).css("left", ball2.x);

    ball3.x += ball3.sX;
    ball3.y += ball3.sY;

    $("#" + ball3.id).css("top", ball3.y);
    $("#" + ball3.id).css("left", ball3.x);
  }

  function restrictBall(ballF) {

    if(ballF.y + ballF.h > BOARD_HEIGHT || ballF.y < 0) {

      ballF.sY *= -1;
    }

    if(ballF.x + ballF.h > BOARD_WIDTH ){

      score(scoreR, ballF);
      startBall(ballF);
    }

    if(ballF.x < 0){

      score(scoreL, ballF);
      startBall(ballF);
    }
  }

  function startBall(ballF) {

    var ranNumX = (Math.random() * 5 + 2) * (Math.random() > 0.5 ? -1 : 1);
    var ranNumY = (Math.random() * 5 + 2) * (Math.random() > 0.5 ? -1 : 1);

    ballF.sX = ranNumX;
    ballF.sY = ranNumY;

    ballF.x = BOARD_WIDTH/2;
    ballF.y = BOARD_HEIGHT/2;

    ballF.r = ballF.og[0];
    ballF.g = ballF.og[1];
    ballF.b = ballF.og[2];

    $("#" + ballF.id).css("background-color", "rgb(" + ballF.r + ", " + ballF.g + ", " + ballF.b + ")");
  }

  function score(player, ballF) {
    
    player.val += ballF.p;

    if (scoreL.val < 0) {scoreL.val = 0;}
    if (scoreR.val < 0) {scoreR.val = 0;}
    
    $(player.id).text(player.val);
  }

  function doCollide(paddleF, ballF) {

    var bLeft = ballF.x;
    var bRight = ballF.x + ballF.w;

    var bTop = ballF.y;
    var bBottom = ballF.y + ballF.h;

    var pLeft = paddleF.x;
    var pRight = paddleF.x + paddleF.w;

    var pTop = paddleF.y;
    var pBottom = paddleF.y + paddleF.h;



    if( ((bLeft < pRight && bLeft > pLeft) || (bRight < pRight && bRight > pLeft)) && ((bTop < pBottom) && (bBottom > pTop))) {

      ballF.sX *= -1;

      if(ballF.sX > 0) {

        ballF.sX += ballF.speedCoef;
      }
      else{

        ballF.sX -= ballF.speedCoef;
      }

      if(ballF.sY > 0) {

        ballF.sY += (ballF.speedCoef/2);
      }
      else{

        ballF.sY -= (ballF.speedCoef/2);
      }

      reddify(ballF);

      console.log("collide " + paddleF.id);
    }
  }

  function moveScore(score, paddle) {

    $(score.id).css("top", paddle.y - 10);
  }

  function win() {

    if(scoreR.val >= WIN_CONDITION || scoreL.val >= WIN_CONDITION) {

      /*
    ball.sX = 0;
    ball.sY = 0;

    ball.x = BOARD_WIDTH/2;
    ball.y = BOARD_HEIGHT/2;

    paddleL.sY = 0;
    paddleR.sY = 0;
      */

      if(scoreR.val >= WIN_CONDITION) {

        $("#title").text("Player 1 wins!!!");
      }
      if(scoreL.val >= WIN_CONDITION) {

        $("#title").text("Player 2 wins!!!");
      }
    
    endGame();
    }
  }

  function reddify(ballF) {

    if (ballF.r >= 255) { ballF.r = ballF.r; }
    else if (ballF.r <= 0) { ballF.r = 0; }
    else { ballF.r += (20 * ballF.colorCoef); }

    if (ballF.g > 255) { ballF.g = ballF.g; }
    else if (ballF.g <= 0) { ballF.g = 0; }
    else { ballF.g -= (20 * ballF.colorCoef); }

    if (ballF.b > 255) { ballF.b = ballF.b; }
    else if (ballF.b <= 0) { ballF.b = 0; }
    else { ballF.b -= (20 * ballF.colorCoef); }

    $("#" + ballF.id).css("background-color", "rgb(" + ballF.r + ", " + ballF.g + ", " + ballF.b + ")");
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}