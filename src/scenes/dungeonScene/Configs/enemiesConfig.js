import Skeleton from '../../../enemies/skeleton.js';
import Skull from '../../../enemies/skull.js';

export default function enemiesConfig(thisScene, map) {
    thisScene.physics.world.bounds.width = map.widthInPixels;
    thisScene.physics.world.bounds.height = map.heightInPixels;
    thisScene.player.sprite.body.setCollideWorldBounds(true);
    thisScene.spawns = thisScene.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for(var i = 0; i < 40; i++) {
        var x = Phaser.Math.RND.between(0, thisScene.physics.world.bounds.width);
        var y = Phaser.Math.RND.between(0, thisScene.physics.world.bounds.height);
        thisScene.spawns.create(x, y, 48, 48);            
    }      

    thisScene.physics.add.overlap(thisScene.player.sprite, thisScene.spawns, thisScene.onMeetEnemy, false, thisScene);
}