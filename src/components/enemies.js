export default class Enemies extends Phaser.GameObjects.Sprite
{
	constructor(scene, x, y, frameStart, frameEnd, flip)
	{
		super(scene, x, y, 'enemies');
		this
		this.anims.create({
			key: 'enemies_anims',
			frames: scene.anims.generateFrameNumbers('enemies', { start: frameStart, end: frameEnd }),
			frameRate: 5,
			repeat: -1,
		});
		this.flipX = flip;
		this.anims.play('enemies_anims');
	}
}