import Phaser from 'phaser';
import WebFontFile from './WebFontFile';
import { Game } from '../consts/SceneKeys'

export default class TitleScreen extends Phaser.Scene {

    preload(){
        const fonts = new WebFontFile(this.load, 'Teko')
        this.load.addFile(fonts)
    }

    create(){
        const title = this.add.text(400, 200, 'Old School Tennis', { fontSize: 65, fontFamily: 'Teko'})
        title.setOrigin(0.5, 0.5)

        this.add.text(400, 300, 'Press "ENTER" key to start the game', { fontSize: 35, fontFamily: 'Teko'}).setOrigin(0.5)

        this.input.keyboard.once(`keydown-ENTER`, ()=>{
            this.scene.start(Game)
        })
    }
}