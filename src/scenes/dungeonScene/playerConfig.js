import cameraConfig from './cameraConfig.js';

export default function playerConfig(playerRoom, map, player){
    const x = map.tileToWorldX(playerRoom.centerX);
    const y = map.tileToWorldY(playerRoom.centerY);
    this.player = new Player(this, x, y);
    
    this.physics.add.collider(this.player.sprite, this.groundLayer);
    this.physics.add.collider(this.player.sprite, this.wallLayer);
    this.physics.add.collider(this.player.sprite, this.stuffLayer);

    cameraConfig(this.cameras.main, map, this.player.sprite);

    
}
