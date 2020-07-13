import Phaser from 'phaser';
import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';
import GameBackground from './scenes/GameBackground';

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200},
            
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)
game.scene.add('game-background', GameBackground)


game.scene.start('game')