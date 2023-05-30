import LoadGame from './scenes/loadGame.js';
import DungeonScene from './scenes/dungeonScene.js';

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
            debug: true
        }
    },
    scene: [LoadGame, DungeonScene],
};

const game = new Phaser.Game(config);