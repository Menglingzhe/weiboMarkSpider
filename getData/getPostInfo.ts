 import { baseUrl ,commentDelay} from "../tools/spiderInfo";
import { commentsHotflow } from "../api/reqt";
import { delayedCrawlPage } from "../tools/tools";

// 获取微博主贴的详细信息和评论内容 comment ==false
export async function getPostInfo(postId: string, callback: any) {
  let url: string = `${baseUrl}/comments/hotflow?id=${postId}&mid=${postId}&max_id_type=0`;
  let max_id: number = 1;
  let totalMark: string = "";
  // let delayMark: string = "";//五天后

  while (max_id != 0) {
    if (max_id == 1) max_id = 0;
    // url = `${url};
    //延迟
    const response = await delayedCrawlPage(
      commentDelay,
      commentsHotflow,
      url + `&max_id=${max_id}`
    );

    try {
      //抛出评论未回复错误
      // if (response.ok === 0) {
      if (!response.ok) {
        break;
      } else if (response.ok !== 1) {
        callback(new Error(`${postId} :mark response.ok !== 1`), null);
        break;
      } else if (
        response.data.total_number === 0 ||
        response.data.length == 0
      ) {
        console.log(`postId:${postId}no mark`);
        break;
      }
      console.log(`${postId}畅通`);

      let markList = response.data.data;
      max_id = response.data.max_id;
      // console.log(max_id , response.data.max_id)
      markList.forEach((item: any) => {
        totalMark += item.text;
        if (item.comments !== false) {
          //二级回复
          for (let i = 0; i < item.comments.length; i++) {
            totalMark += item.comments[i].text;
          }
        }
      });

    } catch {
      console.log(`commentpostId${postId}退出,url:`, url + `&max_id=${max_id}`);
      return totalMark;
    }
    
  }

  return totalMark;
}
