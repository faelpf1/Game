//import Game from './scenes/game.js';
//import LoadGame from './scenes/loadGame.js';
import DungeonScene from './scenes/dungeonScene.js';
import LoadGame from './scenes/loadGame.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'game-id',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: DungeonScene,
    //scene: LoadGame,
    // scene: [
    //     LoadGame,
    //     Game
    // ]
};

const game = new Phaser.Game(config);