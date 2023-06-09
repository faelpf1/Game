
import TILES from "../tile-mapping.js";

export default function stageChangeConfig(props, rooms) {
    const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
        props.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY); /* Place stairs in the stage */
        props.stuffLayer.setTileIndexCallback(TILES.STAIRS, () => {
            props.stuffLayer.setTileIndexCallback(TILES.STAIRS, null);
            props.hasPlayerReachedStairs = true;
            props.player.freeze();
            const cam = props.cameras.main;
            cam.fade(250, 0, 0, 0);
            cam.once("camerafadeoutcomplete", () => {
                props.player.destroy();
                props.scene.restart();
                props.scene.launch('StageInfoScene'); /* Update level in levelinfo scene */
            });
        });
}