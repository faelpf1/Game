import Menu from "../components/menu.js";

export default class LoadGameScene extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: 'LoadGameScene' });
    }

    preload() 
    {
        this.load.image('startGame', './assets/mainMenu/start.png');
        this.load.image('loadGame', './assets/mainMenu/load.png');
        this.load.image('selectionArrow', './assets/mainMenu/selectionArrow.png');
        this.load.image('tiles', './assets/tileMap/tileMapDungeon.png');
        this.load.spritesheet('characters', './assets/player/mainCharacter.png', { frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0 });
        this.load.spritesheet('enemies','assets/enemy/teste.png', { frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0 } );
        this.load.on('progress', (percent)=>{ console.log(percent*100) } );
        //this.load.on('complete', ()=>{ this.scene.start('BattleScene')});
        //this.load.on('complete', ()=>{ this.scene.start('DungeonScene'), this.scene.start('StageInfoScene')});
        
    }

    create()
    {
        let selectionButton = this.add.sprite(-1, -1, 'selectionArrow');
        selectionButton.setVisible(false);
        let startButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height/2, 'startGame').setDepth(1);
        let loadButton = this.add.image(this.game.renderer.width /2, this.game.renderer.height/2+100, 'loadGame').setDepth(1);
  
        startButton.setInteractive();
        startButton.on('pointerover', ()=>{
            selectionButton.setVisible(true);
            selectionButton.x = startButton.x - startButton.width;
            selectionButton.y = startButton.y;

        });
        startButton.on('pointerout', ()=>{
            selectionButton.setVisible(false);
        });
        startButton.on('pointerdown', ()=>{
            this.scene.start('DungeonScene');
            this.scene.start('StageInfoScene');
        });


        loadButton.setInteractive();  //testando battlescene
        loadButton.on('pointerover', ()=>{
            selectionButton.setVisible(true);
            selectionButton.x = loadButton.x - loadButton.width;
            selectionButton.y = loadButton.y;
        });
        loadButton.on('pointerout', ()=>{
            selectionButton.setVisible(false);
        });
        loadButton.on('pointerdown', ()=>{
            this.scene.start('BattleScene');
        });
        
    }
}

