import Phaser from './libs/phaser';

import BootState from './states/bootState';
import PreLoadState from './states/preLoadState';
import NavState from './states/navState';
import GameState from './states/gameState';

class Game extends Phaser.Game {
  constructor () {

    let {windowWidth, windowHeight} = wx.getSystemInfoSync();

    const conf = {
        width: windowWidth,
        height: windowHeight,
        canvas: canvas,
        renderer: Phaser.WEBGL,
        parent: 'phaser',
        transparent: false,
        antialias: false,
        scaleMode: Phaser.ScaleManager.EXACT_FIT,
        type: Phaser.AUTO,
        physics: {
            default: 'arcade',
            arcade: {
               gravity: { y: 300 },
                debug: false
            }
        }
    };

    super(conf)

    //如果第三个参数为true,Phaser会自动打开该state
    this.state.add('BootState', BootState)
    this.state.add('PreLoadState', new PreLoadState(""))
    this.state.add('NavState', NavState)
    this.state.add('GameState', GameState)

    this.state.start('BootState')
  }
}
//微信中直接new就可以
new Game()