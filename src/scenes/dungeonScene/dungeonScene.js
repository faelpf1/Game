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
        this.levelLoad = this.registry.values.stageInfoLoad;

        if(this.levelLoad){
            this.level=this.levelLoad;
        }
        this.registry.set('stageInfo', this.level); /* Pass current level to levelInfo scene */     
        
        dungeonConfig(this);

        const map = this.make.tilemap({ tileWidth: 48, tileHeight: 48, width: this.dungeon.width, height: this.dungeon.height });
        
        const rooms = this.dungeon.rooms.slice();

        generateMap(this, map);
        stageChangeConfig(this, rooms);
        playerConfig(this, map, rooms); /* Player placement */
        
        enemiesConfig(this, map); /* Enemies placement */
    }

    update(time, delta) {
        if (this.hasPlayerReachedStairs) return;
        this.player.update();
        //console.log(this.groundLayer.worldToTileX(this.player.sprite.x), this.groundLayer.worldToTileY(this.player.sprite.y));
    }

    onMeetEnemy(player, zone){
        //this.cameras.main.shake(500);
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
       
        this.scene.sleep('StageInfoScene');
        this.scene.switch('BattleScene');
    }
}

