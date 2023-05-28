export default class Skeleton extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'skeleton')
	}
}

Phaser.GameObjects.GameObjectFactory.register('skeleton', function (x, y) {
	const skeleton = new Skeleton(this.scene, x, y)
    this.displayList.add(skeleton)
    this.updateList.add(skeleton)
    return skeleton
})