import TILES from './tile-mapping.js';

export default function generateStuff(rooms, stuffLayer){
    const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);
        otherRooms.forEach((room) => {
            const rand = Math.random();
            if (rand <= 0.25) {
                // 25% chance of chest
                stuffLayer.putTileAt(TILES.CHEST, room.centerX, room.centerY);
            } else if (rand <= 0.5) {
                // 50% chance of a pot anywhere in the room... except don't block a door!
                const x = Phaser.Math.Between(room.left + 2, room.right - 2);
                const y = Phaser.Math.Between(room.top + 2, room.bottom - 2);
                stuffLayer.weightedRandomize(x, y, 1, 1, TILES.POT);
            } else {
                // 25% of either 2 or 4 towers, depending on the room size
                if (room.height >= 9) {
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY + 1);
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY + 1);
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 2);
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 2);
                } else {
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX - 1, room.centerY - 1);
                    stuffLayer.putTilesAt(TILES.TOWER, room.centerX + 1, room.centerY - 1);
                }
            }
        });
}