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
		TOP_UP: [{ index: [0], weight: 4 , collides: true}],
		TOP_DOWN: [{ index: [32], weight: 4, collides: true}, { index: [68 ,100, 3, 4, 7, 140, 141, 142, 143, 36], weight: 1, collides: true} ],
		BOTTOM_UP: [{ index: [0], weight: 4, collides: true}],
		BOTTOM_DOWN: [{ index: [32], weight: 4, collides: true}],
		LEFT: [{ index: 50, weight: 4, collides: true}],
		RIGHT: [{ index: 48, weight: 4, collides: true}],
	},
	FLOOR: [{ index: 185, weight: 10 }, { index: 188, weight: 0.25 }],
	POT: [{ index: [364, 396, 428], weight: 1 }],
	DOOR: {
		TOP_UP: [84, 185, 185, 83],
		TOP_DOWN: [116, 185, 185, 115],
		BOTTOM_UP: [20, 185, 185, 19],
		BOTTOM_DOWN: [52, 185, 185, 51],
		LEFT_UP: [[82], [114], [18], [50]],
		LEFT_DOWN: [[0], [32], [0], [32]],
		RIGHT_UP: [[80], [112], [16], [48]],
		RIGHT_DOWN: [[0], [32], [0], [32]],
		FLOOR: [185],
	},
	CHEST: 366,
	STAIRS: 242,
	TOWER: [[365], [397], [429]],
};

export default TILE_MAPPING;