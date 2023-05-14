class Orca extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, size, shark) {
        super(scene, x, y, texture, frame, size, shark);

        //add object to existing scene
        this.parentScene = scene;
        this.shark = shark;
        this.randDirec = Math.floor(Math.random()*2)+1;
        this.parentScene.add.existing(this);
        this.parentScene.physics.add.existing(this);
        this.body.setBounce(1, 1).setCollideWorldBounds(true).setMaxSpeed(300);
        this.setScale(size);
    }

    update() {
        let angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.x, this.y, this.shark.x, this.shark.y);
        this.parentScene.physics.accelerateToObject(this, this.shark, 100);
        if (this.rotation > angle) {
            this.rotation -= 0.01;
        }
        else if (this.rotation < angle) {
            this.rotation += 0.01;
        }

        if (this.x > this.shark.x) {
            this.flipX = true;
        }
        else this.flipX = false;
    }

    reset() {
    }
}
