let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 768,
    width: 576,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play, GameOver ]
}

// define game
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let Ready, playButton;
let timedEvent;

let shark = null;
let orca = null;

let spawnFrequency = 2;

let highScore = 0;
let newHighScore = false;
let audioPlaying = false;

let fishEaten = false;

let centerX = game.config.width/2;
let centerY = game.config.height/2;

let keyLEFT, keyRIGHT, keyDOWN, keyUP, keyR;

const textSpacer = 64;

let p1Score = 0;