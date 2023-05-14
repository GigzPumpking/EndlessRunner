class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, fishWidth, fishHeight, texture, frame, pointValue, speed, shark) {
        super(scene, Phaser.Math.Between(fishWidth/2, game.config.width - fishWidth/2), 0, texture, frame, shark);

        //add object to existing scene
        this.shark = shark;
        this.height = fishHeight;
        this.width = fishWidth;
        this.parentScene = scene;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);          // make it go!
        this.points = pointValue;
        this.moveSpeed = speed;
        this.randDirec = Phaser.Math.Between(0, 1);
        this.newFish = true; 
        this.rotation = Math.PI/2;
    }

    eaten() {
        p1Score += this.points;
        let randSfx = Phaser.Math.Between(1, 3);
        this.parentScene.sound.play('sharkChomp'+randSfx, { volume: 0.25 });
        this.destroy();
    }

    update() {
        if(this.newFish && this.y > centerY) {
            // (recursively) call parent scene method from this context
            this.parentScene.addFish(this.parent, this.speed);
            this.newFish = false;
        }

        this.y += this.moveSpeed;

        if (this.randDirec == 1) {
            this.flipX = true;
            if (this.rotation < Math.PI) {
                this.rotation += 0.01;
            }
        }
        else {
            this.flipX = false;
            if (this.rotation < Math.PI) {
                this.rotation += 0.01;
            }
        }

        if(this.y > game.config.height) {
            this.destroy();
        }

        if (this.x <= this.shark.x + this.shark.width && this.x >= this.shark.x-this.shark.width && this.y <= this.shark.y + this.shark.height && this.y >= this.shark.y-this.shark.height) {
            this.eaten();
        }

    }
}
