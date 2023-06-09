import Text from '../../components/text.js';

export default class LevelInfo extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelInfo' });
    }

    create() {
        this.level = this.registry.values.stageInfo; /* Get dungeon current level */
        this.text = new Text(this, 16, 16, `Current level: ${this.level}`);
    }
}