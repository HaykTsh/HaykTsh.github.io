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
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 800, "y": groundY },
                { "type": "enemy", "x": 900, "y": groundY - 50},
                { "type": "reward", "x": 500, "y": groundY - 50},
                { "type": "health", "x": 700, "y": groundY  - 50},
                //{ "type": "obstacle", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        // Saw

        function createSawBlade(x, y) {

            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            sawBladeHitZone.x = x;
            sawBladeHitZone.y = groundY - y;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);  
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        createSawBlade(200, 0);
        createSawBlade(400, 100);
        createSawBlade(500, 120);


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

        createEnemy(300, 50);
        createEnemy(600, 50);
        createEnemy(500, 50);

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

        createReward(400, 50);

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

        createHealth(800, 50);

        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
