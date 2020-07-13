import Phaser from 'phaser'
import WebFontFile from './WebFontFile';

export default class GameOver extends Phaser.Scene{

    preload(){
        const fonts = new WebFontFile(this.load, 'Teko')
        this.load.addFile(fonts)
    }

    create(data){
        let titleText = 'Game Over'

        if (data.leftScore > data.rightScore){
            titleText = 'You win'
        }

        this.add.text(400, 200, titleText, {
            fontFamily: 'Teko',
            fontSize: 65
        })
        .setOrigin(0.5, 0.5)
    }
}