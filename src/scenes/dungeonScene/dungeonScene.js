import dungeonConfig from './Configs/dungeonConfig.js';
import playerConfig from './Configs/playerConfig.js';
import generateMap from './generateMap.js';
//import generateStuff from './generateStuff.js';
import stageChangeConfig from './Configs/stageChangeConfig.js';
import enemiesConfig from './Configs/enemiesConfig.js';

export default class DungeonScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DungeonScene' });
        this.level = 0;
    }

    create() {
        this.level++; 
        this.hasPlayerReachedStairs = false;
        this.registry.set('stageInfo', this.level); /* Pass current level to levelInfo scene */ 
        
        dungeonConfig(this);

        const map = this.make.tilemap({ tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height });
        const rooms = this.dungeon.rooms.slice();

        generateMap(this, map);
        stageChangeConfig(this, rooms);
        playerConfig(this, map, rooms); /* Player placement */
        enemiesConfig(this, map, rooms); /* Enemies placement */
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
}

