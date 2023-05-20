// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
    BLANK: 117,
    WALL: {
      TOP_LEFT: 33,
      TOP_RIGHT: 33,
      BOTTOM_LEFT: 115,
      BOTTOM_RIGHT: 115,
      TOP: [
        { index: 33, weight: 4 },
      ],
      LEFT: [
        { index: 82, weight: 4 },
      ],
      RIGHT: [
        { index: 80, weight: 4 },
      ],
      BOTTOM: [
        { index: 33, weight: 4 },
      ],
    },
    FLOOR: [
      { index: 5, weight: 9 },
    ],
    POT: [
      { index: 364, weight: 1 },
      { index: 396, weight: 1 },
      { index: 428, weight: 1 },
    ],
    DOOR: {
      TOP: 5,
      LEFT: 5,
      BOTTOM: 5,
      RIGHT: 5,
    },
    CHEST: 366,
    STAIRS: 242,
    TOWER: [
      [365],
      [397],
      [429]
    ],
  };
  
  export default TILE_MAPPING;