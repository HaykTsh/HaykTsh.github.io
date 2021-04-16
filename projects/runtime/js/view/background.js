var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        // var tree;
        var jesus;
        var buildings = [];

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#5E1914');
            var backgroundFill2 = draw.rect(canvasWidth,0,'black');
            background.addChild(backgroundFill2);
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            /*
            var moon = draw.bitmap('img/moon.png');
            moon.x = 100;
            moon.y = 100;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);
            */

            for (var i = 1; i < 101; i++) {
                var circle = draw.circle(10*Math.random() + 10,'maroon','black',4);
                circle.x = canvasWidth*Math.random();
                circle.y = groundY*Math.random() - 20;
                background.addChild(circle);
            }

            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for(var i=0;i<6;++i) {
                
                var bColor;
                if(i % 2 == 0) {

                    bColor = '#7C0A02';
                }
                else {

                    bColor = '#C21A09';
                }

                var buildingHeight = 200*Math.random() + 100;
                var building = draw.rect(50,buildingHeight, bColor,'black',2);
                building.x = 200*i + (Math.random()*150);
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            
            /*
            tree = draw.bitmap('img/tree.png');
            tree.x = canvasWidth - 1;
            tree.y = 65;
            background.addChild(tree);
            */

            jesus = draw.bitmap('img/jesus.png');
            jesus.x = canvasWidth - 1;
            jesus.y = groundY - 180;
            jesus.scaleX = 0.25;
            jesus.scaleY = 0.25;
            background.addChild(jesus);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            
            /*
            tree.x = tree.x - 20;

            if(tree.x < -200) {
                tree.x = canvasWidth;
            }
            */

            jesus.x = jesus.x - 10;

            if(jesus.x < -200) {
                jesus.x = canvasWidth;
            }

            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x -= 2;
                if(building.x < -60) {
                    building.x = canvas.width - 1;
                }
                
            }
            
            // TODO 5: Part 2 - Parallax
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
