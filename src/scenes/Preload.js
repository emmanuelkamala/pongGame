import Phaser from 'phaser'

import { TitleScreen} from '../consts/SceneKeys'
import WebFontFile from './WebFontFile';

export default class Preload extends Phaser.Scene {

    preload(){
        const fonts = new WebFontFile(this.load, 'Teko')
        this.load.addFile(fonts)
    }

    create(){
        this.scene.start(TitleScreen)
    }
}