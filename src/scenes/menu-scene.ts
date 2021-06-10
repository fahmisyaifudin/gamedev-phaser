import { ISceneConstructor } from "../interfaces/scene.interface";

export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private title: string;
  private titleBitmapText: Phaser.GameObjects.BitmapText;
  private playBitmapText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  preload() : void{
    this.cameras.main.setBackgroundColor(0x98d687);
  }

  init(data: ISceneConstructor): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.startKey.isDown = false;
    this.title = data.title ? data.title : ''
  }

  create(): void {
    this.titleBitmapText = this.add.bitmapText(
      0,
      200,
      'font',
      'SARU NO DIETTO',
      30
    );

    this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.titleBitmapText.width
    );

    this.playBitmapText = this.add.bitmapText(0, 300, 'font', this.title ? this.title : 'ENTER: PLAY \n F1  : HELP', 25);

    this.playBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.playBitmapText.width
    );
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('MainScene');
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}