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
exports.getPostInfo = void 0;
var spiderInfo_1 = require("../tools/spiderInfo");
var reqt_1 = require("../api/reqt");
var tools_1 = require("../tools/tools");
// 获取微博主贴的详细信息和评论内容 comment ==false
function getPostInfo(postId, uid, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var url, max_id, totalMark, interactive, response, markList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "".concat(spiderInfo_1.baseUrl, "/comments/hotflow?id=").concat(postId, "&mid=").concat(postId, "&max_id_type=0");
                    max_id = 1;
                    totalMark = "";
                    interactive = false;
                    _a.label = 1;
                case 1:
                    if (!(max_id != 0)) return [3 /*break*/, 3];
                    if (max_id == 1)
                        max_id = 0;
                    return [4 /*yield*/, (0, tools_1.delayedCrawlPage)(spiderInfo_1.commentDelay, reqt_1.commentsHotflow, url + "&max_id=".concat(max_id), uid)];
                case 2:
                    response = _a.sent();
                    try {
                        //抛出评论未回复错误
                        // if (response.ok === 0) {
                        if (!response.ok) {
                            return [3 /*break*/, 3];
                        }
                        else if (response.ok !== 1) {
                            callback(new Error("".concat(postId, " :mark response.ok !== 1")), null);
                            return [3 /*break*/, 3];
                        }
                        else if (response.data.total_number === 0 ||
                            response.data.length == 0) {
                            console.log("postId:".concat(postId, "no mark"));
                            return [3 /*break*/, 3];
                        }
                        console.log("".concat(postId, "\u7545\u901A"));
                        markList = response.data.data;
                        max_id = response.data.max_id;
                        // console.log(max_id , response.data.max_id)
                        markList.forEach(function (item) {
                            totalMark += item.text;
                            if (item.comments !== false) {
                                //二级回复
                                for (var i = 0; i < item.comments.length; i++) {
                                    if ((item.comments[i].user.id = uid)) {
                                        interactive = true;
                                    }
                                    totalMark += item.comments[i].text;
                                }
                            }
                        });
                    }
                    catch (_b) {
                        console.log("commentpostId".concat(postId, "\u9000\u51FA,url:"), url + "&max_id=".concat(max_id));
                        return [2 /*return*/, [totalMark, interactive]];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, [totalMark, interactive]];
            }
        });
    });
}
exports.getPostInfo = getPostInfo;
