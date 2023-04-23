import { getList } from "./getList";
import { baseUrl, IndexDelay, maxErrNum } from "./tools/spiderInfo";
import { getIndex } from "./api/reqt";

import {
  delayedCrawlPage,
  saveWeiboDataToFile,
  saveToSql,
} from "./tools/tools";

// 获取指定时间之前的微博主贴的 ID 列表
export async function getPostIdsByDate(
  uid: string,
  targetDateStr: string,
  callback: any
) {
  let ids: string[] = [];
  let fileData: any = {
    data: [],
  };
  let errNum: number = 0;
  let next = true;
  const targetDate = new Date(targetDateStr);
  let url = `${baseUrl}/api/container/getIndex?type=uid&value=${uid}&containerid=107603${uid}`;
  let since_id = "0";
  let createdAt = new Date();

  while (next) {
    // url = `${url};
    let rsp: any = {};
    if (errNum > maxErrNum) {
      console.log(`进行${maxErrNum}次重复请求无果,准备退出`);
      console.log("export url:", url + `&since_id=${since_id}`);
      break;
    }
    try {
      //检验getIndex有效性
      rsp = await delayedCrawlPage(
        IndexDelay,
        getIndex,
        url + `&since_id=${since_id}`
      );
      // console.log('此时rsp', rsp)
      // let rsp = await  api.getIndex(url)
      //验证返回列表
      if (!rsp.ok) {
        callback(new Error("Failed to fetch rsp.data.ok !== 1"), null);
        console.log("url err,!rsp.ok:", url + `&since_id=${since_id}`);
        errNum++;
        continue; //重新发送请求的尝试
      }

      let cards = rsp.data.cards;
      if (cards.length === 0) {
        next = false;
        console.log("本sinceid下card为0");
        since_id = rsp.data.cardlistInfo.since_id;
        errNum++;
        callback(null, ids);
        continue;
      }

      createdAt = new Date(
        cards[cards.length - 1].mblog.created_at.replace(/-/g, "/")
      );
      console.log("creatd/target:", createdAt, targetDate);
      if (createdAt < targetDate) {
        console.log("false", createdAt);
        next = false;
        break;
      }

      let weiBoRow = await getList(cards, (err: any, uid: string) => {
        console.log(uid, "运行抓取每一条微博总信息条目 enter getList item");
        if (err) {
          console.error("getList err", err);
          return;
        }
      });
      if (weiBoRow != null) {
        fileData.data.push(...weiBoRow);
        saveToSql(weiBoRow);
        //此处等待换为sql语句
      }

      since_id = rsp.data.cardlistInfo.since_id;
    } catch {
      console.log("getIndex及处理部分报错");
      since_id = rsp.data ? rsp.data.cardlistInfo.since_id : since_id;
      errNum++;
      continue;
    }
  }

  console.log("退出抓取id循环，开始保存");
  saveWeiboDataToFile(fileData, `${fileData.data[0].blogger}.json`);
  console.log("errNum:", errNum);
  callback(null, ids);
}
