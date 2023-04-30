import { getPostIdsByDate } from "../getData/getPostIdsByDate";

import { uidList, end_date } from "../tools/spiderInfo";
import { saveWeiboDataToFile } from "../tools/tools";
import { creatNameTableSql } from "../db/sql";

const { parentPort } = require("worker_threads");

export async function childThread(uidNum: number) {
  await saveWeiboDataToFile(
    "执行：" + uidList[uidNum].uid + uidList[uidNum].blogger,
    "debug"
  );
  //以下修改为线程轮询
  try {
    // let end_date = end_date;
    await creatNameTableSql(uidList[uidNum].uid);
    await getPostIdsByDate(
      uidList[uidNum].uid,
      end_date,
      uidList[uidNum].sid?uidList[uidNum].sid:"0",
      (err: any, uid: string) => {
        console.log(`运行获取博主:${uid}发帖列表 enter date index`);
        if (err) {
          console.error("getPostIdsByDate err", err);
        }
        return;
      }
    );
    console.log("getPostId执行完毕");
  } catch {
    console.log("main报错");
    await saveWeiboDataToFile("main报错", "debug");
    return;
  }
  console.log("退出子thread：");
  return true;
}

parentPort.on("message", async (uidNum: number) => {
  const result = await childThread(uidNum);
  parentPort.postMessage(result);
  //  process.exit(1);
});
