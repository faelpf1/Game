import Menu from '../../components/menu.js';
import Skeleton from '../../enemies/skeleton.js';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({key:"BattleScene"})
    }

    create () {
        // Criar objeto Unidade para player e inimigo
        // Chamar objeto text
        const g = new Menu(this);
        g.playerStatus();
        g.playerAction();
        g.enemiesStatus();
        this.add.skeleton(20, 30);
    }
}
