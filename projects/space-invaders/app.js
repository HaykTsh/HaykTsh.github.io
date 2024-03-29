const grid = document.querySelector(".grid"); //assigns the html grid element to an element to use in javascript
const resultsDisplay = document.querySelector('#result') //assigns the html result element to an element to use in javascript
let currentShooterIndex = 202; //sytarting position of the shooter or player
let width = 15; //width of the board, used to prevent elements from overlapping or going across rows on the grid
let invadersID; //contains the interval for the game
let direction = 1; //sets the way the space invaders will be moving
let goingRight = true; //invaders begin the game going right
let aliensRemoved = []; //array that will contain which aliens have been already killed
let results = 0; //the amount of aliens that have been killed


for(let i = 0; i < 255; i++) { //runs a loop 255 times each loop:

    const square = document.createElement("div"); //creates a new <div> element //each square created is meant to be a square on the grid
    grid.appendChild(square); //appends the new <div> to the grid
}

const squares = Array.from(document.querySelectorAll('.grid div')); //an array that holds all the values of the <div> elements in the grid 

const alienInvaders = [ //a list of ordered zero numbers excluding certain numbers to be used for line 22 //numbers are excluded because only these squres of the grids will be space invaders from the beginning
    
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, //First row
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, //Second Row
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39 //Third Row
];

function draw() { //draws the invaders

    for(var i = 0; i < alienInvaders.length; i++) { //loop running 30 times

        if(!aliensRemoved.includes(i)) { //if the currently selected alien is not one of the aliens removed

            squares[alienInvaders[i]].classList.add('invader'); //Gives the class of invader to all of the squres numbered  in the alienInvaders constant //allows the space invaders to appear onto the grid
        }
    }
}

draw(); //runs the function to draw the space invaders onto the grid

function remove() { //removes the invaders

    for(var i = 0; i < alienInvaders.length; i++) { //loop running 30 times

        squares[alienInvaders[i]].classList.remove('invader'); //rremoves the class of the invader from all current invaders
    }
}

squares[currentShooterIndex].classList.add('shooter'); //assigns the shooter class to the starting square on the grid //allows the player character to appear

function moveShooter(e) { //e is event

    squares[currentShooterIndex].classList.remove('shooter'); //removes the shooter from its current position

    switch(e.key) { //detects key presses

        case "ArrowLeft" :
            
            if(currentShooterIndex % width !== 0) currentShooterIndex -= 1 //If the left arrow is pressed and the shooter is not on the leftmost block (195 % 15 === 0), the position of the shooter is moved back by one
            break
        case "ArrowRight" :

            if(currentShooterIndex % width < width - 1) currentShooterIndex += 1 //If the right arrow is pressed and the shooter is not on the rightmost block (209 % 15 === 14 === width - 1), the position of the shooter is moved forward by one
            break
    }

    squares[currentShooterIndex].classList.add('shooter'); //adds the shooter class to the new position
}

document.addEventListener("keydown", moveShooter); //pushes the move shooter function everytime a keypress is detected

function moveInvaders() {

    const leftEdge = alienInvaders[0] % width === 0; //The left edge is true when the (first alien invader) % 15 === 0, or when the leftmost alien touchest the left edge
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1; //The right edge is true when the (last alien invader) % 15 === 14, or when the rightmost alien touches the right edge

    remove(); //removes the invaders from current positions

    if(rightEdge && goingRight) { //if the invaders reach the right edge and are currently moving right

        for(let i = 0; i < alienInvaders.length; i++) { //runs a loop for every element in the alienInvaders array

            alienInvaders[i] += width + 1; //moves each invader by one row down
            direction = -1; //makes the invaders go left
        }

        goingRight = false; //sets the movement to be detected as going left
    }

    if(leftEdge && !goingRight) { //if the invaders reach the left edge and are currently moving not right (left)

        for(let i = 0; i < alienInvaders.length; i++) { //runs a loop for every element in the alienInvaders array

            alienInvaders[i] += width - 1; //moves each invader by one row down
            direction = 1; //makes the invaders go right
        }

        goingRight = true; //sets the movement to be detected as going right
    }

    for(let i = 0; i < alienInvaders.length; i++) { //runs a loop for every element in the alienInvaders array

        alienInvaders[i] += direction; //updates the position of each invader by the set direction
    }

    draw(); //repositions all invaders to their newly appended positions

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) { //if the tile of the player contains both the shooter and an invader

        resultsDisplay.innerHTML = 'Game Over'; //updates the text of the result element to display 'game over'
        clearInterval(invadersID); //stops the movement of the invaders
    }

    
    for(let i = 0; i < alienInvaders.length; i++) { //runs a loop for every element in the alienInvaders array

        if(alienInvaders[i] > squares.length) { //if the invaders reach the bottom of the screen (if one of the invaders surpasses the amount of tiles on the screen)

            resultsDisplay.innerHTML = 'Game Over'; //updates the text of the result element to display 'game over'
            clearInterval(invadersID); //stops the movement of the invaders
        }
    }
    
    if(aliensRemoved.length === alienInvaders.length) { //if all of the aliens have been removed

        resultsDisplay.innerHTML = 'You Win'; //updates the text of the result element to display 'You Win'
        clearInterval(invadersID); //stops the movement of the invaders
    }
}

invadersID = setInterval(moveInvaders, 300); //moves the invaders every 5 seconds //assigned to a variable so the interval can be cleared when needed

function shoot(e) {

    let laserID; //Holds the interval for the lasers
    let currentLaserIndex = currentShooterIndex; //the starting laser position is the shooter's position

    function moveLaser() { //moves the laser

        squares[currentLaserIndex].classList.remove('laser');  //removes the laser from its current position
        currentLaserIndex -= width; //moves the laser's position up by one row
        squares[currentLaserIndex].classList.add('laser'); //adds the laser to its new position

        if(squares[currentLaserIndex].classList.contains('invader')) { //If the laser and an invader are in the same position ...

            squares[currentLaserIndex].classList.remove('laser'); //deletes the laser from the grid
            squares[currentLaserIndex].classList.remove('invader'); //kills the invader
            squares[currentLaserIndex].classList.add('boom'); //adds an explosion effect to the current position of the laser

            setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300); //remove the explosion from the grid after 3 seconds 
            clearInterval(laserID); //stop the movement of the laser

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex); //the variable that holds the dead invader
            results++; //updates the results by one per killed invader
            resultsDisplay.innerHTML = results; //updates the results text on the screen to display the value of the results variable
            aliensRemoved.push(alienRemoved); //add the newly removed alien to the array of all removed aliens
        }
    }

    switch(e.key) {

        case 'ArrowUp' : //If the key pressed is the up arrow...
            
            laserID = setInterval(moveLaser, 100); //move the laser on an interval of 1 second per run of the function
    }
}

document.addEventListener('keydown', shoot); //runs shoot() everytime a key is pressed