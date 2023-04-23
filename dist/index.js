"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getPostId_1 = require("./getPostId");
var spiderInfo_1 = require("./tools/spiderInfo");
// //调用列表函数
// getPostIdsByDate(uid, end_date, (err: any, uid: string) => {
//   console.log("列表函数 enter date index");
//   if (err) {
//     console.error("getPostIdsByDate err", err);
//     return;
//   }
// });
function main() {
    (0, getPostId_1.getPostIdsByDate)(spiderInfo_1.uid, spiderInfo_1.end_date, function (err, uid) {
        console.log("运行获取博主发帖列表 enter date index");
        if (err) {
            console.error("getPostIdsByDate err", err);
            return;
        }
    });
}
main();
