/***
 * Ian Richardson, ierichar
 * Spring 2021, CMPM 120
 * Rocket Patrol Mod Assignment - 'Fishing Patrol'
 * Estimated Completion Time: ~ 10 hours
 * 
 * Goldfish.js
 */
class Goldfish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                         // add to existing scene
        this.points = pointValue;                         // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;    // pixels per frame
    }

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        // wrap around from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}