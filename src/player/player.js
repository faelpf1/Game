export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) 
    {
        super(scene, x, y, 'characters');
        const anims = scene.anims;
        
        this.playerAnims(anims);

        this.keys = scene.input.keyboard.createCursorKeys();

        this.sprite = scene.physics.add.sprite(x, y, 'characters', 0);

        this.sprite.setScale(3);
    }

    playerAnims(anims)
    {
        anims.create({
            key: "player-walk",
            frames: anims.generateFrameNumbers('characters', { start: 0, end: 7 }),
            frameRate: 8,
            repeat: -1,
        });

        anims.create({
            key: "player-walk-front",
            frames: anims.generateFrameNumbers('characters', { start: 16, end: 21 }),
            frameRate: 8,
            repeat: -1,
        });

        anims.create({
            key: "player-walk-back",
            frames: anims.generateFrameNumbers('characters', { start: 32, end: 37 }),
            frameRate: 8,
            repeat: -1,
        });

        anims.create({
            key: "player-idle",
            frames: anims.generateFrameNumbers('characters', { start: 8, end: 10 }),
            frameRate: 8,
            repeat: -1,
        });
    }

    
    update() 
    {
        const keys = this.keys;
        const sprite = this.sprite;
        const speed = 300;
        
        sprite.body.setVelocity(0); /* Stop any previous movement from the last frame */

        this.playerMoves(keys, sprite, speed);
        
        sprite.body.velocity.normalize().scale(speed); /* Normalize and scale the velocity so that sprite can't move faster along a diagonal */

        this.playerMovesAnims(keys, sprite);
    }

    playerMoves(keys, sprite, speed)
    {
        // Horizontal movement
        if (keys.left.isDown) 
        {
            sprite.body.setVelocityX(-speed);
            sprite.setFlipX(true);
        } 
        else if (keys.right.isDown) 
        {
            sprite.body.setVelocityX(speed);
            sprite.setFlipX(false);
        }

        // Vertical movement
        if (keys.up.isDown) 
        {
            sprite.body.setVelocityY(-speed);
        } 
        else if (keys.down.isDown) 
        {
            sprite.body.setVelocityY(speed);
        }
    }

    playerMovesAnims(keys, sprite)
    {
        const prevVelocity = sprite.body.velocity.clone();
        if (keys.left.isDown || keys.right.isDown) 
        {
            sprite.anims.play("player-walk", true);
        } 
        else if(keys.down.isDown)
        {
            sprite.anims.play("player-walk-front", true);
        } 
        else if (keys.up.isDown) 
        {
            sprite.anims.play("player-walk-back", true);
        } 
        else 
        {
            sprite.anims.stop();
            // If we were moving & now we're not, then pick a single idle frame to use
            if (prevVelocity.y < 0) sprite.anims.play("player-idle", true);//sprite.setTexture('characters', 8);
            else sprite.anims.play("player-idle", true);//sprite.setTexture('characters', 8);
        }
    }

    freeze() 
    {
        this.sprite.body.moves = false;
    }

    destroy() 
    {
        this.sprite.destroy();
    }
    
}