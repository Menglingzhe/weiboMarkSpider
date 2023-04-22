"use strict";
// const spiderInfo = require("./tools/spiderInfo.js")
// const uid = spiderInfo.uid; // 被爬取用户的UID
// const end_date = spiderInfo.end_date; // 要爬取的时间段的结束日期
// const getPostId = require("./getPostId")
Object.defineProperty(exports, "__esModule", { value: true });
var getPostId_1 = require("./getPostId");
var spiderInfo_1 = require("./tools/spiderInfo");
//调用列表函数
(0, getPostId_1.getPostIdsByDate)(spiderInfo_1.uid, spiderInfo_1.end_date, function (err, uid) {
    console.log('列表函数 enter date index');
    if (err) {
        console.error('getPostIdsByDate err', err);
        return;
    }
});
