"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uidList = exports.maxErrNum = exports.commentDelay = exports.IndexDelay = exports.baseUrl = exports.end_date = void 0;
var end_date = "2022-01-01"; // 要爬取的时间段的结束日期
exports.end_date = end_date;
// const uid: string = "2759348142"; // 被爬取用户的UID
// const uidListdata = require("./uidList.json");
var uidList_json_1 = __importDefault(require("./uidList.json"));
var uidList = uidList_json_1.default.data;
exports.uidList = uidList;
var baseUrl = "https://m.weibo.cn";
exports.baseUrl = baseUrl;
var IndexDelay = 30;
exports.IndexDelay = IndexDelay;
var commentDelay = 30;
exports.commentDelay = commentDelay;
var maxErrNum = 100;
exports.maxErrNum = maxErrNum;
