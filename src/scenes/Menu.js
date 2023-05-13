class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio

      }
    create() {
        let menuConfig = {
            fontFamily: 'Georgia',
            fontSize: '75px',
            backgroundColor: '#cf7bed',
            color: '#501bab',
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
        this.add.text(game.config.width/2, game.config.height/2, 'Keyboard: Arrow Keys to move', menuConfig).setOrigin(0.5);
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
            game.settings = {
              highScore: 0,
              audioPlaying: false
            }
            this.scene.start('playScene');
        }
      }
}
