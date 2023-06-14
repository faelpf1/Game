import Player from '../../../player/player.js';

export default function playerConfig(props, map, rooms){
    const startRoom = rooms.shift();
    const x = map.tileToWorldX(startRoom.centerX);
    const y = map.tileToWorldY(startRoom.centerY);
    props.player = new Player(props, x, y);

    playerCollision(props);
    cameraConfig(props.cameras.main, map, props.player.sprite);
}

function playerCollision(props) {
    props.physics.add.collider(props.player.sprite, props.groundLayer);
    props.physics.add.collider(props.player.sprite, props.wallLayer);
    props.physics.add.collider(props.player.sprite, props.stuffLayer);
    props.physics.add.collider(props.player.sprite, props.spawns);
}

function cameraConfig(camera, map, playerSprite){
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels); /* Constrain the camera on tileMap */
    camera.startFollow(playerSprite);
}
