export default class LoadGame extends Phaser.Scene {
    constructor(){
        super({key: 'LoadGame'});
    }
      
    preload(){
        // this.load.on('complete', ()=>{
        //     this.scene.start('Game');
        // });

        //this.load.image('tiles', 'assets/background/tileMap/0x72_16x16DungeonTileset.v5.png');
        //this.load.tilemapCSV('map', 'assets/background/tileMap/map.csv');
        //this.load.tilemapTiledJSON('map', 'assets/background/tileMap/map.json');

    }

    create(){
        // const level = [
        //     [  16,   0,   0,   0,   0,   0,   0,   0,   0,   0,   18 ],
        //     [  48,   32,   32,   33,   32,   32,   32,   32,   32,   32,   50],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  80,   5,   5,   5,   5,   5,   5,   5,   5,   5,   82 ],
        //     [  112,   32,   32,   33,   32,   32,   32,   32,   32,   32,   114 ],
            
        //   ];

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('0x72_16x16DungeonTileset.v5', 'tiles');

        const belowLayer = map.createLayer('Bellow Player', tileset, 0, 0);
        //const worldLayer = map.createLayer('World"', tileset, 0, 0);
        //const aboveLayer = map.createLayer('Abobe Player', tileset, 0, 0);


    }

    update(){}

}