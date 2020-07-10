import Phaser from 'phaser';
import TitleScreen from './scenes/TitleScreen';

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)

game.scene.start('titlescreen')