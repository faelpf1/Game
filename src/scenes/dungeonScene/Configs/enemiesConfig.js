import Skeleton from '../../../enemies/skeleton.js';
import Skull from '../../../enemies/skull.js';

export default function enemiesConfig(add, map, rooms) {
    const enemiesRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
    enemiesRooms.forEach((room) => {
        const x = map.tileToWorldX(room.centerX);
        const y = map.tileToWorldY(room.centerY);
        const rand = Math.random();
        if (rand <= 0.1) {
            for (let i = 0; i < 3; i++) {
                add.skull(x + i * 50, y);
                add.skeleton(x + i * 50, y + 50);
            }
        } else if (rand <= 0.25) {
            for (let i = 0; i < 2; i++) {
                add.skull(x + i * 50, y);
                add.skeleton(x + i * 50, y + 50);
            }
        } else if (rand <= 0.25) {
            add.skull(x, y);
            add.skull(x + 50, y);
        } else if (rand <= 0.5) {
            add.skull(x, y);
            add.skeleton(x + 50, y);
        } else if (rand <= 0.75) {
            add.skeleton(x, y);
            add.skeleton(x + 50, y);
        } else if (rand <= 0.80) {
            add.skull(x, y);
        } else {
            add.skeleton(x, y);
        }
    });
}