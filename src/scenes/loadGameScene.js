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

    }

    create()
    {
        let logo = this.add.image(this.game.renderer.width/2 , this.game.renderer.height/2 - 200, 'loadGameLogo');
        //let selectionButton = this.add.sprite(-1, -1, 'selectionArrow');
        // selectionButton.setVisible(false);
        // let startButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, 'startGame').setDepth(1);
        // let loadButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2 + 100, 'loadGame').setDepth(1);
        
       
    }
}