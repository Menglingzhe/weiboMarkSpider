const spiderInfo = require("./tools/spiderInfo.js")
const api = require("./api/reqt")
const getList = require("./getList")
const tools = require("./tools/tools.js")
const baseUrl = spiderInfo.baseUrl;

// 获取指定时间之前的微博主贴的 ID 列表
async function getPostIdsByDate(uid, targetDateStr, callback) {
  let ids = [];
  let mBlogger = ''
  let fileData = {
    'data': []
  }

  let next = true;
  const targetDate = new Date(targetDateStr)
  let url = `${baseUrl}/api/container/getIndex?type=uid&value=${uid}&containerid=107603${uid}`;
  let since_id = '0'

  while (next) {
    url = `${url}&since_id=${since_id}`
    let rsp = await api.getIndex(url)
    //验证返回列表
    if (rsp.ok !== 1) {
      callback(new Error('Failed to fetch rsp.data.ok !== 1'), null);
      return;
    }
    let cards = rsp.data.cards
    if (cards.length === 0) {
      next = false;
      callback(null, ids);
      return;
    }
    const createdAt = new Date(cards[cards.length - 1].mblog.created_at.replace(/-/g, '/'))
    console.log('creatd/target:', createdAt, targetDate)
    if (createdAt < targetDate) {
      console.log('false', createdAt)
      next = false;
      tools.saveWeiboDataToFile(fileData, `${fileData.data[0].blogger}.json`)
      // tools.saveWeiboDataToFile(fileData, `${}.json`)
      callback(null, ids);
      return;
    }
    console.log('true', createdAt)

    // 评论card处理
    // await cards.forEach(async card => {

    //   if (card.card_type === 9) {
    //     const mblog = card.mblog;
    //     const id = mblog.id; //主贴id
    //     const blogger = mblog.user.screen_name //博主
    //     mBlogger = blogger

    //     ids.push(id);
    //     //从此开始写评论爬取
    //     let totalMark = await getPostInfo.getPostInfo(id, (err, id) => { //评论
    //       console.log('enter mark success')
    //       if (err) {
    //         console.error('markErr', err);
    //         return;
    //       }
    //     })

    //     totalMark = tools.refreshWord(totalMark)
    //     if (totalMark.length > 10) {
    //       fileData.data.push({
    //         'postId:': mblog.id, //主贴id
    //         'blogger:': mblog.user.screen_name, //博主
    //         'articelTime:': new Date(mblog.created_at.replace(/-/g, '/')), //发布时间
    //         'commentsCount:': mblog.comments_count, //评
    //         'repostsCount:': mblog.reposts_count, //转
    //         'likeCount:': mblog.attitudes_count, //赞
    //         'picCount:': mblog.pic_num, //图
    //         'articel:': tools.refreshWord(mblog.text), //主贴
    //         'totalMark:': totalMark
    //       })
    //     }

    //   }
    // });
    let weiBoRow = await getList.getList(cards)
    if (weiBoRow != null) {
      fileData.data.push(...weiBoRow)
    }

    since_id = rsp.data.cardlistInfo.since_id
    // console.log(ids)
  }

}




exports.getPostIdsByDate = getPostIdsByDate