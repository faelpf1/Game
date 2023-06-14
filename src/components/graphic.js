export default class Graphic extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, {
            
			lineStyle: {width: 1, color:0xffffff},
            fillStyle: {color: 0x031f4c, alpha: 1} 
		});
        
        scene.add.existing(this);
    }
}
