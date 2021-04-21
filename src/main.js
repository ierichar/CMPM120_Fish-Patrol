/***
 * Ian Richardson, ierichar
 * Spring 2021, CMPM 120
 * Rocket Patrol Mod Assignment - 'Fishing Patrol'
 * Estimated Completion Time: ~ 10 hours
 * 
 * main.js
 */
// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 0.1;
let skySpeed = 0.01;
let cloudSpeed = 0.05;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT;