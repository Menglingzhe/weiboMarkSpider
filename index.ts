import { getPostIdsByDate } from "./getData/getPostId";

import { uid, end_date } from "./tools/spiderInfo";

// //调用列表函数
// getPostIdsByDate(uid, end_date, (err: any, uid: string) => {
//   console.log("列表函数 enter date index");
//   if (err) {
//     console.error("getPostIdsByDate err", err);
//     return;
//   }
// });

function main() {
  getPostIdsByDate(uid, end_date, (err: any, uid: string) => {
    console.log("运行获取博主发帖列表 enter date index");
    if (err) {
      console.error("getPostIdsByDate err", err);
      return;
    }
  });

}

main()