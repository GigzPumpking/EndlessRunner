class Shark extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        this.parentScene = scene;
        this.moveSpeed = 2;
        this.moving = false;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);

        this.body.setBounce(1, 1).setCollideWorldBounds(true);
    }

    update() {
        if (keyLEFT.isDown) {
            this.x -= this.moveSpeed;
            if (this.moveSpeed < 10) this.moveSpeed += 0.1;
            if (this.rotation > -Math.PI/2) this.rotation -= 0.02;
            this.moving = true;
        } else if (keyRIGHT.isDown) {
            this.x += this.moveSpeed;
            if (this.moveSpeed < 10) this.moveSpeed += 0.1;

            if (this.rotation < Math.PI/2) this.rotation += 0.02;
            this.moving = true;
        }

        if (keyDOWN.isDown) {
            this.y += this.moveSpeed;
            if (this.moveSpeed < 10) this.moveSpeed += 0.1;
        } else if (keyUP.isDown) {
            this.y -= this.moveSpeed;
            if (this.moveSpeed < 10) this.moveSpeed += 0.1;
        }

        if (!keyLEFT.isDown && !keyRIGHT.isDown && !keyUP.isDown && !keyDOWN.isDown) this.moving = false;
        
        if (this.moving == false) {
            if (this.moveSpeed > 2) this.moveSpeed -= 0.1;
            for (let i = 0; i < 5; i++) {
                if (this.rotation < 0) this.rotation += 0.01;
                else if (this.rotation > 0) this.rotation -= 0.01;
            }
            
        }
 
    }
}
