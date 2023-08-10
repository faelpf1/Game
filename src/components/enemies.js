const Direction = {
	Up:0,
	Down:1,
	Left:2,
	Right:3
}

const randomDirection = (exclude) => {
	let newDirection = Phaser.Math.Between(0, 3);
	while (newDirection === exclude) {
		newDirection = Phaser.Math.Between(0, 3);
	}
	return newDirection;
}

const randomEnemis = () => {
	const enemis = {
		0: {
			frameStart: 4,
			frameEnd: 7
		},
		1: {
			frameStart: 0,
			frameEnd: 3
		}
	}
	return enemis[Phaser.Math.Between(0, 1)];
}

class Enemies extends Phaser.Physics.Arcade.Sprite
{
	#dir = Direction.Right;
	constructor(scene, x, y, flip)
	{
		super(scene, x, y, 'enemies');
		const randomE = randomEnemis();
		this.anims.create({
			key: 'enemies_anim',
			frames: scene.anims.generateFrameNumbers('enemies', { start: randomE.frameStart, end: randomE.frameEnd}),
			frameRate: 5,
			repeat: -1,
		});
		this.setScale(4);
		this.flipX = flip;
		this.anims?.play('enemies_anim');
		scene.physics.world.on(Phaser.Physics.Arcade.Events.TILE_COLLIDE, this.handleCollision, this);
		this.moveEvent = scene.time.addEvent({
			delay: 2000,
			callback: () => {
				this.#dir = randomDirection(this.#dir);
			},
			loop: true
		});
	}


	handleCollision(go, tile) {
		if (go !== this) {
			return;
		}
		this.#dir = randomDirection(this.#dir);
	}

	destroy(fromScene) {
		this.moveEvent.destroy();
		super.destroy(fromScene);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		const speed = 50;

		switch(this.#dir) {
			case Direction.Up:
				this.body?.setVelocity(0, -speed);
				break;
			case Direction.Down:
				this.body?.setVelocity(0, speed);
				break;
			case Direction.Left:
				this.body?.setVelocity(-speed, 0);
				break;
			case Direction.Right:
				this.body?.setVelocity(speed, 0);
				break;
		}
	}
}

export default Enemies;