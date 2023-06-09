import Player from '../player.js';
import TILES from './tile-mapping.js';
import Skeleton from '../../enemies/skeleton.js';
import Skull from '../../enemies/skull.js';
import Text from '../../components/text.js';
import cameraConfig from './cameraConfig.js';
import playerConfig from './playerConfig.js';
import generateMap from './generateMap.js';

export default class DungeonScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DungeonScene' });
        this.level = 0;
    }

    create() {
        this.level++;
        
        this.hasPlayerReachedStairs = false;
        this.registry.set('stageInfo', this.level); /* Pass current level to levelinfo scene */ 
        
        this.dungeonConfig();
        const map = this.make.tilemap({ tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height });
        
        this.mapConfig(map);
        
        const rooms = this.dungeon.rooms.slice();
        const startRoom = rooms.shift();
        const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);

        //this.generateStuffs(rooms);

        this.dungeonStageChange(endRoom); /* Stairs config */

        //playerConfig(startRoom, map); /* Place the player in the first room */
        this.playerConfig(startRoom, map); /* Place the player in the first room */

        this.enemiesConfig(map, rooms); /* Enemies placement */

        //var graphics = new MyGraphics(scene, options);
        
    }

    update(time, delta) {
        if (this.hasPlayerReachedStairs) return;
        this.player.update();
        // Find the player's room using another helper method from the dungeon that converts from
        // dungeon XY (in grid units) to the corresponding room object
        //const playerTileX = this.groundLayer.worldToTileX(this.player.sprite.x);
        //const playerTileY = this.groundLayer.worldToTileY(this.player.sprite.y);
        //const playerRoom = this.dungeon.getRoomAt(playerTileX, playerTileY);

        //this.tilemapVisibility.setActiveRoom(playerRoom);
    }

    /* Dungeon Configs */
    dungeonConfig() {
        this.dungeon = new Dungeon({
            width: 50,
            height: 50,
            doorPadding: 5, /* Doors should be at least 2 tiles away from corners, so that we can place a corner tile on either side of the door location */
            rooms: {
                width: { min: 11, max: 21, onlyOdd: true }, /* Rooms should only have odd number dimensions so that they have a center tile. */
                height: { min: 11, max: 21, onlyOdd: true },
            },
        });
    }

    mapConfig(map) {
        const tileset = map.addTilesetImage("tiles", null, 48, 48, 0, 0);  /* tile height and tile width, tile margin, tile spacing */
        this.groundLayer = map.createBlankLayer("Ground", tileset).fill(TILES.BLANK); /* Layer for floors */
        this.wallLayer = map.createBlankLayer("Wall", tileset).fill(TILES.BLANK); /* Layer for walls */
        this.stuffLayer = map.createBlankLayer("Stuff", tileset); /* Layer for stuffs or objects */
        generateMap(this.dungeon, map, tileset, this.groundLayer, this.wallLayer/*, this.stuffLayer*/);
        //({stuffLayer: this.stuffLayer} = generateMap(this.dungeon, map, tileset, this.groundLayer, this.wallLayer));
    }

    dungeonStageChange(endRoom) {
        this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY); /* Place stairs in the stage */
        this.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
            this.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
            this.hasPlayerReachedStairs = true;
            this.player.freeze();
            const cam = this.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                this.player.destroy();
                this.scene.restart();
                this.scene.launch('LevelInfo'); /* Update level in levelinfo scene */
            });
        });
    }

    // generateStuffs(rooms) {
    //     const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
    //     otherRooms.forEach((room) => {
    //         const rand = Math.random();
    //         if (rand <= 0.25) {
    //             // 25% chance of chest
    //             this.stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
    //         } else if (rand <= 0.5) {
    //             // 50% chance of a pot anywhere in the room... except don't block a door!
    //             const x = Phaser.Math.Between(room.left + 2, room.right - 2);
    //             const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
    //             this.stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
    //         } else {
    //             // 25% of either 2 or 4 towers, depending on the room size
    //             if (room.height >= 9) {
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
    //             } else {
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
    //                 this.stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
    //             }
    //         }
    //     });
    // }


    /* Player Configs */
    playerConfig(startRoom, map) {
        const playerRoom = startRoom;
        const x = map.tileToWorldX(playerRoom.centerX);
        const y = map.tileToWorldY(playerRoom.centerY);
        this.player = new Player(this, x, y);
        this.playerCollision(); /* Player collision with layers */
        cameraConfig(this.cameras.main, map, this.player.sprite);
        //this.cameraConfig(map); /* Camera setup */
    }

    playerCollision() {
        this.physics.add.collider(this.player.sprite, this.groundLayer);
        this.physics.add.collider(this.player.sprite, this.wallLayer);
        this.physics.add.collider(this.player.sprite, this.stuffLayer);
    }

    /* Enemies Configs */
    enemiesConfig(map, rooms) 
    {
        const enemiesRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
        enemiesRooms.forEach((room) => {
            const x = map.tileToWorldX(room.centerX);
            const y = map.tileToWorldY(room.centerY);
            const rand = Math.random();
            if (rand <= 0.1) {
                for (let i = 0; i < 3; i++) {
                    this.add.skull(x+i*50, y);
                    this.add.skeleton(x+i*50, y+50);
                }
            } else if (rand <= 0.25) {
                for (let i = 0; i < 2; i++) {
                    this.add.skull(x+i*50, y);
                    this.add.skeleton(x+i*50, y+50);
                }
            } else if (rand <= 0.25) {
                this.add.skull(x, y);
                this.add.skull(x+50, y);
            } else if (rand <= 0.5) {
                this.add.skull(x, y);
                this.add.skeleton(x+50, y);
            } else if (rand <= 0.75) {
                this.add.skeleton(x, y);
                this.add.skeleton(x+50, y);
            } else if (rand <= 0.80) {
                this.add.skull(x, y);
            } else {
                this.add.skeleton(x, y);
            }
        });

    }

}

