import { Player } from "../objects/player";
import { Larutan, Gizi } from "../enum/mode";
import { IFood, FoodSetting } from "../objects/food";

import { getFirestore, collection, addDoc } from "firebase/firestore"
import { ISceneConstructor } from "../interfaces/scene.interface";

const db = getFirestore();

export class MainScene extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Player
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private food: IFood = {};
  private asam: Phaser.Physics.Arcade.Group
  private basa: Phaser.Physics.Arcade.Group
  private scoreText: any;
  private shiftBtn: Phaser.Input.Keyboard.Key;
  private modeText: any;

  private score: number;
  private giziLength: number;

  private respawnTime: Phaser.Time.TimerEvent;
  private hpAutoDecreaseTime: Phaser.Time.TimerEvent;

  private isShiftButton: Phaser.Input.Keyboard.Key;
  private mode: Gizi;

  private playerName: string;

  body: Phaser.Physics.Arcade.Body
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    this.load.image('sky', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');

    this.load.image('apple', 'assets/food/apple.png');
    this.load.image('banana', 'assets/food/banana.png');
    this.load.image('bread', 'assets/food/bread.png');
    this.load.image('cheese', 'assets/food/cheese.png');
    this.load.image('chocolate', 'assets/food/chocolate.png');
    this.load.image('egg', 'assets/food/egg.png');
    this.load.image('fish', 'assets/food/fish.png');
    this.load.image('lemon', 'assets/food/lemon.png');
    this.load.image('meat', 'assets/food/meat.png');
    this.load.image('potato', 'assets/food/potato.png');
    this.load.image('wortel', 'assets/food/wortel.png');
   
    this.load.spritesheet('monkey', 'assets/monkey.png',{ frameWidth: 32, frameHeight: 48 });
  }

  init(data: ISceneConstructor) : void {
    this.shiftBtn = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    this.playerName = data.player ? data.player : '';
  }

  create(): void {

    this.add.image(400, 300, 'sky');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.player = new Player({
      scene: this,
      x: 100,
      y: 400,
      texture: 'monkey'
    })

    this.giziLength = Object.keys(Gizi).length / 2;

    for (let i = 0; i < this.giziLength; i++) {
      this.food[i] = this.physics.add.group(); 
    }
    

    this.respawnTime = this.time.addEvent({
      delay: 3000,
      callback: this.respawnFood,
      callbackScope: this,
      loop: true
    })

    this.hpAutoDecreaseTime = this.time.addEvent({
      delay: 1000,
      callback: this.autoHpDecrease,
      callbackScope: this,
      loop: true
    })

    this.score = 0;
    this.mode = Gizi.Karbonhidrat;
    this.modeText = this.add.text(16, 16, 'Misi: \n' + Gizi[this.mode]);

    this.physics.add.collider(this.player, this.platforms);

    for (let i = 0; i < this.giziLength; i++) {
      this.physics.add.overlap(this.player, this.food[i], this.collectFood, null, this);
    }

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

    if (this.input.keyboard.checkDown(this.shiftBtn, 500)) {
      this.changeMode()
    }
  }

  private respawnFood() {
    let key = Phaser.Math.Between(0, this.giziLength - 1);
    let foodItem = Phaser.Math.Between(0, FoodSetting[key].length - 1);
    this.food[key].create(Phaser.Math.Between(50, 750), 0, FoodSetting[key][foodItem]);
  }

  private changeMode(){
    if (this.mode != (Object.keys(Gizi).length / 2) - 1) {
      this.mode++;
    } else {
      this.mode = 0;
    }
    this.modeText.setText('Misi: \n' + Gizi[this.mode]);
  }

  private collectFood(player: Player, food: Phaser.Physics.Arcade.Image) {
    food.disableBody(true, true);
    let foodSelect = Object.values(FoodSetting).findIndex(value => value.includes(food.texture.key))
    if (this.mode == foodSelect) {
      this.player.hpIncrease();
      this.score++;
      this.changeMode()
      this.respawnTime.timeScale += 0.05;
    } else {
      this.player.hpDecrease();
      this.changeMode()
      this.score--;
    }
    this.hpAutoDecreaseTime.timeScale += 0.01;
  }

  private autoHpDecrease(){
    if (this.player.hpVal <= 0) {
      this.scene.pause();
      addDoc(collection(db, "highscores"), {
        name: this.playerName.toUpperCase(),
        score: this.score,
      }).then(() => this.scene.start('MenuScene', { title: 'GAME OVER', score: this.score }));
      // this.scene.start('MenuScene', { title: 'GAME OVER', score: this.score })
    }else{ 
      this.player.hpDecrease(10)
    }
  }
}
