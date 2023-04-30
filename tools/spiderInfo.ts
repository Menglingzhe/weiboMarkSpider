let end_date: string = "2020-12-25"; // 要爬取的时间段的结束日期

import uidListdata from "./uidList.json";
const uidList: any[] = uidListdata.data;
const baseUrl: string = `https://m.weibo.cn`;
const IndexDelay: number = 200;
const commentDelay: number = 300;
const maxErrNum: number = 5000; //多加个0

export { end_date, baseUrl, IndexDelay, commentDelay, maxErrNum, uidList };
