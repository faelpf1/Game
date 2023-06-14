import Skeleton from '../../../enemies/skeleton.js';
import Skull from '../../../enemies/skull.js';

export default function enemiesConfig(scene, map, rooms) {
    const spawns = scene.physics.add.group({ classType: Phaser.GameObjects.Zone });
    const enemiesRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
    enemiesRooms.forEach((room) => {
            const x = map.tileToWorldX(room.centerX);
            const y = map.tileToWorldY(room.centerY);
            const rand = Math.random();
            if (rand <= 0.1) {
                for (let i = 0; i < 3; i++) {
                    scene.add.skull(x+i*50, y);
                    scene.add.skeleton(x+i*50, y+50);
                    spawns.create(x+i*50, y, 50, 40);
                    spawns.create(x+i*50, y+50, 50, 50);
                }
            } else if (rand <= 0.25) {
                for (let i = 0; i < 2; i++) {
                    scene.add.skull(x+i*50, y);
                    scene.add.skeleton(x+i*50, y+50);
                    spawns.create(x+i*50, y, 50, 50);
                    spawns.create(x+i*50, y+50, 50, 50);
                }
            } else if (rand <= 0.25) {
                scene.add.skull(x, y);
                scene.add.skull(x+50, y);
                spawns.create(x, y, 50, 50);
                spawns.create(x+50, y, 50, 50);
            } else if (rand <= 0.5) {
                scene.add.skull(x, y);
                scene.add.skeleton(x+50, y);
                spawns.create(x, y, 50, 50);
                spawns.create(x+50, y, 50, 50);
            } else if (rand <= 0.75) {
                scene.add.skeleton(x, y);
                scene.add.skeleton(x+50, y);
                spawns.create(x, y, 50, 40);
                spawns.create(x+50, y, 50, 40);
            } else if (rand <= 0.80) {
                scene.add.skull(x, y);
                spawns.create(x, y, 50, 50);
            } else {
                scene.add.skeleton(x, y);
                spawns.create(x, y, 50, 40);
            }
        });
        enemiesCollision(scene, spawns)
    }

function enemiesCollision(scene, spawns) {
    scene.physics.add.collider(spawns, scene.groundLayer);
    scene.physics.add.collider(spawns, scene.wallLayer);
    scene.physics.add.collider(spawns, scene.stuffLayer);
    scene.physics.add.collider(scene.player.sprite, spawns, meetEnemiesConfig(scene), null, this);
}

function meetEnemiesConfig(scene) {
    scene.cameras.main.shake(300);
    // scene.scene.start('BattleScenes');
}