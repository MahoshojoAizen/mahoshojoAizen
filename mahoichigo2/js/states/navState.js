/**
 * 导航页面
 */
import Phaser from '../libs/phaser';

export default class NavState extends Phaser.State{
    init(){
      console.log("启动 navState");
    }
    preload(){

    }
    create(){
      this.createDisplayObj();
    }
    update(){
    }
    createDisplayObj(){
      let {windowWidth, windowHeight} = wx.getSystemInfoSync();
      let game = this.game;
      //背景色
      game.stage.backgroundColor = '#727272';
      //创建背景图片
      //添加精灵对象
      let aizen = game.add.sprite(windowWidth / 2, windowHeight / 2-100, 'aizen_walk');
      aizen.scale.set(1, 1);
      aizen.anchor.set(0.5, 0.5);
      //名为walk的动画，播放0~24帧，每秒10帧，true代表循环播放
      aizen.animations.add('walk', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], 10, true);
      aizen.play('walk');
      //背景旋转动画
      //let bgpreloadImgTween = game.add.tween(bgpreloadImg).to({angle:360},100000,"Linear",true,0,-1,false);

      let startImg = game.add.image(windowWidth / 2, windowHeight / 2+100, "start_game");
      startImg.anchor.set(0.5,0.5);
      startImg.inputEnabled = true;
      startImg.events.onInputUp.add(() => {
        console.log("跳转页面");
        //停止动画
        aizen.animations.stop();
        this.state.start('GameState')
      });
    }
}