export default class LoadGame extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: 'LoadGame' });
    }

    preload() 
    {
        this.load.image('tiles', './assets/tileMap/tileMapDungeon.png');
        this.load.spritesheet('characters', './assets/player/charTMP.png', { frameWidth: 64, frameHeight: 64, margin: 1, spacing: 2 });
        this.load.spritesheet('enemies','assets/enemy/teste.png', { frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0 } );
        this.load.on('complete', ()=>{ this.scene.start('DungeonScene') });
    }
}