export default class Skull extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'skull')
		const anims = scene.anims

		this.anims.create({
			key: 'skull_anims',
			frames: anims.generateFrameNumbers('skull', { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.play('skull_anims');
	}
}

Phaser.GameObjects.GameObjectFactory.register('skull', function (x, y) {
	const skull = new Skull(this.scene, x, y)
    this.displayList.add(skull)
    this.updateList.add(skull)
    return skull
})