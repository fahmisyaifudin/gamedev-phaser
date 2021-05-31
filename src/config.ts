import { MenuScene } from './scenes/menu-scene';
import { MainScene } from './scenes/main-scene';
import { BootScene } from './scenes/boot-scene';

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
  scene: [BootScene, MenuScene, MainScene]
};
