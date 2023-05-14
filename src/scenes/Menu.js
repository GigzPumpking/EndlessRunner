class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('title', './assets/title.png');
        // load audio
        //hmmm101's pixel song #13
        this.load.audio('backgroundmusic', './assets/pixelsong.wav');
        //TheDragonsSpark "Nom Noise"
        this.load.audio('sharkChomp1', './assets/chomp.wav');
        //Ollie Bacon "Bite"
        this.load.audio('sharkChomp2', './assets/chomp2.wav');
        //Jofae "Bite"
        this.load.audio('sharkChomp3', './assets/chomp3.mp3');
        //Kenneth_Cooney "LevelUp"
        this.load.audio('levelup', './assets/levelup.wav');

      }
    create() {
        this.add.tileSprite(0, 0, 576, 768, 'title').setOrigin(0, 0);
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '75px',
            backgroundColor: '#ADD8E6',
            color: '#00008B',
            align: 'right',
            padding: {
                top: 15,
                bottom: 15,
                right: 15,
                left: 15
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 220, 'Sea Sprint', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '48px';
        menuConfig.color = '#FF0000';
        menuConfig.backgroundColor = '#FA8072';
        const playButton = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding - 60, 'PLAY', menuConfig).setOrigin(0.5).setInteractive();
        menuConfig.fontSize = '28px';
        menuConfig.fontFamily = 'Arial';
        this.add.text(game.config.width/2, game.config.height/2 - 10, 'Keyboard: Arrow Keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 65, 'EAT FISH! AVOID ORCA!', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        Ready = false;
        playButton.on('pointerdown', function (pointer)
        {
          Ready = true;
        });

        // define keys
    }
    update() {
        if (Ready == true) {
            this.scene.start('playScene');
        }
      }
}
