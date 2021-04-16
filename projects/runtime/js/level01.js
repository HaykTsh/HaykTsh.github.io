var level01 = function (window) {
 
   window.opspark = window.opspark || {};
 
   var draw = window.opspark.draw;
   var createjs = window.createjs;
 
   window.opspark.runLevelInGame = function(game) {
       // some useful constants
       var groundY = game.groundY;
 
       // this data will allow us to define all of the
       // behavior of our game
       var levelData = {
           "name": "Robot Romp",
           "number": 1,
           "speed": -3,
           "gameItems": [
               { "type": "obstacle", "x": 1000, "y": 0 },
               { "type": "obstacle", "x": 600, "y": 0 },
               { "type": "obstacle", "x": 800, "y": 0 },
               { "type": "enemy", "x": 900, "y":  50},
               { "type": "reward", "x": 500, "y": 50},
               { "type": "health", "x": 700, "y": 50}
           ]
       };
 
        var obj;
        var objX;
        var objY;
        var objType;

       for (var i = 0; i < levelData.gameItems.length; i++) {
 
            obj = levelData.gameItems[i];
            objX = obj.x;
            objY = obj.y;
            objType = obj.type;

            if (objType === 'obstacle') {

                createObstacle(objX, objY);
            }
            else if (objType === 'enemy') {

                createEnemy(objX, objY);
            }
            else if (objType === 'reward') {

                createReward(objX, objY);
            }
            else{

                createHealth(objX, objY);
            }
       }
 
       window.levelData = levelData;
       // set this to true or false depending on if you want to see hitzones
       game.setDebugMode(false);
 
       // TODO 6 and on go here
       // BEGIN EDITING YOUR CODE HERE
 
       // Lost Souls // Cacodmeon // Pain Elemental
 
       function createObstacle(x, y) {
 
           var hitZoneSize = 25;
           var damageFromObstacle = 10;
           var obstacleHitZone= game.createObstacle(hitZoneSize, damageFromObstacle);
 
           obstacleHitZone.x = x;
           obstacleHitZone.y = groundY - y;
           game.addGameItem(obstacleHitZone);

           var obstacleImage;
           if (y === 0) {
           
                obstacleImage = draw.bitmap('img/fire.png');
                obstacleImage.scaleX = 0.4;
                obstacleImage.scaleY = 0.3;
           }
           else {

                obstacleImage = draw.bitmap('img/');
           }

           obstacleHitZone.addChild(obstacleImage); 
           obstacleImage.x = -54;
           obstacleImage.y = -50;
       }


       //function createSawBlade(x, y) {
 
       //    var hitZoneSize = 25;
       //    var damageFromObstacle = 10;
       //    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
 
       //    sawBladeHitZone.x = x;
       //    sawBladeHitZone.y = groundY - y;
       //    game.addGameItem(sawBladeHitZone);
 
       //    var obstacleImage = draw.bitmap('img/sawblade.png');
       //    sawBladeHitZone.addChild(obstacleImage); 
       //    obstacleImage.x = -25;
       //    obstacleImage.y = -25;
       //}

 
       //Imp
       function createImp(x, y) {
 
           var hitZone = 25;
           var damage = 10;
           var impZone = game.createObstacle(hitZone, damage);
 
           impZone.x = x;
           impZone.y = groundY - y;
           game.addGameItem(impZone);
 
           var impImage = draw.bitmap('img/sawblade.png');
           impZone.addChild(impImage); 
           impImage.x = -25;
           impImage.y = -25;
       }
 

       //createSawBlade(500, 120);
 
 
       // Enemy
 
       function createEnemy(x, y) {
 
           // Create Enemy and Sprite
           var enemy = game.createGameItem('enemy',25);
           var redSquare = draw.rect(50,50,'red');
           redSquare.x = -25;
           redSquare.y = -25;
 
           enemy.addChild(redSquare);
          
           // Pos
           enemy.x = x;
           enemy.y = groundY - y;
          
           game.addGameItem(enemy);
 
           // Movement
           enemy.velocityX = -1;
           enemy.rotationalVelocity = 10;
 
           // Player and Projectile Collision
           enemy.onPlayerCollision = function() {
 
               game.changeIntegrity(-10);
           };
 
           enemy.onProjectileCollision = function() {
 
               game.increaseScore(100);
               enemy.fadeOut();
           }
       }

 
       //Score Reward
 
       function createReward(x, y) {
 
           //Creation
           var reward = game.createGameItem('reward', 10);
           var prayer = draw.circle(10, 'blue');
           //prayer.x = -10;
           //prayer.y = -10;
 
           reward.addChild(prayer);
          
           //Pos
           reward.x = x;
           reward.y = groundY- y;
 
           game.addGameItem(reward);
 
           //Movement
           reward.velocityX = -1;
 
           //Score
           reward.onPlayerCollision = function() {
 
               game.increaseScore(100);
               reward.fadeOut();
           };
       }
 
 
       //Health
 
       function createHealth(x, y) {
 
           //Creation
           var health = game.createGameItem('reward', 10);
           var angel = draw.circle(10, 'green');
 
           health.addChild(angel);
          
           //Pos
           health.x = x;
           health.y = groundY- y;
 
           game.addGameItem(health);
 
           //Movement
           health.velocityX = -1;
 
           //Health
           health.onPlayerCollision = function() {
 
               game.changeIntegrity(25);
               reward.fadeOut();
           };
       }

 
       // DO NOT EDIT CODE BELOW HERE
   }
};
 
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
   (typeof process.versions.node !== 'undefined')) {
   // here, export any references you need for tests //
   module.exports = level01;
}
 
