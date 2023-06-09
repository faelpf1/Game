import Enemies from "../components/enemies.js";

export default Phaser.GameObjects.GameObjectFactory.register('skeleton', function (x, y) 
{
	const frameStart = 0;
	const frameEnd = 3;
	const skeleton = new Enemies(this.scene, x, y, frameStart, frameEnd);
    this.displayList.add(skeleton);
    this.updateList.add(skeleton);
	skeleton.setScale(3);
    return skeleton;
})