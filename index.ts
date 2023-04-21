const spiderInfo = require("./tools/spiderInfo.js")
const uid = spiderInfo.uid; // 被爬取用户的UID
const end_date = spiderInfo.end_date; // 要爬取的时间段的结束日期
const getPostId = require("./getPostId")



//调用列表函数
getPostId.getPostIdsByDate(uid, end_date, (err, uid) => {
  console.log('列表函数 enter date index')
  if (err) {
    console.error('getPostIdsByDate err', err);
    return;
  }
})






