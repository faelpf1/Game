export default function cameraConfig(camera, map, playerSprite){
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels); /* Constrain the camera on tileMap */
    camera.startFollow(playerSprite);
    return camera;
}
