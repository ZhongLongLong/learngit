(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e4833k0WF9CWIOxoBt2sxzm', 'Star', __filename);
// scripts/Star.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //星星和主角之间的间距小于这个数值时，就会完成收集
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
    }
    Star.prototype.init = function (game) {
        this.game = game;
    };
    Star.prototype.getPlayerDistance = function () {
        //根据player节点位置判断距离
        var playerPos = this.game.playerNode.getPosition();
        //根据两点位置计算两点之间的距离
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    };
    Star.prototype.onPicked = function () {
        //当星星被收集时，调用Game脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        //调用Game脚本得分方法
        this.game.gainScore();
        //然后销毁当前星星节点
        this.node.destroy();
    };
    Star.prototype.update = function (dt) {
        //每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            //调用收集行为
            this.onPicked();
            return;
        }
        //根据Game脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Star.prototype.start = function () {
    };
    __decorate([
        property(cc.Integer)
    ], Star.prototype, "pickRadius", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.Star = Star;

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
        //# sourceMappingURL=Star.js.map
        