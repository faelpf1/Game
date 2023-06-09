export default function dungeonConfig(props) {
    props.dungeon = new Dungeon({
        width: 50,
        height: 50,
        doorPadding: 5, /* Doors should be at least 2 tiles away from corners, so that we can place a corner tile on either side of the door location */
        rooms: {
            width: { min: 11, max: 21, onlyOdd: true }, /* Rooms should only have odd number dimensions so that they have a center tile. */
            height: { min: 11, max: 21, onlyOdd: true },
        },
    });
}