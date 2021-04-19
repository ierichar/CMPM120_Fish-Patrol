class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('fisherman', './assets/fisherman.png');
        this.load.image('fishingbob', './assets/fishingbob.png');
        this.load.image('redfish', './assets/redfish.png');
        this.load.image('bluefish', './assets/bluefish.png');
        this.load.image('greenfish', './assets/greenfish.png');

        this.load.image('clouds', './assets/clouds.png');
        this.load.image('sunset', './assets/sunset.png');
        this.load.image('underwater', './assets/underwater.png');
        this.load.image('sunandmoon', './assets/sunandmoon.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        // place environment
        this.sunset = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'sunset').setOrigin(0, 0);
        this.underwater = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'underwater').setOrigin(0, 0);
        this.sunandmoon = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'sunandmoon').setOrigin(0, 0);
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'clouds').setOrigin(0, 0);

        // add rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, borderUISize + borderPadding + borderUISize * 4.1, 'fishingbob').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2, borderUISize + borderPadding + borderUISize * 4.1, 'fisherman').setOrigin(0.5, 0);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 11, 'redfish', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 9, 'bluefish', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 6, 'greenfish', 0, 10).setOrigin(0, 0);

        // mahogany outer borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x855E42).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x855E42).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x855E42).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x855E42).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize
        + borderPadding * 35, this.p1Score, scoreConfig);

        this.timeRight = this.add.text(borderUISize + borderPadding, borderUISize
            + borderPadding * 35, this.p1Score, game.config.gameTimer);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.underwater.tilePositionX += starSpeed;
        this.sunset.tilePositionX = 0;
        this.sunandmoon.tilePositionX -= skySpeed;
        this.clouds.tilePositionX -= cloudSpeed;

        if (!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();   
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
            return false;
        }
            
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        

        this.sound.play('sfx_splash');
    }
}