/*
Hung Nguyen

Sea Sprint

Around 25 hours taken

For my game, you can play as a shark that can move around the entire map, which is scrolling downwards.

The shark will rotate based on your movement and will also accelerate given that you are still moving.

For my Endless Runner, I chose the approach of you collecting points (eating fish) while avoiding a threat that is constantly chasing you.

I got the idea from the accelerateTo Phaser 3 example. I created an Orca, the natural predator of sharks, and I had it constantly accelerate towards the player.

It's fairly easy to dodge since it has a lot of "drift" (if I'm labeling it correctly).

If the Orca collides with the player, the player is eaten. Yes, this is a eat, or be eaten game.

Ironically, the scaling difficulty part of the game comes from you eating enough fish. Every 5 fish you eat, the Orca gets stronger.. somehow.

It grows slightly bigger and it can move slightly faster.

You just keep eating fish and hope that the Orca does not catch you.
*/

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

let centerX = game.config.width/2;
let centerY = game.config.height/2;

let keyLEFT, keyRIGHT, keyDOWN, keyUP, keyR;

const textSpacer = 64;

let p1Score = 0;