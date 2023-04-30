import { refreshWord } from "../tools/tools";
import { getPostInfo } from "./getPostInfo";

//根据主贴id爬取每条微博以及评论
export async function getList(
  cards: any[],
  uid: string,
  since_id: string,
  callback: any
) {
  let cardsItems = [];
  try {
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (card.card_type === 9) {
        const mblog = card.mblog;
        const id = mblog.id; //主贴id
        // let mBlogger = blogger
        //增加抛出他/她评论过的微博
        if (String(mblog.user.id) !== uid || !!mblog.title) {
          console.log("发布者不同或带有title的微博");
          continue;
        }
        //从此开始写评论爬取
        let postInfoList: any[] = await getPostInfo(
          id,
          uid,
          (err: boolean, id: string) => {
            //评论
            console.log("enter mark success：", id);
            if (err) {
              console.error(`markErr:id:${id}`, err);
              // return;
            }
          }
        );
        let totalMark: string = postInfoList[0];
        let interactive: boolean = postInfoList[1];

        totalMark = refreshWord(totalMark);
        let mainArticle = refreshWord(mblog.text);
        let repost_type = Boolean(!!mblog.repost_type);
        let repost_text = "";
        if (repost_type)
          //添加转发内容
          repost_text = refreshWord(mblog.retweeted_status.text);
        if (totalMark.length > 10) {
          // console.log('enter get mark', totalMark)
          cardsItems.push({
            postId: mblog.id, //主贴id
            blogger: mblog.user.screen_name, //博主
            articelTime: new Date(mblog.created_at.replace(/-/g, "/"))
              .toISOString()
              .slice(0, 19)
              .replace("T", " "), //发布时间
            commentsCount: mblog.comments_count, //评
            repostsCount: mblog.reposts_count, //转
            likeCount: mblog.attitudes_count, //赞
            picCount: mblog.pic_num, //图
            articel: mainArticle, //主贴
            totalMark: totalMark, //总评论
            bloggerUid: uid, //博主id
            interactive: interactive, //博主是否回应
            since_id: since_id,
            repost_type: repost_type,
            repost_text: refreshWord(repost_text),
          });
          // console.log('push',cardsItems)
        }
      }
    }
  } catch {
    //抛出错误，这一列不要了
    console.log(`getList抓取失败，抛出错误`);
    return cardsItems;
  }

  // console.log('finish item stablish', cardsItems)
  return cardsItems;
}
