export default class Skeleton extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'enemies');
		const anims = scene.anims

		this.anims.create({
			key: 'skeleton_anims',
			frames: anims.generateFrameNumbers('enemies', { start: 0, end: 3 }),
			frameRate: 5,
			repeat: -1,
		});

		this.anims.play('skeleton_anims');


	}
}

Phaser.GameObjects.GameObjectFactory.register('skeleton', function (x, y) 
{
	const skeleton = new Skeleton(this.scene, x, y);
    this.displayList.add(skeleton);
    this.updateList.add(skeleton);
	skeleton.scaleX*=3;
	skeleton.scaleY*=3;
    return skeleton;
})