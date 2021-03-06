/***
 * Ian Richardson, ierichar
 * Spring 2021, CMPM 120
 * Rocket Patrol Mod Assignment - 'Fishing Patrol'
 * Estimated Completion Time: ~ 10 hours
 * 
 * Rocket.js
 */
// Rocket (projectile) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.sfxRocket = scene.sound.add('sfx_reel'); // add rocket sfx

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track rocket firing status
        this.moveSpeed = 2;         // pixels per frame
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - 
                this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired, move the rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y += this.moveSpeed;
        }
        // reset on miss
        if(this.y >= game.config.height - borderUISize - borderPadding) {
            this.reset();
        }
    }

    // reset rocekt to "ground"
    reset() {
        this.isFiring = false;
        this.y = borderUISize + borderPadding + borderUISize * 4.1;
        this.sfxRocket.stop();
    }
}