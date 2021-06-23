import { ISceneConstructor } from "../interfaces/scene.interface";
import { collection, getDocs, limit, orderBy } from "firebase/firestore"; 

import { initializeApp } from "firebase/app"
import { getFirestore, query } from "firebase/firestore"

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBm8Mkj2xapIYDXyeOzUGj305GL_YgJ-Yo',
  authDomain: 'diet-si-monkey.firebaseapp.com',
  projectId: 'diet-si-monkey'
});

const db = getFirestore();

export class MenuScene extends Phaser.Scene {
  private startKey: Phaser.Input.Keyboard.Key;
  private helpKey: Phaser.Input.Keyboard.Key;
  private title: string;
  private score: number;
  private titleBitmapText: Phaser.GameObjects.BitmapText;
  private playBitmapText: Phaser.GameObjects.BitmapText;
  private element: Phaser.GameObjects.DOMElement

  constructor() {
    super({
      key: 'MenuScene'
    });
  }

  preload() : void{
    this.cameras.main.setBackgroundColor(0x98d687);
    this.load.html('nameform', 'assets/html/formname.html');
  }

  init(data: ISceneConstructor): void {
    this.startKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.helpKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.F1
    );

    this.startKey.isDown = false;
    this.helpKey.isDown = false;

    this.title = data.title ? data.title : ''
    this.score = data.score ? data.score : 0

  }

  create(): void { 
    if (this.title == 'GAME OVER') {
      this.playBitmapText = this.add.bitmapText(300, 300, 'font', 'SCORE : ' + this.score, 25);

      this.playBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.playBitmapText.width
      );
      
      this.titleBitmapText = this.add.bitmapText(
        0,
        200,
        'font',
        'GAME OVER',
        30
      );
  
      this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.titleBitmapText.width
      );

      const querySnapshot = getDocs(query(collection(db, "highscores"), orderBy("score", "desc"), limit(3))).then(query => {
        let text = "HIGHSCORE \n"
        query.forEach((doc) => {
            let data = doc.data();
            text += data.name + ' : ' + data.score + '\n'
        })
        this.add.bitmapText(320, 400, 'font', text, 18);
      });

    }else {
      this.element = this.add.dom(410, 300).createFromCache('nameform');
      this.element.addListener('click');
      let _this = this;
      this.element.on('click', function(event: any){
          if (event.target.name === 'playButton') {
            let inputName = this.getChildByName('nameField');
            _this.scene.start('MainScene', { player: inputName.value });
          }
      })

      this.playBitmapText = this.add.bitmapText(250, 340, 'font', 'F1  : INSTRUKSI', 25); 

      this.titleBitmapText = this.add.bitmapText(
        0,
        200,
        'font',
        'DIET SI MONKI',
        30
      );
  
      this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
        this.titleBitmapText.width
      );
    }
  }

  update(): void {
    if (this.startKey.isDown) {
      this.scene.start('MainScene');
    }

    if (this.helpKey.isDown) {
      this.scene.start('InstructionScene');
    }
  }

  private getCenterXPositionOfBitmapText(width: number): number {
    return this.sys.canvas.width / 2 - width / 2;
  }
}