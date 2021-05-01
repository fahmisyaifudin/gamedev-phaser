import { ISpriteConstructor } from "../interfaces/sprite.interface";


export class Player extends Phaser.GameObjects.Sprite {
  body: Phaser.Physics.Arcade.Body;

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);

      this.initSprite();
      this.initAnimation();
      this.scene.add.existing(this);
  }

    private initSprite() {
        this.scene.physics.world.enable(this);
        this.body.setBounce(0.2, 0);
        this.body.setCollideWorldBounds(true);
    }

    private initAnimation() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
          });
        
          this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
    
    public turn(key: string): void{
        if (key == 'LEFT') {
            this.body.setVelocityX(-160);
            this.anims.play('left', true)
        } else if (key == 'RIGHT') {
            this.body.setVelocityX(160);
            this.anims.play('right', true);
        } else if (key == 'IDLE') {
            this.body.setVelocityX(0);
            this.anims.play('turn');
        }
    }
}
