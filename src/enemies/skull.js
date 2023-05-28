export default class Skull extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y)
	{
		super(scene, x, y, 'skull')
	}
}

Phaser.GameObjects.GameObjectFactory.register('skull', function (x, y) {
	const skull = new Skull(this.scene, x, y)
    this.displayList.add(skull)
    this.updateList.add(skull)
    return skull
})