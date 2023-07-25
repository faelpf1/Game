import Text from "./text.js"
import Graphic from "./graphic.js";

export default class Menu extends Graphic 
{
    constructor(scene) 
    {
        super(scene);
        this.scene = scene;
    }

    playerStatus() 
    {
        const x = 2;
        const y = 395; 
        const width = 180; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
        this.text = new Text(this.scene, x, y, `Player Status:\nHP: 100/100`);
    }

    playerAction() 
    {
        const x = 182;
        const y = 395; 
        const width = 420; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
        
        this.icon_ataque();
        this.icon_defesa();
        this.icon_item();
    }

    icon_item() {
        const item_icon = this.scene.add.text = new Text(this.scene, x, y + 80, `Item`);
        item_icon.setInteractive();
        item_icon.on('pointerover', ()=>{
            console.log('Usar item')
        });

        item_icon.on('pointerout', ()=>{
            console.log('Usar item')
        });

        item_icon.on('pointerup', ()=>{
            console.log('Usar item')
        });
    }

    icon_ataque () {
        const ataque_icon = this.scene.add.text = new Text(this.scene, x, y + 1, `Ataque`);
        ataque_icon.setInteractive();
        ataque_icon.on('pointerover', ()=>{
            console.log('Ataque')
        });

        ataque_icon.on('pointerout', ()=>{
            console.log('Ataque')
        });

        ataque_icon.on('pointerup', ()=>{
            console.log('Ataque')
        });
    }

    icon_defesa() {
        const defesa_icon = this.scene.add.text = new Text(this.scene, x , y + 40, `Defesa`);
        defesa_icon.setInteractive();
        defesa_icon.on('pointerover', ()=>{
            console.log('Ataque')
        });

        defesa_icon.on('pointerout', ()=>{
            console.log('Ataque')
        });

        defesa_icon.on('pointerup', ()=>{
            console.log('Ataque')
        });
    }

    enemiesStatus() 
    {
        const x = 600;
        const y = 395; 
        const width = 200; 
        const height = 200;
        this.strokeRect(x, y, width, height);// x, y, width, height
        this.fillRect(x, y, width, height);
        this.text = new Text(this.scene, x, y, `Enemies Status:\nHP: 100/100`);
    }

    
}