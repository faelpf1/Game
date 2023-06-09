import LoadGameScene from './scenes/loadGameScene.js';
import DungeonScene from './scenes/dungeonScene/dungeonScene.js';
import StageInfoScene from './scenes/dungeonScene/stageInfoScene.js';

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
    scene: [LoadGameScene, DungeonScene, StageInfoScene],
};

const game = new Phaser.Game(config);