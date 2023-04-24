import { getPostIdsByDate } from "./getData/getPostIdsByDate";

import { uidList, end_date } from "./tools/spiderInfo";

// //调用列表函数
// getPostIdsByDate(uid, end_date, (err: any, uid: string) => {
//   console.log("列表函数 enter date index");
//   if (err) {
//     console.error("getPostIdsByDate err", err);
//     return;
//   }
// });

async function main() {
  try {
    await getPostIdsByDate(
      uidList[2].uid,
      end_date,
      (err: any, uid: string) => {
        console.log("运行获取博主发帖列表 enter date index");
        if (err) {
          console.error("getPostIdsByDate err", err);
        }
        return;
      }
    );
    console.log('getPostId执行完毕')
  } catch {
    console.log("main报错");
    return;
  }
  console.log('退出main')
  process.exit(1);
  // return;
}

main();
