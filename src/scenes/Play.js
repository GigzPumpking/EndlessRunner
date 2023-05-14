class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('ocean', './assets/ocean.png');
        this.load.image('shark', './assets/shark.png');
        this.load.image('fish1', './assets/fish1.png');
        this.load.image('orca', './assets/orca.png');
        this.load.atlas('orcaAtlas', './assets/orcasheet.png', './assets/orca.json');
    }

    create() {

        if (game.settings.audioPlaying == false) {
            let backgroundMusic = this.sound.add('backgroundmusic');
            backgroundMusic.loop = true;
            backgroundMusic.play();
            game.settings.audioPlaying = true;
        }

        this.ocean = this.add.tileSprite(0, 0, 576, 768, 'ocean').setOrigin(0, 0);

        shark = new Shark(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 150, 'shark').setOrigin(0.5, 0);
        shark.setScale(2);

        orca = this.physics.add.sprite(game.config.width + borderUISize*6, borderUISize*6, 'orcaAtlas', 'front')
            .setScale(2.5)
            .setAcceleration(300);
        orca.body
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setMaxSpeed(300);

        this.fishGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.timer = this.time.addEvent({delay: spawnFrequency*1000, callback: this.addFish(), callbackScope: this, loop: true });

        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNames('orcaAtlas', {
                prefix: 'move',
                start: 1,
                end: 3,
            }),
            defaultTextureKey: 'orcaAtlas',
            frameRate: 30,
            repeat: -1
        });

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
              top: 5,
              bottom: 5,
              left: 5,
              right: 5
            },
            fixedWidth: 130
        }

        const highScoreConfig = Object.assign({}, scoreConfig, { fixedWidth: 180, align: 'right' });

        this.scoreLeft = this.add.text(borderUISize + borderPadding - 40, borderUISize + borderPadding - 50, 'Score: '+ p1Score, scoreConfig);

        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*9, borderUISize + borderPadding - 50, 'High Score: '+ game.settings.highScore, highScoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
    }

    update() {
        this.physics.accelerateToObject(orca, shark, 100);
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(orca.x, orca.y, shark.x, shark.y);
        if (orca.rotation > angle) {
            orca.rotation -= 0.01;
        }
        else if (orca.rotation < angle) {
            orca.rotation += 0.01;
        }

        if (orca.x > shark.x) {
            orca.flipX = true;
        }
        else orca.flipX = false;
        orca.anims.play('walk', true);
        this.ocean.tilePositionY -= 4;
        this.scoreLeft.setText('Score: '+p1Score);

        if (this.gameOver) {
            this.scene.start("gameOverScene");
        }

        if (!this.gameOver) {               
            shark.update();
            this.physics.world.collide(shark, orca, this.orcaCollision, null, this);
        } 
    }

    addFish() {
        let speedVariance =  Phaser.Math.Between(4, 12);
        let fish = new Fish(this, 55, 18, 'fish1', 0, 10, speedVariance, shark).setOrigin(0, 0);
        this.fishGroup.add(fish);
    }

    orcaCollision() {
        //this.difficultyTimer.destroy();             // shut down timer
        this.sound.play('sharkChomp1', { volume: 0.25 }); // play death sound
        this.cameras.main.shake(2500, 0.0075);      // camera death shake
        
        // add tween to fade out audio
        this.tweens.add({
            targets: this.backgroundMusic,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });
       
        // kill paddle
        shark.destroy();    

        // switch states after timer expires
        this.time.delayedCall(4000, () => { this.gameOver = true });
    }
}