const end_date: string = "2022-01-01"; // 要爬取的时间段的结束日期
// const uid: string = "2759348142"; // 被爬取用户的UID
// const uidListdata = require("./uidList.json");
import uidListdata from "./uidList.json";
const uidList: any[] = uidListdata.data;
const baseUrl: string = `https://m.weibo.cn`;
const IndexDelay: number = 30;
const commentDelay: number = 30;
const maxErrNum: number = 100;

export { end_date, baseUrl, IndexDelay, commentDelay, maxErrNum, uidList };
