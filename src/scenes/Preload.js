import Phaser from 'phaser';
import { TitleScreen} from '../consts/SceneKeys';
import WebFontFile from './WebFontFile';
import * as AudioKeys from '../consts/AudioKeys';

export default class Preload extends Phaser.Scene {
    preload(){
        const fonts = new WebFontFile(this.load, 'Teko');
        this.load.addFile(fonts);
        this.load.audio(AudioKeys.PongBeep, 'assets/ping_pong_8bit_beeep.mp3');
        this.load.audio(AudioKeys.PongPlop, 'assets/ping_pong_8bit_plop.mp3');
    };

    create(){
        this.scene.start(TitleScreen);
    };
};