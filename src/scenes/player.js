export default class Player {
    constructor(player) {
        this.player = player;
        this.sprite = player.physics.add.sprite(0, 500, 'p_idle');
        this.sprite.setCollideWorldBounds(true);

        player.anims.create({
            key: 'right',
            frames: player.anims.generateFrameNames('p_run', {
                start: 0, end: 9, zeroPad: 3,
                prefix: 'Run__', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        player.anims.create({
            key: 'left',
            frames: player.anims.generateFrameNames('p_run', {
                start: 0, end: 9, zeroPad: 3,
                prefix: 'Run__', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1

        })

        player.anims.create({
            key: 'jump',
            frames: player.anims.generateFrameNames('p_jump', {
                start: 0, end: 9, zeroPad: 3,
                prefix: 'Jump__', suffix: '.png'
            }),
            frameRate: 10,
            repeat: 1

        })

        player.anims.create({
            key: 'idle',
            frames: player.anims.generateFrameNames('p_idle', {
                start: 0, end: 9, zeroPad: 3,
                prefix: 'Idle__', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

        player.anims.create({
            key: 'attack',
            frames: player.anims.generateFrameNames('p_attack', {
                start: 0, end: 9, zeroPad: 3,
                prefix: 'Attack__', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

    }
}