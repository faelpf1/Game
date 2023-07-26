import Text from "./text.js"
import Graphic from "./graphic.js";

export default class Menu extends Graphic 
{
    constructor(scene) 
    {
        super(scene);
        this.scene = scene;
    }


    //update_life_enemy(life_enemy) {
    //    this.life_enemy = life_enemy;
    //}

    playerStatus() 
    {
        const x = 2;
        const y = 395; 
        const width = 180; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
        this.player_status_text = new Text(this.scene, x, y, `Player Status:\nHP: 100/100`);
    }

    playerAction() 
    {
        const x = 182;
        const y = 395; 
        const width = 420; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
    }

    enemiesStatus() 
    {
        const x = 600;
        const y = 395; 
        const width = 200; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
        this.enemies_status_text = new Text(this.scene, x, y, `Enemies Status:\nHP: 100/100`);
    }    
}