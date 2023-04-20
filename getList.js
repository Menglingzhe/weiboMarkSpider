const getPostInfo = require("./getPostInfo")
const tools = require("./tools/tools.js")

async function getList(cards) {
  let cardsItems = []
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    if (card.card_type === 9) {
      const mblog = card.mblog;
      const id = mblog.id; //主贴id
      // let mBlogger = blogger
      //从此开始写评论爬取
      let totalMark = await getPostInfo.getPostInfo(id, (err, id) => { //评论
        console.log('enter mark success')
        if (err) {
          console.error('markErr', err);
          // return;
        }
      })

      totalMark = tools.refreshWord(totalMark)

      if (totalMark.length > 10) {
        // console.log('enter get mark', totalMark)
        cardsItems.push({
          postId: mblog.id, //主贴id
          blogger: mblog.user.screen_name, //博主
          articelTime: new Date(mblog.created_at.replace(/-/g, '/')), //发布时间
          commentsCount: mblog.comments_count, //评
          repostsCount: mblog.reposts_count, //转
          likeCount: mblog.attitudes_count, //赞
          picCount: mblog.pic_num, //图
          articel: tools.refreshWord(mblog.text), //主贴
          totalMark: totalMark
        })
        // console.log('push',cardsItems)
      }

    }
  }
  // console.log('finish item stablish', cardsItems)
  return cardsItems
}



exports.getList = getList