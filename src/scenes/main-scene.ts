import { Player } from "../objects/player";

export class MainScene extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Player
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private stars: Phaser.Physics.Arcade.Group
  private scoreText: any;
  private score: number;
  body: Phaser.Physics.Arcade.Body
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png',{ frameWidth: 32, frameHeight: 48 });
  }

  create(): void {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.player = new Player({
      scene: this,
      x: 100,
      y: 400,
      texture: 'dude'
    })

    this.stars = this.physics.add.group();

    this.time.addEvent({
      delay: 2000,
      callback: this.respawnFruit,
      callbackScope: this,
      loop: true
    })
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: ' + this.score);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
  }

  update(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player.turn('LEFT');
    }else if (this.cursors.right.isDown) {
      this.player.turn('RIGHT');
    } else {
      this.player.turn('IDLE');
    }
  }

  private respawnFruit() {
    this.stars.create(Phaser.Math.Between(50, 750), 0, 'star')
  }

  private collectStar(player: Player, star: any) {
    star.disableBody(true, true);
    this.score++
    this.scoreText.setText('Score: ' + this.score)
  }
}
