class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('shark', './assets/shark.png');
        this.load.image('fish1', './assets/fish1.png');
    }

    create() {
        if (game.settings.audioPlaying == false) {
            game.settings.audioPlaying = true;
        }

        this.shark = new Shark(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 150, 'shark').setOrigin(0.5, 0);
        this.shark.setScale(2.5);

        this.fish = new Fish(this, game.config.width + borderUISize*6, borderUISize*4, 'fish1', 0, 30, 4).setOrigin(0, 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
              left: 5,
              right: 5
            },
            fixedWidth: 200
        }

        const highScoreConfig = Object.assign({}, scoreConfig, { fixedWidth: 240, align: 'right' });

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 'Score: '+ this.p1Score, scoreConfig);

        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*16, borderUISize + borderPadding, 'High Score: '+ game.settings.highScore, highScoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
    }

    update() {
          // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.game.sound.stopAll();
            this.scene.start("menuScene");
        }

        if (!this.gameOver) {               
            this.shark.update();
            this.fish.update();
        } 
    }
}