export class InstructionScene extends Phaser.Scene {
  private backKey: Phaser.Input.Keyboard.Key;
  private title: string;
  private titleBitmapText: Phaser.GameObjects.BitmapText;
  private descBitmapText: Phaser.GameObjects.BitmapText;

  constructor() {
    super({
      key: 'InstructionScene'
    });
  }

  preload() : void{
    this.cameras.main.setBackgroundColor(0x98d687);

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
  }

  init(): void {
    this.backKey = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.BACKSPACE
    );
  }

  create(): void {
    this.add.image(300, 300, 'apple');
    this.add.image(330, 300, 'banana');
    this.add.image(360, 300, 'wortel');
    this.add.image(390, 300, 'lemon');
    
    this.add.image(330, 330, 'meat');
    this.add.image(360, 330, 'fish');
    this.add.image(390, 330, 'egg');

    this.add.image(360, 360, 'chocolate');
    this.add.image(390, 360, 'cheese');

    this.add.image(360, 390, 'bread');
    this.add.image(390, 390, 'potato');

    this.titleBitmapText = this.add.bitmapText(
      0,
      100,
      'font',
      'INSTRUKSI : ',
      18
    );

    this.descBitmapText = this.add.bitmapText(0,160,'font',
        'SELAMAT DATANG DI DIET SI MONKI', 
    14);

    this.descBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.descBitmapText.width
    );

    this.descBitmapText = this.add.bitmapText(0,180,'font',
        'SI MONKI SANGAT SUKA MAKAN', 
    14);

    this.descBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.descBitmapText.width
    );

    this.descBitmapText = this.add.bitmapText(0,200,'font',
     'SUATU HARI SI MONKI SADAR DAN HANYA MAKAN DENGAN GIZI BERIMBANG', 
    14);

    this.descBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.descBitmapText.width
    );

    this.descBitmapText = this.add.bitmapText(0,220,'font',
      'BANTU SI MONKI UNTUK MEMILIH MAKANANYA', 
    14);

    this.descBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.descBitmapText.width
    );

    this.descBitmapText.x = this.getCenterXPositionOfBitmapText(
      this.descBitmapText.width
    );

    this.descBitmapText = this.add.bitmapText(420,290,'font',
     '= VITAMIN', 
    14);

    this.descBitmapText = this.add.bitmapText(420,320,'font',
     '= PROTEIN', 
    14);

    this.descBitmapText = this.add.bitmapText(420,350,'font',
    '= LEMAK', 
    14);

    this.descBitmapText = this.add.bitmapText(420,380,'font',
    '= KARBONHIDRAT', 
    14);

    this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.titleBitmapText.width
     );
  }

  update(): void {
    if (this.backKey.isDown) {
      this.scene.start('MenuScene');
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}