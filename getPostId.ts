const spiderInfo = require("./tools/spiderInfo.js")
const api = require("./api/reqt")
const getList = require("./getList")
const tools = require("./tools/tools.js")
const baseUrl = spiderInfo.baseUrl;

// 获取指定时间之前的微博主贴的 ID 列表
async function getPostIdsByDate(uid, targetDateStr, callback) {
  let ids = [];
  let fileData = {
    'data': []
  }

  let next = true;
  const targetDate = new Date(targetDateStr)
  let url = `${baseUrl}/api/container/getIndex?type=uid&value=${uid}&containerid=107603${uid}`;
  let since_id = '0'

  while (next) {
    url = `${url}&since_id=${since_id}`
    let rsp = {}

    rsp = await tools.delayedCrawlPage(1000, api.getIndex, url)
    // console.log('此时rsp', rsp)
    // let rsp = await  api.getIndex(url)
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
      callback(null, ids);
      return;
    }

    let weiBoRow = await getList.getList(cards)
    if (weiBoRow != null) {
      fileData.data.push(...weiBoRow)
    }

    since_id = rsp.data.cardlistInfo.since_id
    
  }

}

exports.getPostIdsByDate = getPostIdsByDate