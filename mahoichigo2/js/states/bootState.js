/**
 * 项目初始化
 * 1.加载preLoad页面的资源
 * 2.设置背景颜色
 * 3.初始化数据
 */
import Phaser from '../libs/phaser';

export default class BootState extends Phaser.State {
  init() {
    console.log("启动 Boot");
  }
  preload() {
    var game = this.game;
    game.stage.backgroundColor = '#2e2e2e';

    //game.load.baseURL = ""; 如果资源太大，要把资源放在服务器上
    game.load.image('logo', 'https://i0.hdslb.com/bfs/article/ab07b001eae8a80eeb2b041b358dd2eba5953bba.png');
    game.load.image('progress', 'https://i0.hdslb.com/bfs/article/ce90bc4bb9ca3d66a007a9440bde2880cfcd9ad1.png');
    game.load.image('bgnav', 'https://i0.hdslb.com/bfs/article/567657da77656ed34458586c316fa8387f939203.jpg');
    game.load.image('loading', 'https://i0.hdslb.com/bfs/article/777fc6a51fac85ecee4ac8c60c5996e6e693af5a.png');
    game.load.image('start_game', 'https://i0.hdslb.com/bfs/article/1e75abc37f615259a0096285093040c938c5f9e7.png');

    //map1
	//本地读取
	/*
    for (var i = 1; i <= 64; i++) {
      if (i < 10) {
        game.load.image('map_back' + i, 'assets/map1_withoutMan_0' + i + '.jpg');
      } else {
        game.load.image('map_back' + i, 'assets/map1_withoutMan_' + i + '.jpg');
      }
    }
	*/
	//网络读取
	game.load.image('map_back1', 'https://i0.hdslb.com/bfs/article/5bc8b88318f3aa333477b0b2b2192eddd7e34768.png');
	game.load.image('map_back2', 'https://i0.hdslb.com/bfs/article/d21ca36871ee6206a4c31081508c4ae0d022fa75.jpg');
	game.load.image('map_back3', 'https://i0.hdslb.com/bfs/article/f7df03fdf490e5dfcd0196d40745e9cc564d6171.jpg');
	game.load.image('map_back4', 'https://i0.hdslb.com/bfs/article/2d23a0e08d595f0a5e07038048b529a861252d5a.jpg');
	game.load.image('map_back5', 'https://i0.hdslb.com/bfs/article/7863e83ad64b7534d8918fd29a4dd764887bef97.jpg');
	game.load.image('map_back6', 'https://i0.hdslb.com/bfs/article/1fa50274ffac6871f68df1bce3da47412932ffe4.jpg');
	game.load.image('map_back7', 'https://i0.hdslb.com/bfs/article/e33ebe8516ad4e44ab865a035f9348cbd51f9911.jpg');
	game.load.image('map_back8', 'https://i0.hdslb.com/bfs/article/091e3177dab35b8c0f16d396d6a34985e88c3fd2.jpg');
	game.load.image('map_back9', 'https://i0.hdslb.com/bfs/article/c6aa39f21ec8549679f27d8f0a4cfdd5df6003fd.jpg');
	game.load.image('map_back10', 'https://i0.hdslb.com/bfs/article/23c7cdd3e5abb241ad03d48f39996ff741360264.jpg');
	game.load.image('map_back11', 'https://i0.hdslb.com/bfs/article/071a319fa2a54a844ca160ead211f16cb4f1aa75.jpg');
	game.load.image('map_back12', 'https://i0.hdslb.com/bfs/article/f92fb657dc6964c12bf8f9926c1e42715177f4b7.jpg');
	game.load.image('map_back13', 'https://i0.hdslb.com/bfs/article/2aac785e9dcfa2323e9e702cc8724fea4b017dc3.jpg');
	game.load.image('map_back14', 'https://i0.hdslb.com/bfs/article/6d51065253de7dee413ce63b6c3d37eb854c187f.jpg');
	game.load.image('map_back15', 'https://i0.hdslb.com/bfs/article/6135f925fbf9e11e68a1bc63d82640ea1358c046.jpg');
	game.load.image('map_back16', 'https://i0.hdslb.com/bfs/article/bbb0190849d34fb817fcfc4e676e9370face508f.jpg');
	game.load.image('map_back17', 'https://i0.hdslb.com/bfs/article/8ee12413afa1564c5bf95351c6fba6abcba7219b.jpg');
	game.load.image('map_back18', 'https://i0.hdslb.com/bfs/article/caee16ec0df591157374589fb3c26bc4f547f42e.jpg');
	game.load.image('map_back19', 'https://i0.hdslb.com/bfs/article/7cdbd0549e11c447e3ffbb349fb9425c66f42ddd.jpg');
	game.load.image('map_back20', 'https://i0.hdslb.com/bfs/article/b5a5f731221dea6f4f0711418e734dff791905c9.jpg');
	game.load.image('map_back21', 'https://i0.hdslb.com/bfs/article/743473a6be5620574ea925fac91a2722bcb81bcf.jpg');
	game.load.image('map_back22', 'https://i0.hdslb.com/bfs/article/2a6570c208a7973a3ad7b938a515aa60774cce23.jpg');
	game.load.image('map_back23', 'https://i0.hdslb.com/bfs/article/97a409f21237dce1fd15e59d54220653d544e7cc.jpg');
	game.load.image('map_back24', 'https://i0.hdslb.com/bfs/article/603e86659f24079a9b4d36af5313a0704ffbb2d0.jpg');
	game.load.image('map_back25', 'https://i0.hdslb.com/bfs/article/bd7c239e6c0d4182f33d21ee8670cfd0b5b25476.jpg');
	game.load.image('map_back26', 'https://i0.hdslb.com/bfs/article/2bc002aa7b0eb70f8bc1220604188df7ca57cb31.jpg');
	game.load.image('map_back27', 'https://i0.hdslb.com/bfs/article/d2a0d5cd5a8798851e9970eda4c847a989bd4828.jpg');
	game.load.image('map_back28', 'https://i0.hdslb.com/bfs/article/1fcb069e6b95b14765023cc8355c32b19ba96722.jpg');
	game.load.image('map_back29', 'https://i0.hdslb.com/bfs/article/ed47f76b19ea64ee32ca9f4b9e9d5d16f878db3e.jpg');
	game.load.image('map_back30', 'https://i0.hdslb.com/bfs/article/f2b007877acd2ac1ca2b690d26af43fd991c546f.jpg');
	game.load.image('map_back31', 'https://i0.hdslb.com/bfs/article/c146822d1dd6d03da0a7ee5f3c09a5b37f429c4f.jpg');
	game.load.image('map_back32', 'https://i0.hdslb.com/bfs/article/608b9c338ba6b47cb4326640e63dbe95e8b3e32d.jpg');
	game.load.image('map_back33', 'https://i0.hdslb.com/bfs/article/f76e945cad17e90c91fb16d0108e88ef3be16248.jpg');
	game.load.image('map_back34', 'https://i0.hdslb.com/bfs/article/325ff9b609230606a00c59e16aa15dfbaad01589.jpg');
	game.load.image('map_back35', 'https://i0.hdslb.com/bfs/article/3a0479943b8a2b84c04592d829633091c80446ab.jpg');
	game.load.image('map_back36', 'https://i0.hdslb.com/bfs/article/33dd7509a224cb4119423ba496ee0deff88353f2.jpg');
	game.load.image('map_back37', 'https://i0.hdslb.com/bfs/article/19b90405639d53b2ae745e4267e16c7be0a1d893.jpg');
	game.load.image('map_back38', 'https://i0.hdslb.com/bfs/article/abf078f905b07145ff016ceebd24b5bb1ec006fc.jpg');
	game.load.image('map_back39', 'https://i0.hdslb.com/bfs/article/43bdc059ce7fca2357a334d3240e43866ecc6df5.jpg');
	game.load.image('map_back40', 'https://i0.hdslb.com/bfs/article/af94faa5c63f2525aa116d34c0c7ca770c89f65e.jpg');
	game.load.image('map_back41', 'https://i0.hdslb.com/bfs/article/2380deec63689c04ff5319b09786fee022337b00.jpg');
	game.load.image('map_back42', 'https://i0.hdslb.com/bfs/article/824ea9ae188d9899baddea76b04fb44f05f9b386.jpg');
	game.load.image('map_back43', 'https://i0.hdslb.com/bfs/article/785add6ecfddf08da36afaa7586643df866cb166.jpg');
	game.load.image('map_back44', 'https://i0.hdslb.com/bfs/article/425c1f7b690db94305e3e0fe316345f7e15a7173.jpg');
	game.load.image('map_back45', 'https://i0.hdslb.com/bfs/article/f9cb7e6820536f85de9873b868c8c8f3a0708029.jpg');
	game.load.image('map_back46', 'https://i0.hdslb.com/bfs/article/0f28ec5d8783889c6888c2a9b1a738fbc9b5aad7.jpg');
	game.load.image('map_back47', 'https://i0.hdslb.com/bfs/article/d6a556f600d1519626d8b621c23e9ba18d53b411.jpg');
	game.load.image('map_back48', 'https://i0.hdslb.com/bfs/article/452665aeec4f2c28cdcd1c2f871d52c5029559b1.jpg');
	game.load.image('map_back49', 'https://i0.hdslb.com/bfs/article/614ea217634f4e0d0a88c1aed69fb91da30e1ddd.jpg');
	game.load.image('map_back50', 'https://i0.hdslb.com/bfs/article/ef7f3b5d43438a124fa5bc855afbddfd850c9456.jpg');
	game.load.image('map_back51', 'https://i0.hdslb.com/bfs/article/07395db3cc3ad806c1f5a090f3d39aecb96a4bfc.jpg');
	game.load.image('map_back52', 'https://i0.hdslb.com/bfs/article/075ae28be7f8a7bb8ccb405b8513219e43e2d688.jpg');
	game.load.image('map_back53', 'https://i0.hdslb.com/bfs/article/ba39489a9320f507734766b87c4cb521955c1c34.jpg');
	game.load.image('map_back54', 'https://i0.hdslb.com/bfs/article/60b5d07c19cab59cccff213cb98bcd9e73a864c2.jpg');
	game.load.image('map_back55', 'https://i0.hdslb.com/bfs/article/d4f9154ec074ef6cb124e9e588f227b3c8b2765c.jpg');
	game.load.image('map_back56', 'https://i0.hdslb.com/bfs/article/f6b0b6d49e5e6d07faee94225d580e3cd667efd7.jpg');
	game.load.image('map_back57', 'https://i0.hdslb.com/bfs/article/1c1d96896ad4001ff2a6e3d56d8a86bbb4ebad5c.jpg');
	game.load.image('map_back58', 'https://i0.hdslb.com/bfs/article/742258eabdffcaa5216b6cfba797da2fc4c4274d.jpg');
	game.load.image('map_back59', 'https://i0.hdslb.com/bfs/article/aa049d6c87d2afbe06ae2c70c88399092f24c095.jpg');
	game.load.image('map_back60', 'https://i0.hdslb.com/bfs/article/1d2eacc0d4f7b1617215069f26fd637b520a9b77.jpg');
	game.load.image('map_back61', 'https://i0.hdslb.com/bfs/article/4d9c75dc9739ad2fc2fe48b71a0c195897fd6b1a.jpg');
	game.load.image('map_back62', 'https://i0.hdslb.com/bfs/article/f5f9c8105ef8ae8c6646b9d38ca0cced7d4d6dc4.jpg');
	game.load.image('map_back63', 'https://i0.hdslb.com/bfs/article/ab2918e0e95deb3790b16801af54a6b0d3d991ec.jpg');
	game.load.image('map_back64', 'https://i0.hdslb.com/bfs/article/142e4dc0bc7e9ab2ab18236c9547a8bdac01183d.jpg');
	

    //hero1
    game.load.spritesheet('lulu_walk', 'https://i0.hdslb.com/bfs/article/201e38fda63d73c5c859c8f1f9deb6109dd810b5.png', 120, 200);
    game.load.spritesheet('aizen_walk', 'https://i0.hdslb.com/bfs/article/52f97ccdd2a012386e96404f2a0caee3ffcd9652.png', 300, 300);

    //碰撞平台
    game.load.image('ledge', 'https://i0.hdslb.com/bfs/article/a434017575de6ada18239cbeafaa179425ddde35.png');

    //tools
    game.load.image('star', 'https://i0.hdslb.com/bfs/article/f9ded3d0b339ecf324d2b8651e627ad51cf759f8.png');
    game.load.image('heart_tool', 'https://i0.hdslb.com/bfs/article/c17dafdff38c3c4916770cec033f8257fdb5b8d7.png');
    game.load.image('sheld_tool', 'https://i0.hdslb.com/bfs/article/24ee7260a5108c52cdd83c70222d4684bfaf1fc3.png');

    //UI
    //disBtn
    game.load.image('button1', 'https://i0.hdslb.com/bfs/article/a78d9960932925b1273ec617397d5e98672c98c6.png');
    game.load.image('button2', 'https://i0.hdslb.com/bfs/article/3c59cd9a9533e6dca5bcdf31f75760681378be3f.png');
    game.load.image('miniMap', 'https://i0.hdslb.com/bfs/article/af039775102c2e655f55e31b6326a4e4bcce4573.png');
    game.load.image('miniMapBack', 'https://i0.hdslb.com/bfs/article/faa4acee2c2398fe5b6a3b92827b260786e97665.png');
    game.load.spritesheet('point', 'https://i0.hdslb.com/bfs/article/41864f0ffc12b345393d1d0a8b2dd196143cf8f7.png', 30, 30);
    game.load.image('headicon', 'https://i0.hdslb.com/bfs/article/6cdf7e0562d4251cef43ec60b40f09d6da6a0754.png');
    game.load.spritesheet('heart', 'https://i0.hdslb.com/bfs/article/be522d0cee1ed37510e09dd9a90c8dfc202359c3.png', 25, 25);
    game.load.image('sheldLevel', 'https://i0.hdslb.com/bfs/article/a1c5c781dfb16982f7a6655c42d233b84c11856d.png');
    game.load.image('overPanel', 'https://i0.hdslb.com/bfs/article/790247c34629420b8fe5b29d138b05759a15bbbc.png');

    this.errorList = [];
    game.load.onFileError.add((key, file) => {
      this.errorList.push({
        key: key,
        errorMessage: file.errorMessage
      })
    })
    game.load.onFileComplete.add((progress) => {
      if (progress == 100) {
        //模拟上报服务器
        if (this.errorList.length) {
          console.log("失败的资源:" + JSON.stringify(this.errorList));
        }
      }
    })
  }
  create() {
    this.game.state.start("PreLoadState");
  }
  update() {}
}