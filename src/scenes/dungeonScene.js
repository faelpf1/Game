import Player from "./player.js";
import TILES from "./tile-mapping.js";
import Skeleton from '../enemies/skeleton.js';
import Skull from '../enemies/skull.js';

export default class DungeonScene extends Phaser.Scene 
{
    constructor() 
    {
        super({key: 'DungeonScene'});
        this.level = 0;
    }

    create() {
        this.level++;
        this.hasPlayerReachedStairs = false;

        this.dungeon = new Dungeon({
            width: 50,
            height: 50,
            doorPadding: 5, /* Doors should be at least 2 tiles away from corners, so that we can place a corner tile on either side of the door location */
            rooms: {
                width: { min: 11, max: 21, onlyOdd: true }, /* Rooms should only have odd number dimensions so that they have a center tile. */
                height: { min: 11, max: 21, onlyOdd: true },
            },
        });

        const map = this.make.tilemap({ tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height });
        const tileset = map.addTilesetImage("tiles", null, 48, 48, 0, 0);  /* tile height and tile width, tile margin, tile spacing */
        this.groundLayer = map.createBlankLayer("Ground", tileset).fill(TILES.BLANK); /* Layer for floors */
        this.wallLayer = map.createBlankLayer("Wall", tileset).fill(TILES.BLANK); /* Layer for walls */
        this.stuffLayer = map.createBlankLayer("Stuff", tileset); /* Layer for stuffs or objects */


        
        /* Generate tiles on map */
        this.dungeon.rooms.forEach((room) => {
            const { x, y, width, height, left, right, top, bottom } = room;

            /* Place floor */
            this.groundLayer.weightedRandomize(TILES.FLOOR, x, y + 1, width - 2, height - 2);

            /* Place corner walls */
            this.wallLayer.putTileAt(TILES.WALL.TOP_LEFT_UP, left, top - 1);
            this.wallLayer.putTileAt(TILES.WALL.TOP_LEFT_DOWN, left, top);

            this.wallLayer.putTileAt(TILES.WALL.TOP_RIGHT_UP, right - 2, top - 1)
            this.wallLayer.putTileAt(TILES.WALL.TOP_RIGHT_DOWN, right - 2, top)

            this.wallLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_UP, left, bottom - 2);
            this.wallLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_DOWN, left, bottom - 1);

            this.wallLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_UP, right - 2, bottom - 2);
            this.wallLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_DOWN, right - 2, bottom - 1);
            
            

            /* Fill the walls with mostly clean tiles */
            this.wallLayer.weightedRandomize(TILES.WALL.TOP_UP, left + 1, top - 1, width - 4, 1);
            this.wallLayer.weightedRandomize(TILES.WALL.TOP_DOWN, left + 1, top, width - 4, 1);
            this.wallLayer.weightedRandomize(TILES.WALL.BOTTOM_UP, left + 1, bottom - 2, width - 4, 1);
            this.wallLayer.weightedRandomize(TILES.WALL.BOTTOM_DOWN, left + 1, bottom - 1, width - 4, 1);
            this.wallLayer.weightedRandomize(TILES.WALL.LEFT, left, top + 1, 1, height - 4);
            this.wallLayer.weightedRandomize(TILES.WALL.RIGHT, right - 2, top + 1, 1, height - 4);

            // Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
            // room's location. Each direction has a different door to tile mapping.
            const doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
            for (let i = 0; i < doors.length; i++) {
                if (doors[i].y === 0) {
                    this.wallLayer.putTilesAt(TILES.DOOR.TOP_UP, x + doors[i].x - 2, y + doors[i].y - 1);
                    this.wallLayer.putTilesAt(TILES.DOOR.TOP_DOWN, x + doors[i].x - 2, y + doors[i].y);
                } else if (doors[i].y === room.height - 1) {
                    this.wallLayer.putTilesAt(TILES.DOOR.BOTTOM_UP, x + doors[i].x - 2, y + doors[i].y - 2);
                    this.wallLayer.putTilesAt(TILES.DOOR.BOTTOM_DOWN, x + doors[i].x - 2, y + doors[i].y - 1);
                } else if (doors[i].x === 0) {
                    this.wallLayer.putTilesAt(TILES.DOOR.LEFT_UP, x + doors[i].x, y + doors[i].y - 1);
                    this.groundLayer.putTilesAt(TILES.DOOR.FLOOR, x + doors[i].x - 1, y + doors[i].y + 1);
                    this.wallLayer.putTilesAt(TILES.DOOR.LEFT_DOWN, x + doors[i].x - 1, y + doors[i].y - 1);
                } else if (doors[i].x === room.width - 1) {
                    this.wallLayer.putTilesAt(TILES.DOOR.RIGHT_UP, x + doors[i].x - 2, y + doors[i].y - 1);
                    this.groundLayer.putTilesAt(TILES.DOOR.FLOOR, x + doors[i].x - 1, y + doors[i].y + 1);
                    this.wallLayer.putTilesAt(TILES.DOOR.RIGHT_DOWN, x + doors[i].x - 1, y + doors[i].y - 1);
                }
            }
        });

        const rooms = this.dungeon.rooms.slice();
        console.log(rooms)
        const startRoom = rooms.shift();
        const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
        const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

        // Place the stairs
        this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);

        /*otherRooms.forEach((room) => {
            const rand = Math.random();
            if (rand <= 0.25) {
                // 25% chance of chest
                this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
            } else if (rand <= 0.5) {
                // 50% chance of a pot anywhere in the room... except don't block a door!
                const x = Phaser.Math.Between(room.left + 2, room.right - 2);
                const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
                this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
            } else {
                // 25% of either 2 or 4 towers, depending on the room size
                if (room.height >= 9) {
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
                } else {
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
                    this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
                }
            }
        });*/


        
        this.layerCollission(); /* layers collisions */
        
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

        this.placePlayer(startRoom, map); /* Place the player in the first room */

        this.playerCollision(); /* Player collision with layers */
 
        this.cameraConfig(map); /* Camera setup */      

        this.add.text(16, 16, `Current level: ${this.level}`, { font: "18px monospace", fill: "#000000", padding: { x: 5, y: 5 }, backgroundColor: "#ffffff" }).setScrollFactor(0);

        this.placeEnemies(startRoom, map); /* Enemies placement */
        

    }

    layerCollission()
    {
        const collisionArray = [-1, 18, 16,0,117, 185, 188]
        this.groundLayer.setCollisionByExclusion(collisionArray);
        this.wallLayer.setCollisionByExclusion(collisionArray);
        this.stuffLayer.setCollisionByExclusion(collisionArray);
        //this.groundLayer.setCollisionByProperty({ collides: true }); 
		this.wallLayer.setCollisionByProperty({ collides: true }); 
    }

    update(time, delta) 
    {
        if (this.hasPlayerReachedStairs) return;
        this.player.update();

        // Find the player's room using another helper method from the dungeon that converts from
        // dungeon XY (in grid units) to the corresponding room object
        //const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
        //const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
        //const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

        //this.tilemapVisibility.setActiveRoom(playerRoom);
    }

    placePlayer(startRoom, map)
    {
        const playerRoom = startRoom;
        const x = map.tileToWorldX(playerRoom.centerX);
        const y = map.tileToWorldY(playerRoom.centerY);
        this.player = new Player(this, x, y);        
    }

    playerCollision()
    {
        this.physics.add.collider(this.player.sprite, this.groundLayer);
        this.physics.add.collider(this.player.sprite, this.wallLayer);
        this.physics.add.collider(this.player.sprite, this.stuffLayer);
    }

    cameraConfig(map)
    {
        /* Phaser default camera */
        const camera = this.cameras.main;
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.startFollow(this.player.sprite);
    }

    placeEnemies(startRoom, map)
    {
        const playerRoom = startRoom;
        const x = map.tileToWorldX(playerRoom.centerX);
        const y = map.tileToWorldY(playerRoom.centerY);
        const skeleton = this.add.skeleton(x-100, y);
        const skull = this.add.skull(x+100, y);
    }

}

