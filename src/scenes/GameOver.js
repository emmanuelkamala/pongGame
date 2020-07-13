import Phaser from 'phaser'
import WebFontFile from './WebFontFile';

import { TitleScreen } from '../consts/SceneKeys'
import { Teko } from '../consts/Fonts'

export default class GameOver extends Phaser.Scene{

    preload(){
        const fonts = new WebFontFile(this.load, Teko)
        this.load.addFile(fonts)
    }

    create(data){
        let titleText = 'Game Over'

        if (data.leftScore > data.rightScore){
            titleText = 'You win'
        } else {
            titleText = 'Computer wins'
        }

        this.add.text(400, 200, titleText, {
            fontFamily: Teko,
            fontSize: 65
        })
        .setOrigin(0.5, 0.5)

        this.add.text(400, 300, 'Press "Enter" key to continue',  {
            fontFamily: Teko,
            fontSize: 40
        }).setOrigin(0.5, 0.5)

        this.input.keyboard.once('keydown-ENTER', () => {
            this.scene.start(TitleScreen)
        })
    }
}