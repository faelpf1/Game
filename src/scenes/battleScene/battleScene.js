import Menu from '../../components/menu.js';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({key:"BattleScene"})
    }

    create () {
        // Criar objeto Unidade para player e inimigo
        // Chamar objeto text
        const g = new Menu(this);
        g.create();

     
        
        
    }
}
