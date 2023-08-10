import Enemies from '../../../components/enemies.js';
import Skeleton from '../../../enemies/skeleton.js';
import Skull from '../../../enemies/skull.js';

export default function enemiesConfig(thisScene, map) {
    
    thisScene.physics.world.bounds.width = map.widthInPixels;
    thisScene.physics.world.bounds.height = map.heightInPixels;
    thisScene.player.sprite.body.setCollideWorldBounds(true);
    thisScene.spawns = thisScene.physics.add.group({classType: Enemies,
        createCallback: (go) => {
            const skullMove = go;
            skullMove.body.onCollide = true;
        }
    });
    
    //Phaser.Actions.RandomRectangle(thisScene.spawns.getChildren(), thisScene.physics.world.bounds);
    
    for(var i = 0; i < 100; i++) {
        var x = Phaser.Math.RND.between(0, thisScene.physics.world.bounds.width);
        var y = Phaser.Math.RND.between(0, thisScene.physics.world.bounds.height);
        thisScene.spawns.get(x, y,'Enemies');
    }
 
    thisScene.physics.add.collider(thisScene.wallLayer, thisScene.spawns);    
    thisScene.physics.add.collider(thisScene.player.sprite, thisScene.spawns, () => thisScene.onMeetEnemy(null, thisScene), null, thisScene);
}