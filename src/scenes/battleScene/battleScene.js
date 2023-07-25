import Menu from '../../components/menu.js';
import Skeleton from '../../enemies/skeleton.js';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({key:"BattleScene"})
    }

    create () {
        // Criar objeto Unidade para player
        const g = new Menu(this);
        g.playerStatus();
        g.playerAction();
        g.enemiesStatus();
        // objeto para representar o conjunto de inimigos
        const c = this.add.skeleton(100, 200, true);
        c.setScale(5);
        
    }
}
