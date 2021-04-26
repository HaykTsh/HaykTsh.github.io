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

           ]
       };

       var xS = 1;
       var typeRand = 1;
       var obstacleHeight = 1;

        for(var i = 0; i <= 30; i++) {

            if(i < 30) {
                xS = 500 + (i * 150);
                typeRand = Math.random() * 3;

                if (typeRand > 2) {

                    obstacleHeight = Math.random() * 2;

                    if (obstacleHeight > 1) {

                        levelData.gameItems[i] = { "type": "obstacle", "x": xS, "y": 110};
                    }
                    else {

                        levelData.gameItems[i] = { "type": "obstacle", "x": xS, "y": 0};
                    }
                }
                else if (typeRand > 1) {

                    levelData.gameItems[i] = { "type": "enemy", "x": xS, "y": 50};
                }
                else if (typeRand > 0.5) {

                    levelData.gameItems[i] = { "type": "reward", "x": xS, "y": 90};
                }
                else {

                    levelData.gameItems[i] = { "type": "health", "x": xS, "y": 90};
                }
            }
            
            else {

                createBoss(xS + 200, 50, 90);
                createBoss(xS + 400, 50, 90);
                createBoss(xS + 600, 50, 90);
            }
        }
 
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
 
       var obstacleImage;
       var imageRand;

       function createObstacle(x, y) {
 
           var hitZoneSize = 25;
           var damageFromObstacle = 20;
           var obstacleHitZone= game.createObstacle(hitZoneSize, damageFromObstacle);
 
           obstacleHitZone.x = x;
           obstacleHitZone.y = groundY - y;
           game.addGameItem(obstacleHitZone);

           imageRand = Math.random()*3;

           if(imageRand > 2) {
           
                obstacleImage = draw.bitmap('img/Soul.png');
                obstacleImage.scaleX = 1.4;
                obstacleImage.scaleY = 1.4;
                obstacleImage.x = -100;
                obstacleImage.y = -88;
           }
           else if(imageRand > 1){

                obstacleImage = draw.bitmap('img/Pain.png');
                obstacleImage.scaleX = 0.9;
                obstacleImage.scaleY = 0.9;
                obstacleImage.x = -69;
                obstacleImage.y = -60;
           }
           else{

                obstacleImage = draw.bitmap('img/Caco.png');
                obstacleImage.scaleX = 0.9;
                obstacleImage.scaleY = 0.9;
                obstacleImage.x = -69;
                obstacleImage.y = -60;
           }

           obstacleHitZone.addChild(obstacleImage); 
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

       //createSawBlade(500, 120);
 
 
       // Enemy

       var enemySprite;
       var enemyRand;
 
       function createEnemy(x, y) {
 
           // Create Enemy and Sprite
           var enemy = game.createGameItem('enemy',25);

            enemyRand = Math.random() * 5;

            if(enemyRand > 4) {

                enemySprite = draw.bitmap('img/Zombie.png');
                enemySprite.scaleX = 1.5;
                enemySprite.scaleY = 1.5;
                enemySprite.x = -105;
                enemySprite.y = -85;
            }
            else if(enemyRand > 3) {

                enemySprite = draw.bitmap('img/Rev.png');
                enemySprite.scaleX = 1.5;
                enemySprite.scaleY = 1.5;
                enemySprite.x = -110;
                enemySprite.y = -97;
            }
            else if(enemyRand > 2) {

                enemySprite = draw.bitmap('img/Pinky.png');
                enemySprite.scaleX = 1.5;
                enemySprite.scaleY = 1.5;
                enemySprite.x = -105;
                enemySprite.y = -85;
            }
            else if(enemyRand > 1) {

                enemySprite = draw.bitmap('img/Imp.png');
                enemySprite.scaleX = 1.5;
                enemySprite.scaleY = 1.5;
                enemySprite.x = -115;
                enemySprite.y = -85;
            }
            else{

                enemySprite = draw.bitmap('img/Baron.png');
                enemySprite.scaleX = 1.5;
                enemySprite.scaleY = 1.5;
                enemySprite.x = -120;
                enemySprite.y = -85;
            }
 
           enemy.addChild(enemySprite);
          
           // Pos
           enemy.x = x;
           enemy.y = groundY - y;
          
           game.addGameItem(enemy);
 
           // Movement
           enemy.velocityX = -2;
 
           // Player and Projectile Collision
           enemy.onPlayerCollision = function() {
 
               game.changeIntegrity(-30);
           };
 
           enemy.onProjectileCollision = function() {
 
               game.increaseScore(100);
               enemy.fadeOut();
           }
       }

    
        var bossSprite;
        //var bossHealth = 3;
 
        function createBoss(x, y, bossHealth) {
 
            // Create Boss and Sprite
            var boss = game.createGameItem('boss', 40);
            var hits = 0;

            bossSprite = draw.bitmap('img/Cyber.png');
            bossSprite.scaleX = 1.5;
            bossSprite.scaleY = 1.5;
            bossSprite.x = -110;
            bossSprite.y = -120;
 
            boss.addChild(bossSprite);
          
            // Pos
            boss.x = x;
            boss.y = groundY - y;
          
            game.addGameItem(boss);
 
            // Movement
            boss.velocityX = -2;

            
 
            // Player and Projectile Collision
            boss.onPlayerCollision = function() {
               boss.shrink(); 
               game.changeIntegrity(-50);
            };
 
            boss.onProjectileCollision = function() {
 
                if(bossHealth === 0) {
                    game.increaseScore(1000);
                    boss.shrink();
                }
                else{
                    hits = hits + 1;
                    game.increaseScore(500);
                    boss.flyTo(boss.x - 10, groundY - 50);
                    createBoss(boss.x, 50, bossHealth - hits);
                }
            }
        }


        
 
       //Score Reward
 
       function createReward(x, y) {
 
           //Creation
           var reward = game.createGameItem('reward', 10);
           var box = draw.bitmap('img/Reward.png');
           box.x = -20;
           box.y = 20;
           box.scaleX = .8;
           box.scaleY = .8;
 
           reward.addChild(box);
          
           //Pos
           reward.x = x;
           reward.y = groundY- y;
 
           game.addGameItem(reward);
 
           //Movement
           reward.velocityX = -2;

           //Score
           reward.onPlayerCollision = function() {
 
               game.increaseScore(500);
               reward.fadeOut();
           };
       }


       
 
       //Health
 
       function createHealth(x, y) {
 
           //Creation
           var health = game.createGameItem('health', 10);
           var armor = draw.bitmap('img/Health.png');
           armor.x = -30;
           armor.y = 20;
           armor.scaleX = 1.3;
           armor.scaleY = 1.3;
 
           health.addChild(armor);
          
           //Pos
           health.x = x;
           health.y = groundY- y;
 
           game.addGameItem(health);
 
           //Movement
           health.velocityX = -2;
 
           //Health
           health.onPlayerCollision = function() {
 
               game.changeIntegrity(10);
               health.fadeOut();
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
 
