import Player from "./player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }
    preload() { }
    create() {
        
        //const map = this.make.tilemap({ key: "map" });



        //background
        //const backGround = this.add.image(0, 0, 'backGround');
        //backGround.setOrigin(0, 0);

        //platforms
        //const platforms = this.physics.add.staticGroup();
        //platforms.create(0, 600, 'plat1').setOrigin(0, 0).refreshBody();
        //platforms.create(128, 600, 'plat2').setOrigin(0, 0).refreshBody();
        //platforms.create(256, 600, 'plat3').setOrigin(0, 0).refreshBody();

        //player
        // this.player = new Player(this);
        //this.physics.add.collider(this.player.sprite, platforms);
        // this.teclas = this.input.keyboard.createCursorKeys();
        // this.tecla_A = this.input.keyboard.addKey('a');
    }
    update() {

        //player move
    //    const player = this.player.sprite;
    //     if (this.teclas.left.isDown) {
    //         player.setVelocityX(-160);
    //         player.setFlip(true, false);
    //         player.anims.play('left', 'true');
    //     } else if (this.teclas.right.isDown) {
    //         player.setVelocityX(160);
    //         player.setFlip(false, false);
    //         player.anims.play('right', 'true');
    //     } else {
    //         player.setVelocityX(0);
    //         player.anims.play('idle');
    //         if (player.body.touching.down) {
    //             player.anims.play('idle');
    //         }
    //     }

        //player attack
        // if (this.tecla_A.isDown) { //corrigir a colisão de queda da plataforma
        //     player.anims.play('attack');

        // }
    }

}