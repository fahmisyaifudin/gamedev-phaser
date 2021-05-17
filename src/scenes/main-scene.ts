import { Player } from "../objects/player";
import { Larutan } from "../enum/mode";

export class MainScene extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Player
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private asam: Phaser.Physics.Arcade.Group
  private basa: Phaser.Physics.Arcade.Group
  private scoreText: any;
  private modeText: any;
  private score: number;

  private respawnTime: Phaser.Time.TimerEvent;

  private isShiftButton: Phaser.Input.Keyboard.Key;
  private mode: Larutan;

  body: Phaser.Physics.Arcade.Body
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('coffee', 'assets/coffee.png');
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

    this.asam = this.physics.add.group();
    this.basa = this.physics.add.group();

    this.respawnTime = this.time.addEvent({
      delay: 2000,
      callback: this.respawnAsam,
      callbackScope: this,
      loop: true
    })

    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Score: ' + this.score);
    this.mode = Larutan.Asam;
    this.modeText = this.add.text(116, 16, 'Mode: ' + Larutan[this.mode]);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.overlap(this.player, this.asam, this.collectAsam, null, this);
    this.physics.add.overlap(this.player, this.basa, this.collectBasa, null, this);

    this.isShiftButton = this.input.keyboard.addKey('SHIFT');
  }

  update(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    if (this.cursors.left.isDown) {
      this.player.turn('LEFT');
    }else if (this.cursors.right.isDown) {
      this.player.turn('RIGHT');
    }else {
      this.player.turn('IDLE');
    }

    if (this.input.keyboard.checkDown(this.isShiftButton, 500)) {
      if (this.mode == Larutan.Asam) {
        this.mode = Larutan.Basa;
      } else {
        this.mode = Larutan.Asam;
      }
      this.modeText.setText('Mode: ' + Larutan[this.mode]);
    }
  }

  private respawnAsam() {
    let value = Phaser.Math.Between(0, 1)
    if (value == 0) {
      this.asam.create(Phaser.Math.Between(50, 750), 0, 'star'); 
    } else {
      this.basa.create(Phaser.Math.Between(50, 750), 0, 'coffee');
    }
  }

  private collectAsam(player: Player, star: any) {
    star.disableBody(true, true);
    if (this.mode == Larutan.Asam) {
      this.score++;
      this.respawnTime.timeScale += 0.05;
    } else {
      this.score--;
    }

    this.scoreText.setText('Score: ' + this.score)
  }

  private collectBasa(player: Player, star: any) {
    star.disableBody(true, true);
    if (this.mode == Larutan.Basa) {
      this.score++;
      this.respawnTime.timeScale += 0.05;
    } else {
      this.score--;
    }
    this.scoreText.setText('Score: ' + this.score)
  }
}
