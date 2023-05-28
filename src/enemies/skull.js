export default class Skull extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'enemies')
		const anims = scene.anims

		this.anims.create({
			key: 'skull_anims',
			frames: anims.generateFrameNumbers('enemies', { start: 4, end: 7 }),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.play('skull_anims');
	}
}

Phaser.GameObjects.GameObjectFactory.register('skull', function (x, y) 
{
	const skull = new Skull(this.scene, x, y)
    this.displayList.add(skull)
    this.updateList.add(skull)
	skull.scaleX*=3;
	skull.scaleY*=3;
    return skull
})