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
        this.scale = 1;
        this.accel = 100;
        this.maxSpeed = 200;

        this.ocean = this.add.tileSprite(0, 0, 576, 768, 'ocean').setOrigin(0, 0);

        shark = new Shark(this, game.config.width/2, game.config.height - borderUISize - borderPadding - 150, 'shark').setOrigin(0.5, 0);
        shark.setScale(1.5);

        orca = this.physics.add.sprite(game.config.width + borderUISize*6, borderUISize*6, 'orcaAtlas', 'orca1')
            .setScale(this.scale)
            .setAcceleration(this.accel);
        orca.body
            .setBounce(1, 1)
            .setCollideWorldBounds(true)
            .setMaxSpeed(150);

        this.fishGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        this.timer = this.time.addEvent({delay: spawnFrequency*1000, callback: this.addFish(), callbackScope: this, loop: true });

        this.anims.create({
            key: 'orca',
            frames: this.anims.generateFrameNames('orcaAtlas', {
                prefix: 'orca',
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
            fixedWidth: 140
        }

        const highScoreConfig = Object.assign({}, scoreConfig, { fixedWidth: 180, align: 'left' });

        this.scoreLeft = this.add.text(borderUISize + borderPadding - 40, borderUISize + borderPadding - 50, 'Score: '+ p1Score, scoreConfig);

        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding*9, borderUISize + borderPadding - 50, 'High Score: '+ highScore, highScoreConfig);
        
        // GAME OVER flag
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
    }

    update() {
        if (fishEaten == true) {
            this.orcaGreat();
            fishEaten = false;
        }
        orca.scale = this.scale;
        orca.accel = this.accel;
        orca.body.setMaxSpeed(this.maxSpeed);
        if (audioPlaying == false) {
            let backgroundMusic = this.sound.add('backgroundmusic');
            backgroundMusic.loop = true;
            backgroundMusic.play();
            audioPlaying = true;
        }
        this.physics.accelerateToObject(orca, shark, 100);
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(orca.x, orca.y, shark.x, shark.y);
        if (orca.rotation > angle && angle > -Math.PI/2) {
            orca.rotation -= 0.01;
        }
        else if (orca.rotation < angle && angle < Math.PI/2) {
            orca.rotation += 0.01;
        }

        if (orca.x > shark.x) {
            orca.flipX = true;
        }
        else orca.flipX = false;
        orca.anims.play('orca', true);
        this.ocean.tilePositionY -= 4;
        this.scoreLeft.setText('Score: '+p1Score);

        if (this.gameOver) {
            this.game.sound.stopAll();
            audioPlaying = false;
            this.scene.start("gameOverScene");
        }

        if (!this.gameOver) {               
            shark.update();
            this.physics.world.collide(shark, orca, this.orcaCollision, null, this);
        } 
    }

    orcaGreat() {
        if(p1Score % 50 == 0) {
            this.sound.play('levelup', { volume: 0.5 });  
            if(this.accel < 300) { 
                this.accel += 5; 
            }
            if(this.maxSpeed < 600) {
                this.maxSpeed += 10;
            }
            if(this.scale < 3) {
                this.scale += 0.1;
            }

            // cam shake: .shake( [duration] [, intensity] )
            this.cameras.main.shake(100, 0.01);
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