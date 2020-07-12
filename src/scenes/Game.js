import Phaser, { Physics } from 'phaser';

class Game extends Phaser.Scene {

    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
    }

    preload(){

    }

    create(){
       this.ball = this.add.circle(400, 50, 10, 0xffffff, 1);
       this.physics.add.existing(this.ball)
       this.ball.body.setBounce(1, 1)

       this.ball.body.setCollideWorldBounds(true, 1, 1)

       this.ball.body.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200))

       this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
       this.physics.add.existing(this.paddleLeft, true)
       

       this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
       this.physics.add.existing(this.paddleRight, true)
       

       this.physics.add.collider(this.paddleLeft, this.ball)
       this.physics.add.collider(this.paddleRight, this.ball)

       this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(){
        /** @type { Phaser.Physics.Arcade.StaticBody } */
        const body = this.paddleLeft.body

        if (this.cursors.up.isDown){
            this.paddleLeft.y -= 10
            this.paddleLeft.body.updateFromGameObject()

        } else if(this.cursors.down.isDown){
            this.paddleLeft.y += 10
            this.paddleLeft.body.updateFromGameObject()
        }

        const diff = this.ball.y - this.paddleRight.y

        if (Math.abs(diff) < 10){
            return;
        }

        const aispeed = 5.5
        if (diff < 0) {
            this.paddleRightVelocity.y = -aispeed
            if (this.paddleRightVelocity.y < -10){
                this.paddleRightVelocity.y = -10
            } 
        } else if(diff > 0) {
                this.paddleRightVelocity.y = aispeed
                if (this.paddleRightVelocity.y > 10){
                    this.paddleRightVelocity.y = 10
            }
        }

        this.paddleRight.y += this.paddleRightVelocity.y
        this.paddleRight.body.updateFromGameObject()
    }
}

export default Game;