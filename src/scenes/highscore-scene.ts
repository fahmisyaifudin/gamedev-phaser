import { getFirestore, query, collection, getDocs, limit, orderBy } from "firebase/firestore"

const db = getFirestore();

export class HighScoreScene extends Phaser.Scene {
    private element: Phaser.GameObjects.DOMElement
    constructor() {
      super({
        key: 'HighScoreScene'
      });
    }
  
    preload() : void{
      this.cameras.main.setBackgroundColor(0x98d687);
  
      this.load.html('backToMenu', 'assets/html/back.html');
    }
  
    create(): void {
        const querySnapshot = getDocs(query(collection(db, "highscores"), orderBy("score", "desc"), limit(10))).then(query => {
            let text = "HIGHSCORE \n\n"
            query.forEach((doc) => {
                let data = doc.data();
                text += data.name + ' : ' + data.score + '\n'
            })
            this.add.bitmapText(50, 50, 'font', text, 18);
          });

          this.element = this.add.dom(700, 500).createFromCache('backToMenu');
          this.element.addListener('click');
          let _this = this;
          this.element.on('click', function(event: any){
              if (event.target.name === 'backToMenu') {
                _this.scene.start('MenuScene');
              }
          })
    }
  
    private getCenterXPositionOfBitmapText(width: number): number {
      return this.sys.canvas.width / 2 - width / 2;
    }
  }