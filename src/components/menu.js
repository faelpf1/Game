import Text from "./text.js"
import Graphic from "./graphic.js";

export default class Menu extends Graphic {
    constructor(scene) {
        super(scene);
    }

    create() {
        this.strokeRect(2, 150, 90, 100);// x, y, width, height
        this.fillRect(2, 150, 90, 100);
        //this.text = new Text(this, 16, 16, `Current level: `);
    }
}