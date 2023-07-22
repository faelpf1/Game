import MainMenuScene from './scenes/mainMenuScene.js';
import LoadGameScene from './scenes/loadGameScene.js';
import DungeonScene from './scenes/dungeonScene/dungeonScene.js';
import StageInfoScene from './scenes/dungeonScene/stageInfoScene.js';
import BattleScene from './scenes/battleScene/battleScene.js';
import getAxios from './components/getAxios.js';

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
    scene: [MainMenuScene, LoadGameScene, DungeonScene, StageInfoScene, BattleScene],
};

const game = new Phaser.Game(config);

const url = 'https://gameapirest.sistemamultimidia.repl.co/saveGameState/load/?stateId=A15J';

const x = await getAxios(url);
//console.log(x)