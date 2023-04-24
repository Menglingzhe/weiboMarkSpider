"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostIdsByDate = void 0;
var getList_1 = require("./getList");
var spiderInfo_1 = require("../tools/spiderInfo");
var reqt_1 = require("../api/reqt");
var tools_1 = require("../tools/tools");
var sql_1 = require("../db/sql");
// 获取指定时间之前的微博主贴的 ID 列表
function getPostIdsByDate(uid, targetDateStr, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var ids, errNum, next, targetDate, url, since_id, oldSinceId, createdAt, rsp, cards, weiBoRow, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('uid', uid);
                    ids = [];
                    errNum = 0;
                    next = true;
                    targetDate = new Date(targetDateStr);
                    url = "".concat(spiderInfo_1.baseUrl, "/api/container/getIndex?type=uid&value=").concat(uid, "&containerid=107603").concat(uid);
                    since_id = "0";
                    oldSinceId = "0";
                    createdAt = new Date();
                    _b.label = 1;
                case 1:
                    if (!next) return [3 /*break*/, 7];
                    rsp = {};
                    if (errNum > spiderInfo_1.maxErrNum) {
                        console.log("\u8FDB\u884C".concat(spiderInfo_1.maxErrNum, "\u6B21\u91CD\u590D\u8BF7\u6C42\u65E0\u679C,\u51C6\u5907\u9000\u51FA"));
                        console.log("export url:", "oldSinceId".concat(oldSinceId), url + "&since_id=".concat(since_id));
                        next = false;
                        return [3 /*break*/, 1];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    return [4 /*yield*/, (0, tools_1.delayedCrawlPage)(spiderInfo_1.IndexDelay, reqt_1.getIndex, url + "&since_id=".concat(since_id), uid)];
                case 3:
                    //检验getIndex有效性
                    rsp = _b.sent();
                    // console.log('此时rsp', rsp)
                    // let rsp = await  api.getIndex(url)
                    //验证返回列表
                    if (!rsp.ok) {
                        callback(new Error("Failed to fetch rsp.data.ok !== 1"), null);
                        console.log("url err,!rsp.ok:", "oldSinceId:".concat(oldSinceId), "url:".concat(url, "&since_id=").concat(since_id));
                        errNum++;
                        // since_id = oldSinceId;
                        return [3 /*break*/, 1]; //重新发送请求的尝试
                    }
                    cards = rsp.data.cards;
                    if (cards.length === 0) {
                        console.log("本sinceid下card为0");
                        oldSinceId = since_id;
                        since_id = rsp.data ? rsp.data.cardlistInfo.since_id : since_id;
                        errNum++;
                        callback(null, ids);
                        return [3 /*break*/, 1];
                    }
                    createdAt = new Date(cards[cards.length - 1].mblog.created_at.replace(/-/g, "/"));
                    console.log("creatd/target:", createdAt, targetDate);
                    if (createdAt < targetDate) {
                        console.log("false", createdAt);
                        next = false;
                        return [3 /*break*/, 1];
                    }
                    console.log("since_id:".concat(since_id, "\u7545\u901A"));
                    return [4 /*yield*/, (0, getList_1.getList)(cards, uid, function (err, uid) {
                            console.log(uid, "运行抓取每一条微博总信息条目 enter getList item");
                            if (err) {
                                console.error("getList err", err);
                                return;
                            }
                        })];
                case 4:
                    weiBoRow = _b.sent();
                    if (weiBoRow != null) {
                        // fileData.data.push(...weiBoRow);
                        console.log("use saveToSql(weiBORow)");
                        (0, sql_1.saveToSql)(weiBoRow);
                        //此处等待换为sql语句
                    }
                    oldSinceId = since_id;
                    since_id = rsp.data.cardlistInfo.since_id;
                    return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    console.log("getIndex及处理部分报错");
                    since_id = rsp.data ? rsp.data.cardlistInfo.since_id : since_id;
                    errNum++;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 1];
                case 7:
                    // console.log("退出抓取id循环，开始保存");
                    // await saveWeiboDataToFile(fileData, `${fileData.data[0].blogger}.json`);
                    callback(new Error("save Data"), ids);
                    console.log("准备退出抓取id循环,errNum:", errNum);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getPostIdsByDate = getPostIdsByDate;
