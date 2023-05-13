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
    scene: [ Menu, Play ]
}

// define game
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let Ready, playButton;
let timedEvent;

let keyLEFT, keyRIGHT;