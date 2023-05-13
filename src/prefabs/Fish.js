class Fish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        this.points = pointValue;
        this.moveSpeed = speed;
        this.randDirec = Math.floor(Math.random()*2)+1;
        scene.add.existing(this);
    }

    update() {
        if (this.randDirec == 1) {
            this.flipX = true;

            this.x -= this.moveSpeed;
        
            if (this.x <= this.moveSpeed) {
                this.x = game.config.width;
            }
        }
        if (this.randDirec == 2) {
            this.flipX = false;

            this.x += this.moveSpeed;

            if (this.x >= game.config.width) {
                this.x = 0;
            }
        }

    }

    reset() {
        this.randDirec = Math.floor(Math.random()*2)+1;
        if (this.randDirec == 1) {
            this.x = game.config.width;
            this.flipX = true;
        }
        if (this.randDirec == 2) {
            this.x = 0;
            this.flipX = false;
        }
    }
}
