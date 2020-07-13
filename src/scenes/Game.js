import Phaser, { physics } from 'phaser';

import WebFontFile from './WebFontFile';

import { GameBackground } from '../consts/SceneKeys'

import * as Colors from '../consts/Colors'

class Game extends Phaser.Scene {

    init(){
        this.paddleRightVelocity = new Phaser.Math.Vector2(0,0)
        this.leftScore = 0
        this.rightScore = 0
        this.paused = false
    }

    preload(){
        const fonts = new WebFontFile(this.load, 'Teko')
        this.load.addFile(fonts)
    }

    create(){

        this.scene.run(GameBackground)
        this.scene.sendToBack(GameBackground)

        this.physics.world.setBounds(-100, 0, 1000, 500)

       this.ball = this.add.circle(400, 50, 10, Colors.white, 1);
       this.physics.add.existing(this.ball)
       this.ball.body.setCircle(10)
       this.ball.body.setBounce(1, 1)

       this.ball.body.setCollideWorldBounds(true, 1, 1)

       this.paddleLeft = this.add.rectangle(50, 250, 30, 100, Colors.white, 1)
       this.physics.add.existing(this.paddleLeft, true)
    
    
       this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.white, 1)
       this.physics.add.existing(this.paddleRight, true)
       

       this.physics.add.collider(this.paddleLeft, this.ball)
       this.physics.add.collider(this.paddleRight, this.ball)

       const scoreStyle = {
           fontSize: 48,
           fontFamily: 'Teko'
       }

       this.leftScoreLabel = this.add.text(200, 85, '0', scoreStyle).setOrigin(0.5, 0.5)
       this.rightScoreLabel = this.add.text(600, 85, '0', scoreStyle).setOrigin(0.5, 0.5)

       this.cursors = this.input.keyboard.createCursorKeys()

       this.time.delayedCall(1500, () => {
            this.resetBall()
       })
    }

    update(){

        if (this.paused){
            return
        }
        
        this.processPlayerInput()

        this.updateAI()

        this.checkScore()

        
    }

    processPlayerInput(){
        /** @type { Phaser.Physics.Arcade.StaticBody } */
        const body = this.paddleLeft.body

        if (this.cursors.up.isDown){
            this.paddleLeft.y -= 10
            this.paddleLeft.body.updateFromGameObject()

        } else if(this.cursors.down.isDown){
            this.paddleLeft.y += 10
            this.paddleLeft.body.updateFromGameObject()
        }
    }

    updateAI(){
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

    checkScore(){

        const x = this.ball.x
        const leftBounds = -30
        const rightBounds = 830
        if (x >= leftBounds && x <= rightBounds){
            return
        }

        if (this.ball.x < leftBounds){
            this.incrementRightScore()
        } else if ( this.ball.x > rightBounds){
            this.incrementLeftScore()
        }

        const maxScore = 1
        if (this.leftScore >= maxScore){
            console.log('Player won')
            this.paused = true
        } else if (this.rightScore >= maxScore){
            console.log('computer won')
            this.paused = true
        }

        if (!this.paused){
            this.resetBall()
        } else {
            this.ball.active = false
            this.physics.world.remove(this.ball.body)
        }
    }

    incrementLeftScore(){
        this.leftScore += 1
        this.leftScoreLabel.text = this.leftScore
    }

    incrementRightScore(){
        this.rightScore += 1
        this.rightScoreLabel.text = this.rightScore
    }

    resetBall(){
        this.ball.setPosition(400, 50)
        const angle = Phaser.Math.Between(0, 360)
        const vec = this.physics.velocityFromAngle(angle, 200)
 
        this.ball.body.setVelocity(vec.x, vec.y)
    }
}

export default Game;