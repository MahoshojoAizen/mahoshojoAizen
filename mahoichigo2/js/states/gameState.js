/**
 * 主功能页面
 */
import Phaser from '../libs/phaser';
import AllDoors from '../doors/index';

const {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync(); //获取系统长宽
var stars; //星星组
var heart_tools; //心心组
var sheld_tools; //防御组
var platforms; //平台组
var player; //玩家
var miniPlayerPoint; //小地图标记
var score; //计分
var uiGroup; //UI元件
var backgroundGroup; //场景组
var scoreText; //分数栏
var timeText; //计时
var sheldText; //防御等级
var safeState; //安全区状态
var safeDis; //安全距离
var miniMap; //小地图
var disBtn; //摇杆组
var lastDirection = 'left'; //刚刚的朝向，用以判定静止时朝向，left、right，初始朝左
var timeInSeconds = 300; //倒计时总时间300秒
var isFirstLanded = false;
var poisonX; //毒圈中心X
var poisonY; //毒圈中心Y
var poisonR; //毒圈半径


export default class GameState extends Phaser.State {
  init() {
    console.log("启动 GameState");
    //wx.clearStorage();
    //打开物理系统
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //设置游戏世界的范围
    this.game.world.setBounds(0, 0, 4800, 4800);
    //初始化时间
    timeInSeconds = 300;
    //初始化分数
    score = 0;
    //初始化毒圈
    poisonX = 2400;
    poisonY = 2400;
    poisonR = 2500;
  }
  preload() {

  }
  create() {
    //创建场景
    this.createDisplayObj();
    //创建平台
    this.createPlatforms();
    //创建玩家
    this.createHero();
    //创建道具
    this.createStars();
    //创建UI
    this.createUI();
    //创建计时器
    this.timer = this.game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);
  }

  createPlatforms() {
    //静态物理组
    let game = this.game;
    //物理平台组
    platforms = game.add.group();
    //允许组内成员具有物理属性
    platforms.enableBody = true;
    //设置物理平台透明
    platforms.alpha = 0.1;

    var ground = platforms.create(0, 4740, "ledge");
    ground.scale.setTo(9.6, 0.5); //设置地面尺寸
    ground.body.immovable = true; //使地面固定

    //添加平台
    var ledge1 = platforms.create(0, 1867, "ledge");
    ledge1.scale.setTo(1, 0.5);
    ledge1.body.immovable = true;
    var ledge2 = platforms.create(1340, 1867, "ledge");
    ledge2.scale.setTo(7, 0.5);
    ledge2.body.immovable = true;

    var ledge3 = platforms.create(0, 2820, "ledge");
    ledge3.scale.setTo(1.2, 0.5);
    ledge3.body.immovable = true;
    var ledge4 = platforms.create(1104, 2820, "ledge");
    ledge4.scale.setTo(7.4, 0.5);
    ledge4.body.immovable = true;

    var ledge5 = platforms.create(0, 3784, "ledge");
    ledge5.scale.setTo(1.2, 0.5);
    ledge5.body.immovable = true;
    var ledge6 = platforms.create(1056, 3784, "ledge");
    ledge6.scale.setTo(7.4, 0.5);
    ledge6.body.immovable = true;

    //特别平台
    //底层沙堆
    var ledge8 = platforms.create(608, 4474, "ledge");
    ledge8.scale.setTo(0.5, 0.5);
    ledge8.body.immovable = true;
    //地面门口
    var ledge9 = platforms.create(1568, 1660, "ledge");
    ledge9.scale.setTo(2.5, 2);
    ledge9.body.immovable = true;
    var ledge10 = platforms.create(2820, 1725, "ledge");
    ledge10.scale.setTo(4, 1.44);
    ledge10.body.immovable = true;
    //地面门顶
    var ledge11 = platforms.create(3388, 1056, "ledge");
    ledge11.scale.setTo(1.1, 0.2);
    ledge11.body.immovable = true;
    //月亮
    var ledge12 = platforms.create(3360, 345, "ledge");
    ledge12.scale.setTo(0.25, 0.2);
    ledge12.body.immovable = true;
    //宫殿
    var ledge13 = platforms.create(1764, 1106, "ledge");
    ledge13.scale.setTo(1.7, 0.2);
    ledge13.body.immovable = true;
    //树枝
    var ledge14 = platforms.create(900, 1101, "ledge");
    ledge14.scale.setTo(0.65, 0.2);
    ledge14.body.immovable = true;
    //树枝2
    var ledge15 = platforms.create(432, 885, "ledge");
    ledge15.scale.setTo(0.25, 0.2);
    ledge15.body.immovable = true;
  }

  createHero() {
    let game = this.game;
    //添加精灵对象
    player = game.add.sprite(2428, 1440, 'lulu_walk');
    player.scale.set(1, 1);
    //设置初始动作帧
    player.frame = 8; //默认朝向左
    //镜头跟随主角
    game.camera.follow(player);
    //player物理开关
    game.physics.arcade.enable(player);
    //玩家物理设置
    player.body.bounce.y = 0.1;
    player.body.gravity.y = 300; //设置重力参数，数值越高物体越重
    player.body.collideWorldBounds = true; //true使player不能掉出边界
    //动画设置
    //名为walk_left的动画，播放7、6、4、2、0帧，每秒8帧，true代表循环播放
    player.animations.add('walk_left',   [7,  6,  4,  2,  0],  8,  true);
    player.animations.add('walk_right',   [10,  11,  13,  15,  17],  8,  true);
    player.animations.add('jump_left',   [18, 20, 22, 24, 26],  5, false);
    player.animations.add('jump_right',   [35, 33, 31, 29, 27],  5, false);     

    //摇杆组
    this.disBtn = this.add.group();
    //摇杆背景
    this.disBtn.bg = this.disBtn.create(0, 0, "button1");
    //设置摇杆范围的半径
    this.disBtn.bg.radius = this.disBtn.bg.width / 2;
    //设置摇杆中心点坐标
    this.disBtn.bg.centerPoint = {
      x: this.disBtn.bg.x + this.disBtn.bg.radius,
      y: this.disBtn.bg.y + this.disBtn.bg.radius
    };
    //摇杆按钮
    this.disBtn.btn = this.disBtn.create(this.disBtn.bg.centerPoint.x, this.disBtn.bg.centerPoint.y, "button2");
    this.disBtn.btn.anchor.set(0.5);
    //开启摇杆按钮点击事件
    this.disBtn.btn.inputEnabled = true;
    //开启摇杆按钮拖动功能
    this.disBtn.btn.input.enableDrag();
    //拖动中的回调
    this.disBtn.btn.events.onDragUpdate.add(this.dragUpdate, this);
    //结束拖动回调
    this.disBtn.btn.events.onDragStop.add(this.dragStop, this);

    /**
     * fixedToCamera =>跟随镜头移动
     * cameraOffset.y => 设置摇杆组相对镜头Y坐标的偏移
     */
    this.disBtn.fixedToCamera = true;
    this.disBtn.cameraOffset.y = windowHeight / 2 + this.disBtn.bg.radius + 100;
    this.disBtn.cameraOffset.x = windowWidth / 2 - this.disBtn.bg.radius;
  }

  //根据两点坐标求距离
  disToXY(centerX, centerY, pointX, pointY) {
    var a = pointY - centerY;
    var b = pointX - centerX;
    var c = Math.sqrt(a * a + b * b);
    return c;
  }

  //拖动中回调
  dragUpdate(e) {
    //设置摇杆最大移动范围
    //this.disToXY(摇杆中心点.x, 摇杆中心点.y, 摇杆.x, 摇杆.y)
    var dis = this.disToXY(this.disBtn.bg.centerPoint.x, this.disBtn.bg.centerPoint.y, this.disBtn.btn.x, this.disBtn.btn.y)
    if (dis > this.disBtn.bg.radius) {
      //console.log("超出范围");
      this.disBtn.btn.x = this.disBtn.bg.centerPoint.x;
      this.disBtn.btn.y = this.disBtn.bg.centerPoint.y;
    };
    //按照摇杆与中心点的角度，设置人物移动方向
    //player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(radian * 180 / Math.PI, 200));
    //down = 90 degrees positive, right = 0 degrees positive, up = 90 degrees negative
    var dis_x = this.disBtn.btn.x - this.disBtn.bg.centerPoint.x;
    var dis_y = this.disBtn.btn.y - this.disBtn.bg.centerPoint.y;
    //console.log(player.x + "," + player.y);
    if (dis_x < dis_y && dis_x > -dis_y) {
      //检测是否是特殊洞口
      this.isSpecialDoor()
      //检测是否是向下洞口
      this.isDownDoor();
      //向下
      player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(90, 200));
    } else if (dis_x > dis_y && dis_x > -dis_y) {
      //向右
      player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(0, 200));
      player.play('walk_right');
      lastDirection = 'right';
    } else if (dis_x < dis_y && dis_x < -dis_y) {
      //向左
      player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(180, 200));
      player.play('walk_left');
      lastDirection = 'left';
    } else if (dis_x > dis_y && dis_x < -dis_y) {
      //检测是否是向上洞口
      this.isUpDoor();
      //向上
      player.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(-90, 600));
      if (lastDirection == 'left') {
        player.play('jump_left');
      } else {
        player.play('jump_right');
      }
    }
  }

  //结束拖动回调 => dragStop
  dragStop(e) {
    //重置摇杆按钮坐标为摇杆中心点
    e.x = this.disBtn.bg.centerPoint.x;
    e.y = this.disBtn.bg.centerPoint.y;
    //停止主角运动
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    //停止主角动画
    player.animations.stop();
    //重设主角的纹理
    if (player.body.touching.down) {
      //主角在地面时设置站立动作
      if (lastDirection == 'right') {
        player.frame = 9;
      } else {
        player.frame = 8;
      }
    } else {
      //主角滞空时设置滞空动作
      if (lastDirection == 'right') {
        player.frame = 29;
      } else {
        player.frame = 24;
      }
      isFirstLanded = true;
    }

  }

  //检测是否向下洞口
  isDownDoor() {
    var currentX = player.x;
    var currentY = player.y;
    var doors = AllDoors[0].doors;
    for (var i = 0; i < doors.length; i++) {
      //假如玩家坐标满足门的范围
      if (doors[i].left < currentX && currentX < doors[i].right && currentY == doors[i].height) {
        player.x = doors[i].targetX;
        player.y = doors[i].targetY - 260; //从离地300px处下落，营造下楼感
        break;
      }
    }
  }

  //检测是否向上洞口
  isUpDoor() {
    //console.log("start check up door");
    var currentX = player.x;
    var currentY = player.y;
    var doors = AllDoors[1].doors;
    for (var i = 0; i < doors.length; i++) {
      //假如玩家坐标满足门的范围
      if (doors[i].left < currentX && currentX < doors[i].right && currentY == doors[i].height) {
        player.x = doors[i].targetX;
        player.y = doors[i].targetY;
        //console.log("up door in");
      }
    }
  }

  //检测是否特殊洞口
  isSpecialDoor() {
    //console.log("start check special door");
    var currentX = player.x;
    var currentY = player.y;
    var specialDoors = AllDoors[0].specialDoors[0];
    //假如玩家坐标满足门的范围
    if (specialDoors.left < currentX && currentX < specialDoors.right && currentY == specialDoors.height) {
      var index = Math.floor(Math.random() * 4); //随机获取洞口
      //console.log("special door index " + index);
      if (index <= 3) {
        player.x = AllDoors[0].doors[index].targetX;
        player.y = AllDoors[0].doors[index].targetY;
        //console.log("special door in");
      } else {
        player.x = AllDoors[0].doors[0].targetX;
        player.y = AllDoors[0].doors[0].targetY;
        //console.log("special door in");
      }
    }
  }

  createStars() {
    let game = this.game;
    stars = game.add.group();
    //允许组内成员具有物理属性
    stars.enableBody = true;

    var num = 4800 / 50 - 1;
    for (var i = 0; i < num; i++) {
      var star = stars.create(i * 40, 0, 'star');
      star.body.gravity.y = 300;
      //bounce设置星星的弹性系数
      star.body.bounce.y = 0.3 + Math.random() * 0.2;
    }

    heart_tools = this.game.add.group();
    heart_tools.enableBody = true;
    sheld_tools = this.game.add.group();
    sheld_tools.enableBody = true;

    for (var j = 0; j < 5; j++) {
      this.createTools("heart");
      this.createTools("sheld");
    }

  }

  createUI() {
    let game = this.game;
    uiGroup = game.add.group();
    //整个UI相对镜头固定
    uiGroup.fixedToCamera = true;
    uiGroup.cameraOffset.y = 0;
    uiGroup.cameraOffset.x = 0;
    //创建文本，前两个参数为位置，第三个参数是文本内容，第四个参数是样式
    scoreText = game.add.text(30, 35, 'score: 0', {
      fontSize: '18px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    });
    uiGroup.add(scoreText);
    timeText = game.add.text(150, 35, 'time: 300', {
      fontSize: '18px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    });
    uiGroup.add(timeText);
    //小地图
    var miniMapBack = game.add.image(windowWidth - 120, 120, "miniMapBack", null, uiGroup);
    miniMap = game.add.image(windowWidth - 120, 120, "miniMap", null, uiGroup);
    miniPlayerPoint = uiGroup.create(windowWidth - 120, 120, "point");
    miniPlayerPoint.anchor.set(0.5);
    miniPlayerPoint.animations.add('shine', [0, 1, 2, 3], 5, true);
    miniPlayerPoint.play('shine');

    safeState = game.add.text(windowWidth - 110, 100, 'safe', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    });
    uiGroup.add(safeState);
    safeDis = game.add.text(windowWidth - 50, 100, '0', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 2
    });
    uiGroup.add(safeDis);

    //头像
    var headicon = uiGroup.create(10, 58, "headicon");
    //headicon.scale.setTo(0.3, 0.3);
    //血条
    player.blood = 12;
    player.hearts = [];
    this.updatePlayerBlood();
    //防御力
    player.sheld = 0;
    var sheldLevel = uiGroup.create(75, 110, "sheldLevel");
    //sheldLevel.scale.setTo(0.6, 0.6);
    sheldText = game.add.text(80, 115, player.sheld, {
      fontSize: '12px',
      fill: '#000000',
      align: 'center'
    });
    uiGroup.add(sheldText);
  }

  //更新血量
  updatePlayerBlood() {
    //血量为0时清空计时
    if (player.blood <= 1) {
      timeInSeconds = 0;
    }
    if (!this.isSafe()) {
      //根据防御级别扣血
      player.blood = player.blood - 1 * (100 - player.sheld) / 100;
    }
    //清除血条重新绘制
    for (var j = 0; j < player.hearts.length; j++) {
      player.hearts[j].kill();
    }
    var fullHeartNum = 0;
    if (player.blood > 4) {
      fullHeartNum = Math.floor(player.blood / 4);
      //console.log("full:" + fullHeartNum);
      for (var i = 0; i < fullHeartNum; i++) {
        player.hearts[i] = uiGroup.create(90 + 30 * i, 65, "heart");
        //player.hearts[i].scale.setTo(0.5, 0.5);
        player.hearts[i].frame = 0;
      }
    }
    var leftBlood = Math.floor(player.blood - fullHeartNum * 4);
    if (leftBlood > 0) {
      //console.log("left:" + player.blood);
      player.hearts[fullHeartNum] = uiGroup.create(90 + fullHeartNum * 30, 65, "heart");
      //player.hearts[fullHeartNum].scale.setTo(0.5, 0.5);
      player.hearts[fullHeartNum].frame = 4 - leftBlood; //逆转图片编号
    }
  }

  //判断hero是否在圈内
  isSafe() {
    var poisonDis = this.disToXY(poisonX, poisonY, player.x, player.y);
    var dis = Math.floor(poisonDis - poisonR);
    //console.log("isSafe:" + poisonR + "," + dis);
    if (dis > 0) {
      safeDis.text = dis;
    } else {
      safeDis.text = "0";
    }

    if (poisonDis <= poisonR) {
      safeState.text = "safe";
      return true;
    } else {
      safeState.text = "danger";
      return false;
    }
  }

  createDisplayObj() {
    let game = this.game;
    //灰色背景
    //var map1_grey = game.add.image(0, 0, "map1_grey");
    for (var i = 0; i < 8; i++) { //第i行
      for (var j = 0; j < 8; j++) { //第j列
        let current_mapGrey = game.add.image(j * 600, i * 600, "map_back" + (8 * i + j + 1));
        current_mapGrey.alpha = 0.6;
      }
    }
    //创建背景图片（蒙版范围）
    backgroundGroup = game.add.group();

    for (var i = 0; i < 8; i++) { //第i行
      for (var j = 0; j < 8; j++) { //第j列
        let current_map = game.add.image(j * 600, i * 600, "map_back" + (8 * i + j + 1));
        backgroundGroup.add(current_map);
      }
    }
  }

  update() {
    let game = this.game;
    //hero和地面之间的碰撞检测
    game.physics.arcade.collide(player, platforms);
    //game.physics.arcade.overlap(player, platforms, this.landingAction(), null, this);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(heart_tools, platforms);
    game.physics.arcade.collide(sheld_tools, platforms);
    //overlap也是碰撞检验，不过在碰撞时会调用一个函数
    game.physics.arcade.overlap(player, stars, this.collectStars, null, this);
    game.physics.arcade.overlap(player, heart_tools, this.collectHearts, null, this);
    game.physics.arcade.overlap(player, sheld_tools, this.collectSheld, null, this);
    this.updateMiniPoint();
    this.landingAction();

  }

  //获取道具并计分
  collectStars(player, stars) {
    stars.kill();
    score += 10;
    scoreText.text = "score: " + score;
  }

  //获取心心并计分
  collectHearts(player, heart_tools) {
    console.log("heart get");
    heart_tools.kill();
    score += 100;
    scoreText.text = "score: " + score;
    player.blood += 4;
    if (player.blood > 12) {
      player.blood = 12;
    }
  }
  //获得盾牌并计分
  collectSheld(player, sheld_tools) {
    console.log("sheld get");
    sheld_tools.kill();
    score += 100;
    scoreText.text = "score: " + score;
    player.sheld += 10;
    sheldText.text = player.sheld;
  }

  //刷新小地图点位
  updateMiniPoint() {
    var rate = 4800 / 102;
    miniPlayerPoint.x = windowWidth - 120 + player.x / rate;
    miniPlayerPoint.y = 120 + player.y / rate;
  }

  //落地动作
  landingAction() {
    //console.log("isFirstLanded:" +isFirstLanded);
    if (isFirstLanded && player.body.touching.down) {
      //主角在地面时设置站立动作
      if (lastDirection == 'right') {
        player.frame = 9;
      } else {
        player.frame = 8;
      }
      isFirstLanded = false;
    }
  }

  //倒计时
  tick() {
    timeInSeconds--;
    timeText.text = 'time: ' + timeInSeconds;
    if (timeInSeconds % 3 == 0) {
      //每3s更新血量
      this.updatePlayerBlood();
    }
    if (timeInSeconds == 250) {
      //第一轮毒圈
      poisonR = 2500;
      this.createPoisonByRound();
    }
    if (timeInSeconds == 150) {
      //第二轮毒圈
      poisonR = 1500;
      this.createPoisonByRound();
    }
    if (timeInSeconds == 50) {
      //第三轮毒圈
      poisonR = 500;
      this.createPoisonByRound();
    }
    if (timeInSeconds == 0) {
      this.game.time.events.remove(this.timer);
      timeText.text = 'Game Over';
      this.createGameOverPanel();
    }
  }

  //创建毒圈
  createPoison(poisonX, poisonY, poisonR) {
    let game = this.game;
    console.log("posionXY:" + poisonX + "," + poisonY);

    let maskGraphics = game.add.graphics(0, 0);
    maskGraphics.anchor.set(0.5);
    maskGraphics.beginFill(0xff0000); //注意颜色的格式
    maskGraphics.drawCircle(poisonX, poisonY, poisonR * 2); //第三个值为圆形的直径！！！
    maskGraphics.endFill();
    backgroundGroup.mask = maskGraphics;

    //小地图毒圈
    var rate = 4800 / 102;
    var miniPoisonX = windowWidth - 120 + poisonX / rate;
    var miniPoisonY = 120 + poisonY / rate;
    let miniPoisonGraphics = game.add.graphics(0, 0, uiGroup);
    miniPoisonGraphics.anchor.set(0.5);
    miniPoisonGraphics.beginFill(0xff0000); //注意颜色的格式
    miniPoisonGraphics.drawCircle(miniPoisonX, miniPoisonY, poisonR * 2 / rate);
    miniPoisonGraphics.endFill();
    miniMap.mask = miniPoisonGraphics;
  }

  //根据回合创建毒圈
  createPoisonByRound() {
    //清除上一轮遮罩
    if (miniMap.mask != null) {
      miniMap.mask.kill();
    }
    if (backgroundGroup.mask != null) {
      backgroundGroup.mask.kill();
    }
    //在第一个圈内选定中心点
    var randDis = Math.random() * poisonR; //随机获取第二中心与第一中心的距离
    var randAngle = Math.random() * 360; //随机获取角度
    poisonX = poisonX + Math.sin(randAngle) * randDis;
    poisonY = poisonY + Math.cos(randAngle) * randDis;
    this.createPoison(poisonX, poisonY, poisonR);
  }

  createGameOverPanel() {
    //关闭摇杆组
    this.disBtn.destroy();
    //结束弹窗
    var overPanel = this.game.add.image(windowWidth / 2, windowHeight / 2, "overPanel", null, uiGroup);
    overPanel.anchor.set(0.5);
    //overPanel.scale.setTo(0.3, 0.3);
    var finalScoreText = this.game.add.text(windowWidth / 2 + 10, windowHeight / 2 - 26, score, {
      fontSize: '20px',
      fill: '#000000'
    });
    uiGroup.add(finalScoreText);

    var backBtn = uiGroup.create(windowWidth / 2 - 60, windowHeight / 2 + 64, "ledge");
    backBtn.scale.setTo(0.24, 0.34);
    backBtn.alpha = 0;
    backBtn.inputEnabled = true;
    backBtn.events.onInputUp.add(() => {
      console.log("跳转页面");
      this.state.start('NavState')
    });
    var restartBtn = uiGroup.create(windowWidth / 2 - 60, windowHeight / 2 + 22, "ledge");
    restartBtn.scale.setTo(0.24, 0.34);
    restartBtn.alpha = 0;
    restartBtn.inputEnabled = true;
    restartBtn.events.onInputUp.add(() => {
      console.log("跳转页面");
      this.state.start('GameState')
    });
  }

  //随机生成道具
  createTools(type) {
    //合理的道具生成Y坐标
    var ledgeY = [1550, 2610, 3550, 4530];
    var indexY = Math.floor(Math.random() * 4);
    var toolX = Math.random() * 4800;
    var toolY = ledgeY[indexY];

    console.log("createTools:" + toolX + "," + toolY);

    //var tool = hearts.create(toolX, toolY, 'star');
    if (type == "heart") {
      var tool = heart_tools.create(toolX, toolY, 'heart_tool');
    }
    if (type == "sheld") {
      var tool = sheld_tools.create(toolX, toolY, 'sheld_tool');
    }

    //tool.scale.set(0.5, 0.5);
    tool.body.gravity.y = 200;
    //bounce设置道具的弹性系数
    tool.body.bounce.y = 0.2 + Math.random() * 0.3;
  }
}