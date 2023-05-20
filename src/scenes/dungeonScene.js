import Player from "./player.js";
import TILES from "./tile-mapping.js";

export default class DungeonScene extends Phaser.Scene {
	constructor() {
		super();
		this.level = 0;
	}

	preload() {
		this.load.image('tiles', 'assets/tileMap/tileMapDungeon.png');
		this.load.spritesheet("characters", "assets/player/charTMP.png", { frameWidth: 64, frameHeight: 64, margin: 1, spacing: 2 });
	}

	create() {
		this.dungeon = new Dungeon({
			width: 50,
			height: 50,
			doorPadding: 2, /* Doors should be at least 2 tiles away from corners, so that we can place a corner tile on either side of the door location */
			rooms: {
				width: { min: 7, max: 15, onlyOdd: true }, /* Rooms should only have odd number dimensions so that they have a center tile. */
				height: { min: 7, max: 15, onlyOdd: true },
			},
		});

		//this.dungeon.drawToConsole();

		const map = this.make.tilemap({ tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height });
		const tileset = map.addTilesetImage("tiles", null, 48, 48, 0, 0);  /* tile height and tile width, tile margin, tile spacing */
		this.groundLayer = map.createBlankLayer("Ground", tileset).fill(TILES.BLANK);
		this.stuffLayer = map.createBlankLayer("Stuff", tileset);

		// Use the array of rooms generated to place tiles in the map
		// Note: using an arrow function here so that "this" still refers to our scene
		this.dungeon.rooms.forEach((room) => {
			const { x, y, width, height, left, right, top, bottom } = room;

			/* Fill the floor with mostly clean tiles */
			this.groundLayer.weightedRandomize(TILES.FLOOR, x , y +1 , width -2 , height -2 );

			/* Place the room corners tiles */
			this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT_UP, left, top -1);
			this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT_DOWN, left , top);
			this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT_UP, right-2, top -1);
			this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT_DOWN, right-2, top);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_UP, left, bottom-2);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_DOWN, left, bottom-1);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_UP, right-2, bottom-2);
			this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_DOWN, right-2, bottom-1);
			

			/* Fill the walls with mostly clean tiles */
			//this.groundLayer.weightedRandomize(TILES.WALL.TOP, left + 1, top, width - 2, 1);
			//this.groundLayer.weightedRandomize(TILES.WALL.BOTTOM, left + 1, bottom, width - 2, 1);
			//this.groundLayer.weightedRandomize(TILES.WALL.LEFT, left, top + 1, 1, height - 2);
			//this.groundLayer.weightedRandomize(TILES.WALL.RIGHT, right, top + 1, 1, height - 2);

			// Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
			// room's location. Each direction has a different door to tile mapping.
			const doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
			// for (let i = 0; i < doors.length; i++) {
			// 	if (doors[i].y === 0) {
			// 		this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
			// 	} else if (doors[i].y === room.height - 1) {
			// 		this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
			// 	} else if (doors[i].x === 0) {
			// 		this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
			// 	} else if (doors[i].x === room.width - 1) {
			// 		this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
			// 	}
			// }
		});

		this.groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]); /* Not exactly correct for the tileset since there are more possible floor tiles, but this will do for the example. */

		this.player = new Player(this, map.widthInPixels / 2, map.heightInPixels / 2); /* Place the player in the center of the map */

		this.physics.add.collider(this.player.sprite, this.groundLayer); /* Watch the player and ground layer for collisions, for the duration of the scene: */

		const camera = this.cameras.main; /* Acess default phaer default camera */ 

		camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels); /* Constrain the camera so that it isn't allowed to move outside the width/height of tilemap */
		camera.startFollow(this.player.sprite);

		/* Help text that has a "fixed" position on the screen */
		this.add.text(16, 16, `Find the stairs. Go deeper.\nCurrent level: ${this.level}`, { font: "18px monospace", fill: "#000000", padding: { x: 20, y: 10 }, backgroundColor: "#ffffff"}).setScrollFactor(0);
	}

	update(time, delta) {
		this.player.update();
	}
}