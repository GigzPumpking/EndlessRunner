class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    preload() {
        this.load.image('gameover', './assets/GameOver.png');
    }

    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        let textConfig = {
            fontFamily: 'Georgia',
            fontSize: '40px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 15,
                bottom: 15,
                right: 15,
                left: 15
            },
            fixedWidth: 0
        }
        this.background = this.add.tileSprite(0, 0, 576, 768, 'gameover').setOrigin(0, 0);
        // check for high score in local storage
        // uncomment console.log statements if you need to debug local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(p1Score > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', p1Score.toString());
                highScore = p1Score;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            //console.log('No high score stored. Creating new.');
            highScore = p1Score;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 220, 'New Hi-Score!', textConfig).setOrigin(0.5);
        }
        this.add.text(centerX, centerY + textSpacer*3, `Ate ${p1Score} points worth of fish`, textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*4,`This browser's best: ${highScore}s`, textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*5, `Press R to Restart`, textConfig).setOrigin(0.5);
    }

    update() {
        // wait for UP input to restart game
        if (Phaser.Input.Keyboard.JustDown(keyR)) {

            // start next scene
            p1Score = 0;
            this.scene.start('playScene');
        }
    }
}
