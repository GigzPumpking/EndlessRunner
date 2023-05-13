class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        this.moveSpeed = 2;
        this.moving = false;
        scene.add.existing(this);
    }

    update() {
        if (keyLEFT.isDown && this.x >= borderUISize + this.width/2) {
            this.x -= this.moveSpeed;
            if (this.moveSpeed < 10) {
                this.moveSpeed += 0.1;
            }
            this.moving = true;
        } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width/2) {
            this.x += this.moveSpeed;
            if (this.moveSpeed < 10) {
                this.moveSpeed += 0.1;
            }
            this.moving = true;
        }
        else {
            this.moving = false;
        }
        
        if (this.moving == false) {
            this.moveSpeed = 2;
        }
 
    }
}
