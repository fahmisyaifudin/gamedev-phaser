import { MenuScene } from './scenes/menu-scene';
import { MainScene } from './scenes/main-scene';
import { BootScene } from './scenes/boot-scene';
import { InstructionScene } from './scenes/instruction-scene';
import { HighScoreScene } from './scenes/highscore-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Webpack-Boilerplate',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 800,
  height: 600,
  backgroundColor: 0x3a404d,
  type: Phaser.AUTO,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 100 }
    }
  },
  dom: {
    createContainer: true
  },
  scene: [BootScene, MenuScene, MainScene, InstructionScene, HighScoreScene]
};
