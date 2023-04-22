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
exports.commentsHotflow = exports.getIndex = void 0;
// const axios = require('axios');
var axios_1 = require("axios");
// const cookie = require('../tools/cookie-para');
var cookie_para_1 = require("../tools/cookie-para");
var spiderInfo_1 = require("../tools/spiderInfo");
// const spiderInfo = require("../tools/spiderInfo")
/**
 * 发起列表链接
 **/
function getIndex(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url, {
                        headers: {
                            Cookie: cookie_para_1.cookie,
                            Referer: "https://m.weibo.cn/u/".concat(spiderInfo_1.uid),
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    }).catch(function (error) {
                        console.log('getIndex err');
                        if (error.response) {
                            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                        else if (error.request) {
                            // 请求已经成功发起，但没有收到响应
                            // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                            // 而在node.js中是 http.ClientRequest 的实例
                            console.log(error.request);
                        }
                        else {
                            // 发送请求时出了点问题
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                        return null;
                    })];
                case 1:
                    response = _a.sent();
                    console.log('getindex api is run（抓了一列id）');
                    return [2 /*return*/, response.data];
            }
        });
    });
}
exports.getIndex = getIndex;
//评论抓取
function commentsHotflow(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url, {
                        headers: {
                            Cookie: cookie_para_1.cookie,
                            Referer: "https://m.weibo.cn/u/".concat(spiderInfo_1.uid),
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                    }).catch(function (error) {
                        if (error.response) {
                            // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                        else if (error.request) {
                            // 请求已经成功发起，但没有收到响应
                            // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                            // 而在node.js中是 http.ClientRequest 的实例
                            console.log(error.request);
                        }
                        else {
                            // 发送请求时出了点问题
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                        return null;
                    })];
                case 1:
                    response = _a.sent();
                    console.log('getArticle api is run（抓了一列评论）');
                    return [2 /*return*/, response.data];
            }
        });
    });
}
exports.commentsHotflow = commentsHotflow;
// exports.commentsHotflow = commentsHotflow
// exports.getIndex = getIndex
