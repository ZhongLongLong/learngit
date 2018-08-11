(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aeca6kEDl1OvbLakg1h1jzj', 'Game', __filename);
// scripts/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //这个属性引用了星星的预制资源
        _this.starPrefab = null;
        //星星产生后消失时间的随机范围
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        //地面节点，用于确定星星生成的高度
        _this.groundNode = null;
        //player节点，用于获取主角弹跳的高度，和控制主角行动开关
        _this.playerNode = null;
        //score label的引用
        _this.scoreLabel = null;
        //得分音效资源
        _this.scoreAudio = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        //获取地平面的y坐标
        this.groundY = this.groundNode.y + this.groundNode.height / 2;
        //初始化计时器
        this.timer = 0;
        this.starDuration = 0;
        //生成一个新的星星
        this.spawnNewStar();
        //初始化计分
        this.score = 0;
    };
    //生成一个新的星星
    Game.prototype.spawnNewStar = function () {
        //使用给定的模板在场景中生成一个新的节点
        var newStar = cc.instantiate(this.starPrefab);
        //将新赠的节点添加到Canvas节点下面
        this.node.addChild(newStar);
        //为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        //将Game组件的实例传入星星组件
        newStar.getComponent('Star').init(this);
        //重置计时器
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    };
    //新星星的位置
    Game.prototype.getNewStarPosition = function () {
        var randX = 0;
        //根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        var randY = this.groundY + cc.random0To1() * this.playerNode.getComponent('Player').jumpHeight + 50;
        //根据屏幕宽度，随机得到一个星星x坐标
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        //返回星星坐标
        return cc.p(randX, randY);
    };
    Game.prototype.update = function (dt) {
        //每帧更新计时器，超过限度还没有生成新的星星
        //就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    };
    //得分
    Game.prototype.gainScore = function () {
        this.score += 1;
        //更新scoreDisplay的文字
        this.scoreLabel.string = 'Score : ' + this.score.toString();
        //播放得分音效
        //不加as any会报错
        cc.audioEngine.play(this.scoreAudio, false, 1);
    };
    //gg
    Game.prototype.gameOver = function () {
        //停止player节点跳跃动作
        this.playerNode.stopAllActions();
        cc.director.loadScene('game');
    };
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "groundNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLabel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "scoreAudio", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.Game = Game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        