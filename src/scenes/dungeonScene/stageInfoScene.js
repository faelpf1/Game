import Text from '../../components/text.js';

export default class StageInfoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StageInfoScene' });
    }

    create() {
        this.level = this.registry.values.stageInfo; /* Get dungeon current level */
        this.text = new Text(this, 16, 16, `Current level: ${this.level}`);
        this.text = new Text(this, 400, 16, `Stage password: Level${this.level}`);
    }
}