const end_date: string = '2023-01-01'; // 要爬取的时间段的结束日期
const uid: string = "6582815618"; // 被爬取用户的UID
const baseUrl: string = `https://m.weibo.cn`;
const IndexDelay: number = 50;
const commentDelay: number = 30;
const maxErrNum: number = 100;


export { end_date, uid, baseUrl, IndexDelay, commentDelay, maxErrNum };
