import Phaser from "phaser";
import Dungeon from "@mikewesthad/dungeon";

class DungeonScene extends Phaser.Scene {
	#level
	
	constructor() {
		super();
		this.#level = 0
	}
	preload() {
		this.#level += 1;
		this.load.image(
			"tiles",
			""
		);
		this.load.sprintesheet(
			"characters",
			"",
			{
				framewidth: 64,
				frameHeight: 64,
				margin: 1,
				spacing: 2
			}
		)
	}
	
	create () {		
		this.dugeon = new Dungeon({
			width: 40,
			height:40,
			rooms: {
				width: {min:5,max:10, onlyOdd:true},
				height: {min:8, max:20, onlyOdd:true}
			},
		maxArea: 150,
		maxRooms: 10
		});
		
		const map = this.make.tilemap({
			tileWidth: 48,
			tileHeight:48,
			width: this.dungeon.width,
			height: this.dungeon.height
		});
			// pode ser trocado o tamanho do maap a margem e espço
			const tileset = map.addTilesetImage("tiles", null, 48,48, 1, 2);
			this.groundLayer = map.createBlanckLayer("Ground", tileset).fill(TILES.BLANK);
			this.stuffLayer = map.createBlanckLayer("Stuff", tileset);
			const shadowLayer = map.createBlankLayer("Shadow", tileset).fill(TILES.BLANK)
		this.tilemapVisibility = new TilemapVisibillity(shadowLayer);
			layer.putTilesAt(mappedTiles, 0, 0);
	
			this.groundLayer.fill(2);
			this.dungeon.rooms.forEach( (room) => {
				const {x, y, width, height, left, right, top, bottom} = room;
				this.groundLayer.weightedRAndomize(TILES.FLOOR, x + 1, y + 1, width - 2, height - 2);
	
				this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
				this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
				this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
				this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);
	
				this.groundLayer.weightedRandomize(TILES.WALL.TOP, left + 1, top, width - 2, 1);
				this.groundLayer.weightedRandomize(TILES.WALL.BOTTOM, left + 1, bottom, width - 2, 1);
				this.groundLayer.weightedRandomize(TILES.WALL.LEFT, left, top + 1, 1, height - 2);
				this.groundLayer.weightedRandomize(TILES.WALL.RIGHT, right, top + 1, 1, height - 2);


				const doors = room.getDoorLocations();
				for (let i = 0; i < doors.length; i++) {
					if (doors[i].y == 0) {
						this.groundLayer.putTileAt(TILES.DOOR.TOP, x + doors[i].x - 1,y + doors[i].y);	
					} else if (doors[i].y === room.height - 1) {
						this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);	
					} else if (doors[i].x === 0) {
						this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
					} else if (doors[i].x == room.width - 1) {
						this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
					}
				}
				
			});

		const rooms = this.dugeon.rooms.slice()
			const startRoom = rooms.shift();
			const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
			const otherRoom = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.lenght*0.9);

			this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);
			otherRooms.forEach((room) => {
				const rand = Math.random();
				if (rand <= 0.25) {
					this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
				} else if (rand <= 0.5) {
					const x = Pharser.Math.Between(room.left + 2, room.right - 2);
					const y = Pharser.Math.Between(room.top + 2, room.bottom - 2);
					this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
				} else {
					if(room.height >= 9) {
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
					} else {
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
						this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
					}
				}
			});
			this.groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);
		this.stuffLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

    this.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
      this.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
      this.hasPlayerReachedStairs = true;
      this.player.freeze();
      const cam = this.cameras.main;
      cam.fade(250, 0, 0, 0);
      cam.once("camerafadeoutcomplete", () => {
        this.player.destroy();
        this.scene.restart();
      });
    });

		const playerRoom = startRoom;
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);
		
		this.physics.add.collider(this.player.sprite, this.groundLayer);
		this.physics.add.collider(this.player.sprite, this.stuffLayer);

		
			const camera = this.cameras.main;
			this.setCamera(camera, map);
		
			
	}

	
	//private method set camera in player
	#setCamera(camera, map) {
			camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
			camera.startFollow(this.player.sprite);
	}
	

	update(time, delta) {
		this.player.update();
		const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
		const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
		this.tilemapVisibility.setActiveRoom(playerRoom);
	}
	
}
export default Dungeon;