export default class Text extends Phaser.GameObjects.Text {
	constructor(scene, x, y, text) {
		super(scene, x, y, text, {
			fontFamily: 'Courier',
			fontSize: '20px',
			//fill: "#000000",
			//backgroundColor: "#ffffff", 
			color: '#ffffff', 
			stroke: '#000000', 
			strokeThickness: 4,
			padding:{ x:5, y:5 }
		});
		this.setOrigin(0, 0);
		scene.add.existing(this);
	}
}