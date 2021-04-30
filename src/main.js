/***
 * Ian Richardson, ierichar
 * Spring 2021, CMPM 120
 * Rocket Patrol Mod Assignment - 'Fishing Patrol'
 * Estimated Completion Time: ~ 10 hours
 * 
 * main.js
 * 
 * S(hrek) Tier: (60) Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
 * - Replaced rocket with fisherman and fishing bob, as well as the spaceships with fish.
 * - UI altered to match fishing theme
 * - Hit sound on fish changed to splash
 * Intermediate Tier: (20) Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
 * - Implemented small goldfish worth 100 points (moves faster)
 * Novice Tier: (10) Implement parallax scrolling
 * - Implemented parallax scrolling with fish, sky and clouds
 * Starting Tier: (5) Add your own (copyright-free) background music to the Play scene
 * - Added copyright-free music from freemusic.org
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