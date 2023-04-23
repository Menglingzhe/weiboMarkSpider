import { refreshWord } from "../tools/tools";
import { getPostInfo } from "./getPostInfo";

//根据主贴id爬取每条微博以及评论
export async function getList(cards: any[], callback: any) {
  let cardsItems = [];
  try {
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (card.card_type === 9) {
        const mblog = card.mblog;
        const id = mblog.id; //主贴id
        // let mBlogger = blogger
        //从此开始写评论爬取
        let totalMark = await getPostInfo(id, (err: boolean, id: string) => {
          //评论
          console.log("enter mark success：", id);
          if (err) {
            console.error(`markErr:id:${id}`, err);
            // return;
          }
        });

        totalMark = refreshWord(totalMark);
        let mainArticle = refreshWord(mblog.text);
        if (mblog.reprint_cmt_count)
          //添加转发内容
          mainArticle += refreshWord(mblog.reprint_cmt_count.text);
        if (totalMark.length > 10) {
          // console.log('enter get mark', totalMark)
          cardsItems.push({
            postId: mblog.id, //主贴id
            blogger: mblog.user.screen_name, //博主
            articelTime: new Date(mblog.created_at.replace(/-/g, "/")), //发布时间
            commentsCount: mblog.comments_count, //评
            repostsCount: mblog.reposts_count, //转
            likeCount: mblog.attitudes_count, //赞
            picCount: mblog.pic_num, //图
            articel: mainArticle, //主贴
            totalMark: totalMark,
          });
          // console.log('push',cardsItems)
        }
      }
    }
  } catch {
    //抛出错误，这一列不要了
    return cardsItems;
  }

  // console.log('finish item stablish', cardsItems)
  return cardsItems;
}
