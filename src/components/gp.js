export default class Gp extends Phaser.GameObjects.Graphics {
    constructor(scene, options) {
        super(scene, options);

        scene.add.existing(this);
    }


    // preUpdate(time, delta) {}
}