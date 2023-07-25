import Menu from "../components/menu.js";

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
        var scene = this.scene;

        element.on('click', function (event)
        {

            if (event.target.name === 'loadGameButton')
            {
                const inputText = this.getChildByName('loadGameField');

                //  Have they entered anything?
                if (inputText.value !== '')
                {
                    scene.start('DungeonScene');
                    scene.start('StageInfoScene');
       
                    //import post axios here
    
                }
            }

        });   
    }
}