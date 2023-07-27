import Menu from '../../components/menu.js';
import Skeleton from '../../enemies/skeleton.js';
import Player from '../../player/player.js';
import Text from '../../components/text.js';

export default class BattleScene extends Phaser.Scene {
    constructor() {
        super({key:"BattleScene"})
        this.life_hero = 100;
        this.life_enemy = 100;
    }

    create () {
        // Criar objeto Unidade para player
        const menu = new Menu(this);
        menu.playerAction();
        menu.enemiesStatus(this.life_enemy);
        menu.playerStatus(this.life_hero);
        this.icon_ataque(182, 395, menu, this);
        this.icon_defesa(182, 395 + 20, menu, this);
        this.icon_item_cura(182, 395 + 60, menu,this);
        // objeto para representar o conjunto de inimigos
        const c = this.add.skeleton(620, 200, true);
        c.setScale(4);
        const h = new Player(this, 100, 200);
        h.setScale(100);
    }


    icon_item_cura(x, y, g, thisBattleScene) {
        const item_icon = thisBattleScene.scene.add.text = new Text(thisBattleScene, x, y + 80, `Item`);
        item_icon.setInteractive();
        item_icon.on('pointerover', ()=>{ 
            item_icon.setText('- Usar item')
        });

        item_icon.on('pointerout', ()=>{
            item_icon.setText('Usar item');
        });

        item_icon.on('pointerup', ()=>{
            if (this.life_hero >= 100 && this.life_hero <= 0) {
                this.life_hero += 10;
                g.player_status_text.setText(`Player Status:\nHP: `+ this.life_hero+`/100`);
            }
            //g.playerStatus(this.life_hero);
        });
    }

    icon_ataque (x, y, g, thisBattleScene) {
        const ataque_icon = thisBattleScene.scene.add.text = new Text(thisBattleScene, x, y + 1, `Ataque`);
        ataque_icon.setInteractive();
        ataque_icon.on('pointerover', ()=>{
            ataque_icon.setText(`- Ataque`);
        });

        ataque_icon.on('pointerout', ()=>{
            ataque_icon.setText(`Ataque`);
        });

        ataque_icon.on('pointerup', ()=>{
            console.log(this.life_enemy);
            this.life_enemy -= 10;
            console.log(this.life_hero, this.life_enemy)  
            if (this.life_enemy <= 100 && this.life_enemy > 0) {
                g.enemies_status_text.setText(`Enemies Status:\nHP: `+ this.life_enemy+`/100`);
            } else {
                console.log('Você venceu!');
                this.life_hero = 100;
                this.life_enemy = 100;
                g.enemies_status_text.setText(`Enemies Status:\nHP: `+ this.life_enemy+`/100`);
                console.log(this.life_hero, this.life_enemy)  
                thisBattleScene.scene.wake('StageInfoScene');
                thisBattleScene.scene.switch('DungeonScene');                
            }
        });
    }

    icon_defesa(x, y, g, thisBattleScene) {
        const defesa_icon = thisBattleScene.scene.add.text = new Text(thisBattleScene, x , y + 40, `Defesa`);
        defesa_icon.setInteractive();
        defesa_icon.on('pointerover', ()=>{
            defesa_icon.setText('- Defesa');
        });

        defesa_icon.on('pointerout', ()=>{
            defesa_icon.setText('Defesa');
        });

        defesa_icon.on('pointerup', ()=>{
            // if (this.life_hero <= 100 && this.life_hero >= 0) {
            //     this.life_hero -= this.atack_enemy/10;
            //     g.player_status_text.setText(`Player Status:\nHP: `+ this.life_hero+`/100`);
            // } 
        });
    }
}
