/**
 * 资源加载页面
 * 用于资源加载
 */
import Phaser from '../libs/phaser';

export default class PreLoadState extends Phaser.State{
    constructor(keyState){
      super();
      this.keyState = keyState;
    }
    init(){
      console.log("启动 PreLoad");
    }
    preload(){
      //加载资源
      this.loadAssets();
      //处理加载资源的动画
      this.createDisplayObj();

    }
    create(){
      if (this.keyState){
        this.state.start(this.keyState);
      }else {
        this.state.start('NavState');
      }
    }
    update(){
    }
    loadAssets(){
      let game = this.game;

      this.errorList = [];
      game.load.onFileError.add((key, file) => {
        this.errorList.push({
          key: key,
          errorMessage: file.errorMessage
        })
      })
      game.load.onFileComplete.add((progress) => {
        //1.根据加载的进度实时计算遮罩矩形的宽度
        let length = progress/100*this.progressImg.width;
        this.maskGraphics.clear();
        this.maskGraphics.drawRect(-progressImg.width/2,-progressImg.height/2,progressImg.width,progressImg.height);
        this.maskGraphics.endFill();

        if(progress == 100){
          //模拟上报服务器
          if(this.errorList.length){
            console.log("失败的资源:"+JSON.stringify(this.errorList));
          }
        }
      })
    }
    createDisplayObj(){
      let {windowWidth, windowHeight} = wx.getSystemInfoSync();
      let game = this.game;
      //创建背景图片
      let bgpreloadImg = game.add.image(windowWidth / 2, windowHeight / 2,"bgnav");
      bgpreloadImg.width = windowWidth*3;
      bgpreloadImg.height = windowHeight*3;
      bgpreloadImg.anchor.set(0.5,0.5);
      //背景旋转动画
      let bgpreloadImgTween = game.add.tween(bgpreloadImg).to({angle:360},100000,"Linear",true,0,-1,false);

      //动画
      let snailGroup = game.add.group();
      snailGroup.position.set(windowWidth/2,windowHeight/2);
      let progressImg = game.add.image(0,0,'progress',null,snailGroup);
      progressImg.anchor.set(0.5,0.5);

      let progressScale = windowWidth*0.7/progressImg.width;
      progressImg.scale.set(progressScale,progressScale);

      //创建遮罩
      let maskGraphics = game.add.graphics(0,0,snailGroup);
      maskGraphics.beginFill(0xffffff); //注意颜色的格式
      maskGraphics.drawRect(-progressImg.width/2,-progressImg.height/2,progressImg.width,progressImg.height);
      maskGraphics.endFill();
      this.maskGraphics = maskGraphics;
      progressImg.mask = maskGraphics;
      this.progressImg = progressImg;

      let snailImg = game.add.image(0,-progressImg.height/2-30,"logo",null,snailGroup);
      snailImg.anchor.set(0.5,1);
      //snailImg.scale.set(progressScale,progressScale);
      let snailImgTween = game.add.tween(snailImg).to({y:-progressImg.height/2-15},1000,"Linear",true,0,-1,true);

      let loadingImg = game.add.image(-15,progressImg.height/2+10,"loading",null,snailGroup);
      loadingImg.anchor.set(0.5,0);
      loadingImg.scale.set(progressScale,progressScale);
      let loadingImgTween = game.add.tween(loadingImg).to({x:3},1000,"Linear",true,0,-1,true);

      let developInfoGroup = game.add.group();
      //developInfoGroup.position.set(windowWidth/2,windowHeight);
      let logoImg = game.add.image(0,0,"logo",null,developInfoGroup);
      logoImg.scale.set(0.5,0.5);
      let infoText = game.add.text(40,12,"MahoIchigo",{
        font: '16px',
        fill: "#ffffff",
        align: "center"
      },developInfoGroup)

      let developTexture = developInfoGroup.generateTexture();
      let developInfoGroupImg = game.add.image(windowWidth/2-10,windowHeight-15,developTexture);
      developInfoGroupImg.anchor.set(0.5,1);
      developInfoGroup.destroy();
    }
}