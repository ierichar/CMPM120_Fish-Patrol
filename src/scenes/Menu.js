/***
 * Ian Richardson, ierichar
 * Spring 2021, CMPM 120
 * Rocket Patrol Mod Assignment - 'Fishing Patrol'
 * Estimated Completion Time: ~ 10 hours
 * 
 * Menu.js
 */
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_splash', './assets/inspectorj__water-swirl-small-21.wav');
        this.load.audio('sfx_reel', './assets/paulprit__fly-fishing-reel-running-2.wav');
        this.load.audio('backgroundmusic', './assets/Crowander - Easy - Easy.mp3');

        // load title card
        this.load.image('titlecard', './assets/titlecard.png');
    }

    create() {
        this.titlecard = this.add.tileSprite(0, 0, game.config.width, game.config.height,
        'titlecard').setOrigin(0, 0);
        this.sound.play('backgroundmusic');

        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#C04000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*3 + borderPadding*3, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#0000FF';
        menuConfig.fontSize = '16px';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding*4, 'Splash noise by inspectorj', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4.5 + borderPadding*4.5, 'Reel noise by paulprit', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#FF0000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*5 + borderPadding*5, 'Music: Easy by Crowander', menuConfig).setOrigin(0.5);
        
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}

// init() prepares any data for the scene
// preload() prepares any assets we'll need for the scene
// create() adds objects to the scene
// update() is a loop that runs continuously and allows us to update game objects