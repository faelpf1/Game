// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILE_MAPPING = {
	BLANK: 117,
	WALL: {
		/* corner walls */
		TOP_LEFT_UP: 19,
		TOP_LEFT_DOWN: 51,
		TOP_RIGHT_UP: 20,
		TOP_RIGHT_DOWN: 52,
		BOTTOM_LEFT_UP: 83,
		BOTTOM_LEFT_DOWN: 115,
		BOTTOM_RIGHT_UP: 84,
		BOTTOM_RIGHT_DOWN: 116,

		/* Middle walls */
		TOP_UP: [{ index: [0], weight: 4 }],
		TOP_DOWN: [{ index: [32], weight: 4 }, { index: [68 ,100, 3, 4, 7, 140, 141, 142, 143, 36], weight: 1 } ],
		BOTTOM_UP: [{ index: [0], weight: 4 }],
		BOTTOM_DOWN: [{ index: [32], weight: 4 }],
		LEFT: [{ index: 50, weight: 4 }],
		RIGHT: [{ index: 48, weight: 4 }],
	},
	FLOOR: [{ index: 185, weight: 9 }, { index: 188, weight: 0.1 }],
	POT: [
		{ index: 364, weight: 1 },
		{ index: [396, 428], weight: 1 },
	],
	DOOR: {
		TOP_UP: [84, 185, 83],
		TOP_DOWN: [116, 185, 115],
		BOTTOM_UP: [20, 185, 19],
		BOTTOM_DOWN: [52, 185, 51],
		LEFT_UP: [[82], [114], [18], [50]],
		LEFT_DOWN: [[0], [32], [0], [32]],
		RIGHT_UP: [[80], [112], [16], [48]],
		RIGHT_DOWN: [[0], [32], [0], [32]],
		FLOOR: [185],
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