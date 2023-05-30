import Enemies from "./enemies.js";

export default Phaser.GameObjects.GameObjectFactory.register('skull', function (x, y) 
{
	const frameStart = 4;
	const frameEnd = 7;
	const skull = new Enemies(this.scene, x, y, frameStart, frameEnd);
    this.displayList.add(skull);
    this.updateList.add(skull);
	skull.setScale(3);
    return skull;
})