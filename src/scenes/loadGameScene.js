import getAxios from "../components/getAxios.js";

export default class LoadGameScene extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: 'LoadGameScene' });
    }

    preload() 
    {
        this.load.image('loadGameLogo', './assets/loadGame/loadgame.png');
        this.load.html('loadGameForm', './assets/loadGame/loadGameForm.html');
    }

    create()
    {
        let logo = this.add.image(this.game.renderer.width/2 , this.game.renderer.height/2 - 200, 'loadGameLogo');

        const element = this.add.dom(400, 200).createFromCache('loadGameForm');
        element.addListener('click');
        var gameThis = this;

        element.on('click', async function (event)
        {

            if (event.target.name === 'loadGameButton')
            {
                const inputText = this.getChildByName('loadGameField');

                if (inputText.value !== '')
                {
                    const url = `https://gameapirest.sistemamultimidia.repl.co/saveGameState/load/?stateId=${inputText.value}`;
                    const loadInfo = await getAxios(url);
                    gameThis.registry.set('stageInfoLoad', loadInfo);
                    gameThis.scene.start('DungeonScene');
                    gameThis.scene.start('StageInfoScene');
                }
            }
        });   
    }
}