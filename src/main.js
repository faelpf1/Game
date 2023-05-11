import Game from './scenes/game.js'
import LoadGame from './scenes/loadGame.js'

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'p2',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 150
            },
            debug: true
        }
    },
    scene: [
        LoadGame,
        Game
    ]
};

const game = new Phaser.Game(config);