import TILES from './tile-mapping.js';

export default function generateMap(props, map) {  
    const tileset = map.addTilesetImage("tiles", null, 48, 48, 0, 0);  /* tile height and tile width, tile margin, tile spacing */
    props.groundLayer = map.createBlankLayer("Ground", tileset).fill(TILES.BLANK); /* Layer for floors */
    props.wallLayer = map.createBlankLayer("Wall", tileset).fill(TILES.BLANK); /* Layer for walls */
    props.stuffLayer = map.createBlankLayer("Stuff", tileset); /* Layer for stuffs or objects */
   

    props.dungeon.rooms.forEach((room) => {
        const { x, y, width, height, left, right, top, bottom } = room;
        placeFloor(props.groundLayer, x, y, width, height);
        placeCornerWall(props.wallLayer, left, right, top, bottom);
        placeMiddleWall(props.wallLayer, left, right, top, bottom, width, height);
        placePathBetweenRoom(room, props.wallLayer, props.groundLayer, x, y);
        layerCollission(props.groundLayer, props.wallLayer, props.stuffLayer);

    });
}

function placeFloor(groundLayer, x, y, width, height){
    groundLayer.weightedRandomize(TILES.FLOOR, x, y + 1, width - 2, height - 2);
}

function placeCornerWall(wallLayer, left, right, top, bottom){
    wallLayer.putTileAt(TILES.WALL.TOP_LEFT_UP, left, top - 1);
    wallLayer.putTileAt(TILES.WALL.TOP_LEFT_DOWN, left, top);

    wallLayer.putTileAt(TILES.WALL.TOP_RIGHT_UP, right - 2, top - 1);
    wallLayer.putTileAt(TILES.WALL.TOP_RIGHT_DOWN, right - 2, top);

    wallLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_UP, left, bottom - 2);
    wallLayer.putTileAt(TILES.WALL.BOTTOM_LEFT_DOWN, left, bottom - 1);

    wallLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_UP, right - 2, bottom - 2);
    wallLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT_DOWN, right - 2, bottom - 1);
}

function placeMiddleWall(wallLayer, left, right, top, bottom, width, height){
    wallLayer.weightedRandomize(TILES.WALL.TOP_UP, left + 1, top - 1, width - 4, 1);
    wallLayer.weightedRandomize(TILES.WALL.TOP_DOWN, left + 1, top, width - 4, 1);
    wallLayer.weightedRandomize(TILES.WALL.BOTTOM_UP, left + 1, bottom - 2, width - 4, 1);
    wallLayer.weightedRandomize(TILES.WALL.BOTTOM_DOWN, left + 1, bottom - 1, width - 4, 1);
    wallLayer.weightedRandomize(TILES.WALL.LEFT, left, top + 1, 1, height - 4);
    wallLayer.weightedRandomize(TILES.WALL.RIGHT, right - 2, top + 1, 1, height - 4);
}

function placePathBetweenRoom(room, wallLayer, groundLayer, x, y){
    /* Dungeons have rooms that are connected with doors. Each door has an x & y relative to the
        room's location. Each direction has a different door to tile mapping.*/
    const doors = room.getDoorLocations();
    for (let i = 0; i < doors.length; i++) {
        if (doors[i].y === 0) {
            wallLayer.putTilesAt(TILES.DOOR.TOP_UP, x + doors[i].x - 2, y + doors[i].y - 1);
            wallLayer.putTilesAt(TILES.DOOR.TOP_DOWN, x + doors[i].x - 2, y + doors[i].y);
        } else if (doors[i].y === room.height - 1) {
            wallLayer.putTilesAt(TILES.DOOR.BOTTOM_UP, x + doors[i].x - 2, y + doors[i].y - 2);
            wallLayer.putTilesAt(TILES.DOOR.BOTTOM_DOWN, x + doors[i].x - 2, y + doors[i].y - 1);
        } else if (doors[i].x === 0) {
            wallLayer.putTilesAt(TILES.DOOR.LEFT_UP, x + doors[i].x, y + doors[i].y - 1);
            groundLayer.putTilesAt(TILES.DOOR.FLOOR, x + doors[i].x - 1, y + doors[i].y + 1);
            wallLayer.putTilesAt(TILES.DOOR.LEFT_DOWN, x + doors[i].x - 1, y + doors[i].y - 1);
        } else if (doors[i].x === room.width - 1) {
            wallLayer.putTilesAt(TILES.DOOR.RIGHT_UP, x + doors[i].x - 2, y + doors[i].y - 1);
            groundLayer.putTilesAt(TILES.DOOR.FLOOR, x + doors[i].x - 1, y + doors[i].y + 1);
            wallLayer.putTilesAt(TILES.DOOR.RIGHT_DOWN, x + doors[i].x - 1, y + doors[i].y - 1);
        }
    }
}

function layerCollission(groundLayer, wallLayer, stuffLayer){
    const collisionArray = [-1, 18, 16, 0, 117, 185, 188];
    groundLayer.setCollisionByExclusion(collisionArray);
    wallLayer.setCollisionByExclusion(collisionArray);
    stuffLayer.setCollisionByExclusion(collisionArray);
    wallLayer.setCollisionByProperty({ collides: true });
}