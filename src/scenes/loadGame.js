export default class LoadGame extends Phaser.Scene {
    constructor(){
        super({key: 'LoadGame'});
    }
      
    preload(){
        this.load.on('complete', ()=>{
            this.scene.start('Game');
        });

        //Adicionar os assets aqui
        this.load.image('backGround', 'assets/background/background.png');

        this.load.image('floor_sup_1', 'assets/background/tiles/1.png');
        this.load.image('floor_sup_2', 'assets/background/tiles/2.png');
        this.load.image('floor_sup_3', 'assets/background/tiles/3.png');
        this.load.image('floor_sup_4', 'assets/background/tiles/7.png');
        this.load.image('floor_sup_5', 'assets/background/tiles/11.png');
        this.load.image('floor_low_1', 'assets/background/tiles/4.png');
        this.load.image('floor_low_2', 'assets/background/tiles/5.png');
        this.load.image('floor_low_3', 'assets/background/tiles/6.png');
        this.load.image('floor_low_4', 'assets/background/tiles/8.png');
        this.load.image('floor_low_5', 'assets/background/tiles/9.png');
        this.load.image('floor_low_6', 'assets/background/tiles/10.png');
        this.load.image('floor_low_7', 'assets/background/tiles/12.png');
        this.load.image('floor_low_8', 'assets/background/tiles/16.png');

        this.load.image('plat1', 'assets/background/tiles/13.png');
        this.load.image('plat2', 'assets/background/tiles/14.png');
        this.load.image('plat3', 'assets/background/tiles/15.png');
        
        this.load.image('water_sup', 'assets/background/tiles/17.png');
        this.load.image('water_low', 'assets/background/tiles/18.png');

        this.load.multiatlas('p_idle', 'assets/player/p_idle.json', 'assets/player');
        this.load.multiatlas('p_run', 'assets/player/p_run.json', 'assets/player');
        this.load.multiatlas('p_jump', 'assets/player/p_jump.json', 'assets/player');
        this.load.multiatlas('p_attack', 'assets/player/p_attack.json', 'assets/player');
    }

    create(){}

    update(){}

}